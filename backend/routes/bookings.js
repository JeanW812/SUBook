import express from 'express';
import { requireMPPAdmin } from '../middleware/auth.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws'; // Add the ws import

dotenv.config();

// Use fallbacks so tests don't crash if .env is missing
const supabaseUrl = process.env.SUPABASE_URL || 'https://zrznabvueccpkhhgepfc.supabase.co';
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

export default router;