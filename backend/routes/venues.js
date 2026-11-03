
import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const router = express.Router();

// Supabase connection configuration
// Supabase expects the project URL; tolerate a copied REST endpoint suffix
// without exposing or rewriting the user's environment file.
const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/rest\/v1\/?$/, '');
const supabaseKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY;

// Initialize Supabase
const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

// ========================================
// GET /api/venues
// Retrieve all venue information
// ========================================

router.get('/venues', async (req, res) => {
  try {
    // Check Supabase configuration
    if (!supabase) {
      console.error('Supabase environment variables are missing');

      return res.status(503).json({
        success: false,
        error: 'Supabase configuration is missing',
      });
    }

    // Retrieve venue information
    const { data, error } = await supabase
      .from('venues')
      .select(`
        venue_id,
        venue_name,
        capacity,
        description,
        hourly_rate,
        hourly_deposit,
        daily_rate,
        daily_deposit,
        venue_status
      `)
      .order('venue_name', { ascending: true });

    // Handle Supabase errors
    if (error) {
      console.error('Supabase query error:', error.message);

      return res.status(500).json({
        success: false,
        error: 'Unable to retrieve venue information',
      });
    }

    // Return venue records
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });

  } catch (error) {
    console.error('Venue API error:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

router.get('/venues/:venueId', async (req, res) => {
  try {
    if (!supabase) {
      console.error('Supabase environment variables are missing');
      return res.status(503).json({
        success: false,
        error: 'Supabase configuration is missing',
      });
    }

    const { data, error } = await supabase
      .from('venues')
      .select(`
        venue_id,
        venue_name,
        capacity,
        description,
        hourly_rate,
        hourly_deposit,
        daily_rate,
        daily_deposit,
        venue_status
      `)
      .eq('venue_id', req.params.venueId)
      .maybeSingle();

    if (error) {
      console.error('Supabase venue detail query error:', error.message);
      return res.status(500).json({
        success: false,
        error: 'Unable to retrieve venue information',
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Venue not found',
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Venue detail API error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

const ACTIVE_BOOKING_STATUSES = ['confirmed', 'approved_awaiting_payment'];

const isValidMonth = (value) => /^\d{4}-(0[1-9]|1[0-2])$/.test(value);

// GET /api/venues/:venueId/availability?month=YYYY-MM
// Return the selected venue and only active bookings that overlap the requested month.
router.get('/venues/:venueId/availability', async (req, res) => {
  // Compute per-hour availability, handling shared venues with concurrency limits
  // This endpoint returns a calendar of one‑hour slots for the requested month.
  // Each slot includes:
  //   - start (ISO timestamp)
  //   - end (ISO timestamp)
  //   - bookingsCount (number of active bookings overlapping the slot)
  //   - status: "available", "partially booked" or "fully booked"
  //   - remaining (for shared venues) = max_concurrent_bookings - bookingsCount
  // The logic respects the venue's `is_shared` and `max_concurrent_bookings` fields.
  // Rejected, cancelled, expired, or non‑active bookings are ignored via ACTIVE_BOOKING_STATUSES.
  const { venueId } = req.params;
  const month = req.query.month;

  if (!venueId || !isValidMonth(month)) {
    return res.status(400).json({ success: false, error: 'A valid venue ID and month (YYYY-MM) are required' });
  }

  try {
    if (!supabase) return res.status(503).json({ success: false, error: 'Supabase configuration is missing' });

    const monthStart = `${month}-01T00:00:00+08:00`;
    const [year, monthNumber] = month.split('-').map(Number);
    const nextMonth = new Date(Date.UTC(year, monthNumber, 1));
    const monthEnd = `${nextMonth.toISOString().slice(0, 10)}T00:00:00+08:00`;

    // Fetch venue with shared settings
    const { data: venue, error: venueError } = await supabase
      .from('venues')
      .select('venue_id, venue_name, hourly_rate, hourly_deposit, daily_rate, daily_deposit, venue_status, is_shared, max_concurrent_bookings')
      .eq('venue_id', venueId)
      .maybeSingle();
    if (venueError) throw venueError;
    if (!venue) return res.status(404).json({ success: false, error: 'Venue not found' });

    // Fetch active bookings overlapping the month
    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('start_time, end_time, status')
      .eq('venue_id', venueId)
      .gt('end_time', monthStart)
      .lt('start_time', monthEnd)
      .in('status', ACTIVE_BOOKING_STATUSES);
    if (bookingError) throw bookingError;

    const slotStart = new Date(monthStart);
    const slotEnd = new Date(monthEnd);
    const slots = [];
    while (slotStart < slotEnd) {
      const slotIsoStart = slotStart.toISOString();
      const slotIsoEnd = new Date(slotStart.getTime() + 60 * 60 * 1000).toISOString();
      const overlapping = (bookings || []).filter(b => new Date(b.start_time) < new Date(slotIsoEnd) && new Date(b.end_time) > new Date(slotIsoStart));
      const bookingsCount = overlapping.length;
      let status = 'available';
      let remaining = null;
      if (venue.is_shared) {
        if (bookingsCount >= (venue.max_concurrent_bookings || 1)) {
          status = 'fully booked';
          remaining = 0;
        } else if (bookingsCount > 0) {
          status = 'partially booked';
          remaining = (venue.max_concurrent_bookings || 1) - bookingsCount;
        } else {
          remaining = venue.max_concurrent_bookings || 1;
        }
      } else {
        // Exclusive venue – only one active booking allowed
        if (bookingsCount > 0) {
          status = 'fully booked';
        }
      }

      slots.push({
        start: slotIsoStart,
        end: slotIsoEnd,
        bookingsCount,
        status,
        ...(remaining !== null && { remaining })
      });
      // Advance one hour
      slotStart.setHours(slotStart.getHours() + 1);
    }

    return res.status(200).json({
      success: true,
      data: {
        venue,
        month,
        slots,
      },
    });
  } catch (error) {
    console.error('Venue availability error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
  // Compute per-hour availability, handling shared venues with concurrency limits
  // This endpoint returns a calendar of one‑hour slots for the requested month.
  // Each slot includes:
  //   - start (ISO timestamp)
  //   - end (ISO timestamp)
  //   - bookingsCount (number of active bookings overlapping the slot)
  //   - status: "available", "partially booked" or "fully booked"
  //   - remaining (for shared venues) = max_concurrent_bookings - bookingsCount
  // The logic respects the venue's `is_shared` and `max_concurrent_bookings` fields.
  // Rejected, cancelled, expired, or non‑active bookings are ignored via ACTIVE_BOOKING_STATUSES.

  // Compute per-hour availability, handling shared venues with concurrency limits
  const { venueId } = req.params;
  const month = req.query.month;

  if (!venueId || !isValidMonth(month)) {
    return res.status(400).json({
      success: false,
      error: 'A valid venue ID and month (YYYY-MM) are required',
    });
  }

  try {
    if (!supabase) {
      return res.status(503).json({ success: false, error: 'Supabase configuration is missing' });
    }

    const monthStart = `${month}-01T00:00:00+08:00`;
    const [year, monthNumber] = month.split('-').map(Number);
    const nextMonth = new Date(Date.UTC(year, monthNumber, 1));
    const monthEnd = `${nextMonth.toISOString().slice(0, 10)}T00:00:00+08:00`;

    const { data: venue, error: venueError } = await supabase
      .from('venues')
      .select('venue_id, venue_name, hourly_rate, hourly_deposit, daily_rate, daily_deposit, venue_status, is_shared, max_concurrent_bookings')
      .eq('venue_id', venueId)
      .maybeSingle();

    if (venueError) throw venueError;
    if (!venue) return res.status(404).json({ success: false, error: 'Venue not found' });

    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('start_time, end_time, status')
      .eq('venue_id', venueId)
      .gt('end_time', monthStart)
      .lt('start_time', monthEnd)
      .in('status', ACTIVE_BOOKING_STATUSES);

    if (bookingError) {
      console.error('Supabase availability query error:', bookingError.message);
      return res.status(503).json({
        success: false,
        error: 'Availability data is not available',
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        venue,
        month,
        bookings: (bookings || []).map(({ start_time, end_time }) => ({ start_time, end_time })),
      },
    });
  } catch (error) {
    console.error('Venue availability API error:', error.message);
    return res.status(500).json({ success: false, error: 'Unable to retrieve venue availability' });
  }
});

export default router;
