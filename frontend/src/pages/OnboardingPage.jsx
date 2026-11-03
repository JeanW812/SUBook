import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Onboarding() {
  const navigate = useNavigate();
  
  // 1. Create state variables to hold the user's input
  const [matricNo, setMatricNo] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check if the user is actually logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate('/login');
    };
    checkUser();
  }, [navigate]);

  // 2. The function that saves data to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate('/login');
      return;
    }

    // 3. Update the profiles table in Supabase
    const { error } = await supabase
      .from('profiles')
      .update({ 
        matric_no: matricNo, 
        phone_no: `+60${phoneNo}` // Combining the country code
      })
      .eq('profile_id', user.id);

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      // Success! Send them to the dashboard
      navigate('/student-dashboard');
    }
  };

  return (
    <div className="flex flex-col items-start bg-[#F6F4F5] w-full min-h-screen overflow-hidden">
        <div className="flex py-0 px-4 sm:px-14 justify-between items-center shrink-0 border-b border-b-[#E3DEE0] w-full h-24 overflow-hidden">
            {/* ... Keep your header exactly the same ... */}
            <div className="flex items-center gap-3 w-fit overflow-hidden">
                <div className="flex justify-center items-center rounded-lg bg-[#7A1F3D] w-9 h-9 overflow-hidden">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 w-[22px] h-[22px] overflow-hidden relative ">
                        <path d="M12.8335 19.2498V16.4999C12.8335 16.0137 12.6404 15.5474 12.2965 15.2036C11.9527 14.8598 11.4863 14.6667 11 14.6667C10.5138 14.6667 10.0474 14.8598 9.70358 15.2036C9.35973 15.5474 9.16656 16.0137 9.16656 16.4999V19.2498M16.5005 11.0002H16.5097M16.5005 14.6667H16.5097M5.4996 11.0002H5.50877M5.4996 14.6667H5.50877M20.1674 6.41731C20.1674 6.17421 20.0709 5.94106 19.8989 5.76916C19.727 5.59726 19.4938 5.50069 19.2507 5.50069H17.4172C17.0425 5.50063 16.6768 5.38579 16.3694 5.17162L12.0479 2.16418C11.7405 1.94994 11.3749 1.835 11.0002 1.83484C10.6255 1.83468 10.2598 1.94929 9.95221 2.16326L5.6307 5.1707C5.32336 5.3852 4.95766 5.50036 4.58286 5.50069H2.74938C2.50625 5.50069 2.27307 5.59726 2.10115 5.76916C1.92923 5.94106 1.83264 6.17421 1.83264 6.41731V17.4168C1.83264 17.903 2.02581 18.3693 2.36966 18.7131C2.7135 19.0569 3.17985 19.25 3.66612 19.25H18.334C18.8202 19.25 19.2866 19.0569 19.6304 18.7131C19.9743 18.3693 20.1674 17.903 20.1674 17.4168V6.41731ZM12.8335 9.16693C12.8335 10.1794 12.0126 11.0002 11 11.0002C9.98744 11.0002 9.16656 10.1794 9.16656 9.16693C9.16656 8.15446 9.98744 7.33368 11 7.33368C12.0126 7.33368 12.8335 8.15446 12.8335 9.16693Z" strokeWidth="1.6" strokeLinecap="round" stroke="white"/>
                    </svg>
                </div>
                <p className="text-[#7A1F3D] font-inter text-2xl font-bold w-fit">SUBook</p>
                <div className="bg-[#E3DEE0] w-px h-[22px] hidden sm:block"></div>
                <p className="text-[#6B6468] font-inter text-[13px] w-fit hidden sm:block">Venue booking &amp; campus events</p>
            </div>
            <div className="flex items-center gap-2 w-fit overflow-hidden">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px] overflow-hidden relative ">
                    <path d="M6.43845 6.37458C6.605 5.90114 6.93372 5.50192 7.36641 5.24762C7.7991 4.99333 8.30782 4.90038 8.80247 4.98522C9.29713 5.07007 9.74579 5.32724 10.069 5.71119C10.3922 6.09514 10.5691 6.58109 10.5684 7.08297C10.5684 8.49975 8.44319 9.20814 8.44319 9.20814M8.49998 12.042H8.50706M15.5839 8.50004C15.5839 12.4124 12.4123 15.5839 8.49998 15.5839C4.58765 15.5839 1.41608 12.4124 1.41608 8.50004C1.41608 4.58771 4.58765 1.41614 8.49998 1.41614C12.4123 1.41614 15.5839 4.58771 15.5839 8.50004Z" strokeWidth="1.6" strokeLinecap="round" stroke="#7A1F3D"/>
                </svg>
                <Link to="/contact" className="text-[#6B6468] font-inter text-[13px] font-medium w-fit hover:underline">
            Need help?
          </Link>
            </div>
        </div>

        {/* MAIN FORM SECTION */}
        <form onSubmit={handleSubmit} className="flex py-1.5 px-4 sm:px-0 flex-col items-center gap-1 w-full h-full overflow-hidden">
            <div className="flex items-center gap-2 w-fit overflow-hidden mt-4">
                <div className="bg-[#7A1F3D] w-5 h-px"></div>
                <p className="text-[#7A1F3D] font-inter text-[11px] font-semibold w-fit tracking-[0.1636em]">ONBOARDING</p>
                <div className="bg-[#7A1F3D] w-5 h-px"></div>
            </div>
            
            <div className="flex p-6 sm:p-8 flex-col items-start gap-6 rounded-[20px] border border-[#E3DEE0] bg-[#FFF] shadow-[0_8px_32px_0_rgba(59,22,37,0.03)] w-full max-w-[520px] overflow-hidden mt-4">
                
                <div className="flex flex-col items-start gap-4 w-full overflow-hidden">
                    <div className="flex justify-center items-center rounded-xl bg-[#FAF3F6] w-12 h-12 overflow-hidden">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 w-[26px] h-[26px] overflow-hidden relative ">
                            <path d="M23.8323 10.8331V11.0352M23.8323 11.0352V17.3338M23.8323 11.0352C23.807 11.1744 23.7545 11.308 23.6771 11.4281C23.5623 11.6062 23.3978 11.7468 23.2038 11.8324L13.8987 16.0557C13.6165 16.1845 13.3099 16.2511 12.9996 16.2511C12.6894 16.2511 12.3828 16.1845 12.1006 16.0557L2.81713 11.8216C2.62428 11.7371 2.46022 11.5982 2.34501 11.422C2.22981 11.2457 2.16846 11.0397 2.16846 10.8291C2.16846 10.6185 2.22981 10.4125 2.34501 10.2363C2.46022 10.06 2.62428 9.92114 2.81713 9.83666L12.1006 5.61118C12.3828 5.48241 12.6894 5.41577 12.9996 5.41577C13.3099 5.41577 13.6165 5.48241 13.8987 5.61118L23.1832 9.841C23.3789 9.92253 23.5463 10.0597 23.6648 10.2355C23.7833 10.4112 23.8476 10.6179 23.8498 10.8299C23.8505 10.8991 23.8446 10.9678 23.8323 11.0352ZM6.50039 13.5417V17.3338C6.50039 18.1959 7.18515 19.0226 8.40404 19.6322C9.62293 20.2417 11.2761 20.5842 12.9999 20.5842C14.7236 20.5842 16.3768 20.2417 17.5957 19.6322C18.8146 19.0226 19.4993 18.1959 19.4993 17.3338V13.5417" strokeWidth="1.6" strokeLinecap="round" stroke="#7A1F3D"/>
                        </svg>
                    </div>
                    <div className="flex flex-col items-start gap-3 w-full overflow-hidden">
                        <p className="text-[#1F1A1C] font-inter text-2xl sm:text-3xl font-semibold leading-[1.2em] w-full tracking-[-0.03em]">Welcome aboard.</p>
                        <p className="text-[#6B6468] font-inter text-[15px] leading-[1.6em] w-full">A couple of details, and you’re ready to go. Let’s get your student profile set up.</p>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-5 w-full overflow-hidden">
                    {/* ERROR MESSAGE */}
                    {errorMsg && (
                        <p className="text-red-500 text-sm w-full bg-red-50 p-3 rounded-lg">
                            {errorMsg}
                        </p>
                    )}

                    {/* MATRIC NUMBER INPUT */}
                    <div className="flex flex-col items-start gap-2 w-full overflow-hidden">
                        <label className="text-[#1F1A1C] font-inter text-sm font-semibold w-fit">Matriculation number</label>
                        <input 
                            type="text"
                            required
                            value={matricNo}
                            onChange={(e) => setMatricNo(e.target.value)}
                            placeholder="A24XX1234"
                            className="flex py-0 px-4 items-center gap-3 rounded-lg border border-[#E3DEE0] bg-[#FFF] w-full h-[52px] overflow-hidden outline-none focus:border-[#7A1F3D]"
                        />
                        <p className="text-[#6B6468] font-inter text-[13px] w-full">You’ll find this on your student ID or offer letter.</p>
                    </div>

                    {/* PHONE NUMBER INPUT */}
                    <div className="flex flex-col items-start gap-2 w-full overflow-hidden">
                        <label className="text-[#1F1A1C] font-inter text-sm font-semibold w-fit">Phone number</label>
                        <div className="flex py-0 px-4 items-center gap-3 rounded-lg border border-[#E3DEE0] bg-[#FFF] w-full h-[52px] overflow-hidden focus-within:border-[#7A1F3D]">
                            <p className="text-[#1F1A1C] font-inter text-[15px] w-fit">+60</p>
                            <div className="bg-[#E3DEE0] w-px h-5"></div>
                            <input 
                                type="tel"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                placeholder="12 345 6789"
                                className="w-full h-full outline-none bg-transparent font-inter text-[15px]"
                            />
                        </div>
                        <p className="text-[#6B6468] font-inter text-[13px] w-full">Enter your mobile number without the leading 0.</p>
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex flex-col items-start gap-3 w-full overflow-hidden">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="flex py-0 px-5 justify-between items-center rounded-lg bg-[#7A1F3D] w-full h-[52px] overflow-hidden cursor-pointer disabled:opacity-70"
                    >
                        <div className="bg-[#7A1F3D] w-[18px] h-[18px]"></div>
                        <p className="text-[#FFF] font-inter text-[15px] font-semibold w-fit">
                            {loading ? 'Saving...' : 'Continue'}
                        </p>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] overflow-hidden relative ">
                            <path d="M3.74939 8.99999H14.2506M8.99999 14.2506L14.2506 8.99999L8.99999 3.74939" strokeWidth="1.8" strokeLinecap="round" stroke="white"/>
                        </svg>
                    </button>
                    
                    <button type="button" className="cursor-pointer text-nowrap flex justify-center items-center gap-1.5 w-full overflow-hidden">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[13px] h-[13px] overflow-hidden relative ">
                            <path d="M3.79167 5.41657V3.79144C3.79167 3.07308 4.07701 2.38415 4.58492 1.8762C5.09283 1.36825 5.78171 1.08289 6.5 1.08289C7.2183 1.08289 7.90717 1.36825 8.41508 1.8762C8.92299 2.38415 9.20833 3.07308 9.20833 3.79144V5.41657M3.79167 5.41657H2.70833C2.11002 5.41657 1.625 5.90163 1.625 6.49999V10.8337C1.625 11.432 2.11002 11.9171 2.70833 11.9171H10.2917C10.89 11.9171 11.375 11.432 11.375 10.8337V6.49999C11.375 5.90163 10.89 5.41657 10.2917 5.41657H9.20833M3.79167 5.41657H9.20833M7.04167 8.66683C7.04167 8.966 6.79915 9.20854 6.5 9.20854C6.20085 9.20854 5.95833 8.966 5.95833 8.66683C5.95833 8.36765 6.20085 8.12512 6.5 8.12512C6.79915 8.12512 7.04167 8.36765 7.04167 8.66683Z" strokeWidth="1.5" strokeLinecap="round" stroke="#6B6468"/>
                        </svg>
                        <p className="text-[#6B6468] font-inter text-xs w-fit">Your details stay private and secure.</p>
                    </button>
                </div>
            </div>
        </form>

        <div className="flex flex-col sm:flex-row py-4 px-4 sm:px-14 justify-between items-center gap-3 w-full h-auto sm:h-[72px] overflow-hidden mt-auto">
            <p className="text-[#6B6468] font-inter text-xs w-fit">SUBook · Bringing campus together</p>
            <div className="flex items-start gap-6 w-fit overflow-hidden">
                <Link to="/privacy" className="text-[#6B6468] font-inter text-xs w-fit hover:underline">
            Privacy
          </Link>
          <Link to="/terms"className="text-[#6B6468] font-inter text-xs w-fit hover:underline">
            Terms of use
          </Link>
            </div>
        </div>
    </div>
  );
}