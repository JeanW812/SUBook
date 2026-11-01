import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ProtectedRoute({ children, allowedRoles }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('role, account_status')
        .eq('profile_id', user.id)
        .single();

      setProfile(data);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  
  // If no user, redirect to login
  if (!profile) return <Navigate to="/login" />;

  // If account is suspended, show an error or redirect
  if (profile.account_status !== 'active') {
    return <Navigate to="/account-suspended" />;
  }

  // If the user's role is not in the allowed list, redirect to their respective dashboard
  if (!allowedRoles.includes(profile.role)) {
    if (profile.role === 'mpp_admin') return <Navigate to="/mpp-dashboard" />;
    if (profile.role === 'club_representative') return <Navigate to="/club-dashboard" />;
    return <Navigate to="/student-dashboard" />;
  }

  return children;
}