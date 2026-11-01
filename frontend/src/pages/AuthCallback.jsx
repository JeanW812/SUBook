import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Authenticating...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      try {
        const { data: { session }, error: authError } = await supabase.auth.getSession();

        if (authError || !session) {
          navigate('/login');
          return;
        }

        const user = session.user;
        setStatus('Checking your profile...');

        // 1. Fetch profile (No account_status)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('matric_no, role')
          .eq('profile_id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          navigate('/onboarding');
          return;
        }

        // 2. Create profile if missing (No account_status)
        if (!profile) {
          setStatus('Creating your profile...');
          const { error: createError } = await supabase
            .from('profiles')
            .insert({
              profile_id: user.id,
              google_id: user.user_metadata.sub || user.id,
              full_name: user.user_metadata.full_name || 'New User',
              email: user.email,
              role: 'student'
            });

          if (createError) {
            console.error("Failed to create profile:", createError);
            setError("Could not create your profile.");
            return;
          }
          
          navigate('/onboarding');
          return;
        }

        // 3. Redirect based on matric_no and role
        setStatus('Redirecting...');
        
        if (!profile.matric_no || profile.matric_no.trim() === '') {
          navigate('/onboarding');
        } else {
          if (profile.role === 'mpp_admin') navigate('/mpp-dashboard');
          else if (profile.role === 'club_representative') navigate('/club-dashboard');
          else if(profile.role === 'student')navigate('/student-dashboard');
          else {navigate('/login'); 
          }
        }

      } catch (err) {
        console.error("Unexpected error:", err);
        setError('An unexpected error occurred.');
      }
    };

    checkUserAndRedirect();
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F6F4F5]">
      <div className="flex flex-col items-center gap-6 p-10 bg-white rounded-3xl border border-[#E3DEE0] shadow-lg max-w-md w-full text-center">
        {!error && <div className="w-12 h-12 border-4 border-[#7A1F3D] border-t-transparent rounded-full animate-spin"></div>}
        <h2 className="text-[#1F1A1C] text-xl font-bold font-inter">{status}</h2>
        {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg w-full">{error}</p>}
      </div>
    </div>
  );
}