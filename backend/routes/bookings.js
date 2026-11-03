import express from 'express';
import { requireMPPAdmin } from '../middleware/auth.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws'; // Add the ws import

dotenv.config();

// Use fallbacks so tests don't crash if .env is missing
const supabaseUrl = (process.env.SUPABASE_URL || 'https://zrznabvueccpkhhgepfc.supabase.co').replace(/\/rest\/v1\/?$/, '');
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyem5hYnZ1ZWNjcGtoaGdlcGZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzQzMjQxMCwiZXhwIjoyMTA5MDA4NDEwfQ.BeOr1HGzSxm1E6dTZcC8Cj5024FqqvxpkOLD9HATilM';

// Initialize Supabase Admin client with the ws transport
const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { transport: ws }
});

const router = express.Router();

router.post('/approve-booking', requireMPPAdmin, async (req, res) => {
  // 1. Get the data from the request body
  const { bookingId } = req.body;

  // Check if the admin provided a booking ID
  if (!bookingId) {
    return res.status(400).json({ error: "Missing bookingId in request body" });
  }

  try {
    // 2. (Pretend) Update the booking status in the database
    // Later, you will uncomment this when your bookings table is ready:
    // const { error: updateError } = await supabase
    //   .from('bookings')
    //   .update({ status: 'approved_awaiting_payment' })
    //   .eq('booking_id', bookingId);
    // 
    // if (updateError) throw updateError;

    // 3. Write the Audit Log (L1.4)
    const { error: logError } = await supabase
      .from('audit_logs')
      .insert({
        user_id: req.user.id, // This was attached by the requireMPPAdmin middleware!
        action: 'APPROVE_BOOKING',
        details: { 
          bookingId: bookingId,
          approved_at: new Date().toISOString()
        }
      });

    // 4. If logging fails, stop and return an error
    if (logError) {
      console.error("Failed to write audit log:", logError);
      return res.status(500).json({ error: "Action succeeded but audit log failed." });
    }

    // 5. Success response
    res.json({ 
      message: "Booking approved and logged successfully",
      admin_id: req.user.id,
      booking_id: bookingId
    });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/create-booking', async (req, res) => {
  const { venueId, start_time, end_time } = req.body;
  if (!venueId || !start_time || !end_time) {
    return res.status(400).json({ error: 'venueId, start_time, end_time required' });
  }
  try {
    if (!supabase) return res.status(503).json({ error: 'Supabase not configured' });
    // Fetch venue config
    const { data: venue, error: venueError } = await supabase
      .from('venues')
      .select('is_shared, max_concurrent_bookings')
      .eq('venue_id', venueId)
      .maybeSingle();
    if (venueError) throw venueError;
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    // Count overlapping active bookings
    const { data: overlapping, error: overlapError } = await supabase
      .from('bookings')
      .select('booking_id')
      .eq('venue_id', venueId)
      .gt('end_time', start_time)
      .lt('start_time', end_time)
      .in('status', ACTIVE_BOOKING_STATUSES);
    if (overlapError) throw overlapError;
    const count = overlapping.length;
    if (venue.is_shared) {
      const max = venue.max_concurrent_bookings || 1;
      if (count >= max) {
        return res.status(409).json({ error: 'Venue capacity reached for the requested time slot' });
      }
    } else {
      if (count > 0) {
        return res.status(409).json({ error: 'Venue already booked for the requested time slot' });
      }
    }
    // Insert booking atomically (Supabase uses POSTGRES, we rely on row-level lock via implicit transaction)
    const { data: newBooking, error: insertError } = await supabase
      .from('bookings')
      .insert({ venue_id: venueId, start_time, end_time, status: 'confirmed' });
    if (insertError) throw insertError;
    return res.status(201).json({ success: true, booking: newBooking[0] });
  } catch (e) {
    console.error('Create booking error:', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

