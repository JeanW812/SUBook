import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// We use the SERVICE_ROLE key here because the backend needs to bypass RLS to check roles securely
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

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