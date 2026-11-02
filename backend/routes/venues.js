
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

export default router;
