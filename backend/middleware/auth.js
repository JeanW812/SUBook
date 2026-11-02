import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws'; // 1. Import the ws package

dotenv.config();

const supabaseUrl = (process.env.SUPABASE_URL || 'https://zrznabvueccpkhhgepfc.supabase.co').replace(/\/rest\/v1\/?$/, '');
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyem5hYnZ1ZWNjcGtoaGdlcGZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzQzMjQxMCwiZXhwIjoyMTA5MDA4NDEwfQ.BeOr1HGzSxm1E6dTZcC8Cj5024FqqvxpkOLD9HATilM';

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { transport: ws } // 2. Explicitly set the WebSocket transport
});

// The Middleware Function
export const requireMPPAdmin = async (req, res, next) => {
  try {
    // 1. Get the JWT token from the Authorization header (e.g., "Bearer eyJhb...")
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // 2. Verify the token with Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // 3. Check the user's profile in YOUR database
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, account_status')
      .eq('profile_id', user.id) // Matches your Table 1 schema
      .single();

    // 4. Block them if they are suspended or inactive
    if (profile?.account_status !== 'active') {
      return res.status(403).json({ error: "Forbidden: Account is not active" });
    }

    // 5. Block them if they are not an MPP Admin
    if (profile?.role !== 'mpp_admin') {
      return res.status(403).json({ error: "Forbidden: MPP Admin access required" });
    }

    // 6. Success! Attach the user data to the request and move to the next function (the route)
    req.user = user;
    next();
    
  } catch (err) {
    console.error("Middleware Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
