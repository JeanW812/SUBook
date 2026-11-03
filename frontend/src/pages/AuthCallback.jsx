import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const PORTAL_RULES = {
  student: {
    expectedRole: 'student',
    dashboard: '/student-dashboard',
  },
  admin: {
    expectedRole: 'mpp_admin',
    dashboard: '/mpp-dashboard',
  },
  club_rep: {
    expectedRole: 'club_representative',
    dashboard: '/club-dashboard',
  },
};

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState('Authenticating...');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        // STEP 1: Get authenticated session
        const {
          data: { session },
          error: authError,
        } = await supabase.auth.getSession();

        if (authError || !session) {
          setError(
            authError?.message || 'No active session found. Please log in again.'
          );
          return;
        }

        const user = session.user;

        // STEP 2: Identify selected login portal
        const portalParam = searchParams.get('role');
        const rule = PORTAL_RULES[portalParam];

        if (!rule) {
          setError('Invalid login portal. Please return to the login page.');
          await supabase.auth.signOut();
          return;
        }

        setStatus('Checking your profile...');

        // STEP 3: Retrieve actual account role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('matric_no, role')
          .eq('profile_id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          setError('Unable to retrieve your account information. Please try again.');
          return;
        }

        // STEP 4: Check whether profile exists
        if (!profile) {

          // Only students can self-register
          if (portalParam !== 'student') {
            setStatus('Access denied');

            setError(
              'No registered account found. Only students can self-register. Please contact your administrator.'
            );

            await supabase.auth.signOut();
            return;
          }

          // Create a new student profile
          // Only use this if your database trigger does NOT already create profiles.
          setStatus('Creating your student profile...');

          const { error: createError } = await supabase
            .from('profiles')
            .insert({
              profile_id: user.id,
              google_id: user.user_metadata?.sub || user.id,
              full_name:
                user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                'New Student',
              email: user.email,
              role: 'student',
            });

          if (createError) {
            console.error('Profile creation error:', createError);
            setError('Could not create your student profile. Please try again.');
            return;
          }

          setStatus('Redirecting to onboarding...');
          navigate('/onboarding', { replace: true });
          return;
        }

        // STEP 5: STRICT ROLE-PORTAL VALIDATION
        if (profile.role !== rule.expectedRole) {
          setStatus('Access denied');

          setError(
            `Access denied. Your account role is "${profile.role}", but you are attempting to access the "${portalParam}" portal. Please use the correct login portal.`
          );

          await supabase.auth.signOut();
          return;
        }

        // STEP 6: REDIRECT BASED ON VERIFIED ROLE

        if (profile.role === 'mpp_admin') {
          setStatus('Redirecting to MPP Dashboard...');
          navigate('/mpp-dashboard', { replace: true });
          return;
        }

        if (profile.role === 'club_representative') {
          setStatus('Redirecting to Club Representative Dashboard...');
          navigate('/club-dashboard', { replace: true });
          return;
        }

        if (profile.role === 'student') {
          const hasMatric =
            typeof profile.matric_no === 'string' &&
            profile.matric_no.trim() !== '';

          if (!hasMatric) {
            setStatus('Redirecting to onboarding...');
            navigate('/onboarding', { replace: true });
          } else {
            setStatus('Redirecting to Student Dashboard...');
            navigate('/student-dashboard', { replace: true });
          }

          return;
        }

        setError('Unknown account role. Please contact the administrator.');

      } catch (err) {
        console.error('Unexpected error:', err);
        setError(err.message || 'An unexpected error occurred.');
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F6F4F5] px-4">
      <div className="flex flex-col items-center gap-6 p-10 bg-white rounded-3xl border border-[#E3DEE0] shadow-lg max-w-md w-full text-center">

        {!error && (
          <div className="w-12 h-12 border-4 border-[#7A1F3D] border-t-transparent rounded-full animate-spin"></div>
        )}

        <h2 className="text-[#1F1A1C] text-xl font-bold font-inter">
          {status}
        </h2>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg w-full break-words">
            {error}
          </p>
        )}

        {error && (
          <button
            onClick={() => navigate('/login', { replace: true })}
            className="text-[#7A1F3D] text-xs font-semibold hover:underline"
          >
            ← Back to Login
          </button>
        )}

      </div>
    </div>
  );
}
