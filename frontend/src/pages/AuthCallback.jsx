import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const PORTAL_RULES = {
  student:  { expectedRole: 'student' },
  admin:    { expectedRole: 'mpp_admin' },
  club_rep: { expectedRole: 'club_representative' },
};

const PORTAL_LABEL = {
  student: 'Student',
  admin: 'Admin (MPP)',
  club_rep: 'Club Representative',
};

function roleLabel(role) {
  if (role === 'mpp_admin') return 'Admin (MPP)';
  if (role === 'club_representative') return 'Club Representative';
  if (role === 'student') return 'Student';
  return role;
}

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState('Authenticating...');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        // STEP 1: Get authenticated session (retry for fresh OAuth)
        let session = null;
        for (let i = 0; i < 5; i++) {
          const { data, error: authError } = await supabase.auth.getSession();
          if (authError) throw new Error(authError.message);
          if (data.session) { session = data.session; break; }
          await new Promise((r) => setTimeout(r, 200));
        }
        if (!session) throw new Error('No active session found.');

        const user = session.user;

        // STEP 2: Resolve intended portal (URL → sessionStorage fallback)
        const portalParam =
          searchParams.get('role') || sessionStorage.getItem('intended_portal');
        sessionStorage.removeItem('intended_portal');

        const rule = PORTAL_RULES[portalParam];
        if (!rule) {
          throw new Error(
            'No login portal was selected. Please go back and choose a portal.'
          );
        }

        setStatus('Checking your profile...');

        // STEP 3: Retrieve profile (retry for trigger lag)
        let profile = null;
        for (let i = 0; i < 5 && !profile; i++) {
          const { data, error: profileError } = await supabase
            .from('profiles')
            .select('matric_no, role')
            .eq('profile_id', user.id)
            .maybeSingle();
          if (profileError) throw new Error(profileError.message);
          profile = data;
          if (!profile) await new Promise((r) => setTimeout(r, 300));
        }

        // STEP 4: Create profile if trigger didn't (new users)
        if (!profile) {
          setStatus('Creating your profile...');
          const { data: created, error: createError } = await supabase
            .from('profiles')
            .upsert(
              {
                profile_id: user.id,
                google_id: user.user_metadata?.sub || user.id,
                full_name: user.user_metadata?.full_name || 'New User',
                email: user.email,
                role: 'student',
              },
              { onConflict: 'profile_id' }
            )
            .select('matric_no, role')
            .single();

          if (createError) {
            console.error('Failed to create profile:', createError);
            throw new Error('We could not set up your profile. Please try again.');
          }
          profile = created;
        }

        if (cancelled) return;

        // STEP 5: STRICT portal ↔ role matrix
        if (profile.role !== rule.expectedRole) {
          await supabase.auth.signOut();
          throw new Error(
            `Access denied. Your account is registered as "${roleLabel(profile.role)}", ` +
            `but you selected the "${PORTAL_LABEL[portalParam]}" portal. ` +
            `Please sign in through the ${roleLabel(profile.role)} portal.`
          );
        }

        // STEP 6: Redirect
        setStatus('Redirecting...');

        if (profile.role === 'mpp_admin') {
          navigate('/mpp-dashboard', { replace: true });
          return;
        }
        if (profile.role === 'club_representative') {
          navigate('/club-dashboard', { replace: true });
          return;
        }
        if (profile.role === 'student') {
          const hasMatric =
            typeof profile.matric_no === 'string' &&
            profile.matric_no.trim() !== '';
          navigate(hasMatric ? '/student-dashboard' : '/onboarding', {
            replace: true,
          });
          return;
        }

        throw new Error('Unknown account role.');
      } catch (err) {
        if (!cancelled) {
          console.error('AuthCallback error:', err);
          setError(err.message || 'An unexpected error occurred.');
        }
      }
    };

    run();
    return () => { cancelled = true; };
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F6F4F5] px-4">
      <div className="flex flex-col items-center gap-6 p-10 bg-white rounded-3xl border border-[#E3DEE0] shadow-lg max-w-md w-full text-center">
        {!error && (
          <div className="w-12 h-12 border-4 border-[#7A1F3D] border-t-transparent rounded-full animate-spin"></div>
        )}
        <h2 className="text-[#1F1A1C] text-xl font-bold font-inter">{status}</h2>
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