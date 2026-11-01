import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ProtectedRoute({ allowedRoles }) {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setLoading(false);
        return;
      }
      
      setSession(session);

      // Fetch role (No account_status)
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('profile_id', session.user.id)
        .single();

      if (profile) {
        setRole(profile.role);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F4F5]">
        <div className="w-12 h-12 border-4 border-[#7A1F3D] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === 'mpp_admin') return <Navigate to="/mpp-dashboard" replace />;
    if (role === 'club_representative') return <Navigate to="/club-dashboard" replace />;
    return <Navigate to="/student-dashboard" replace />;
  }

  return <Outlet />;
}