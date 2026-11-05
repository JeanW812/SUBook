import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ProfileModal from './ProfileModal';

export default function StudentNavigation() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const toggleDropdown = (name) => {
    setActiveDropdown((current) => (current === name ? null : name));
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <header className="w-full bg-white border-b border-[#E3DEE0] h-16 flex items-center justify-between px-6 md:px-12 shrink-0 relative z-50" ref={navRef}>
        <div className="flex items-center gap-4 md:gap-24">
          <button
            type="button"
            className="md:hidden text-[#1F1A1C] p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <button type="button" onClick={() => navigate('/student-dashboard')} className="text-[#7A1F3D] text-[22px] font-bold cursor-pointer">SUBook</button>

          <nav className="hidden md:flex gap-16 text-sm font-semibold text-[#1F1A1C]" aria-label="Main navigation">
            <a href="/student-dashboard" className="hover:text-[#7A1F3D] py-4">Home</a>

            <div className="relative">
              <button type="button" onClick={() => toggleDropdown('venue')} className="flex items-center gap-1 text-[#7A1F3D] py-4">
                Venue &amp; Booking
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15L7 10H17L12 15Z" fill="currentColor" /></svg>
              </button>
              {activeDropdown === 'venue' && (
                <div className="absolute top-14 left-0 w-48 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
                  <button type="button" onClick={() => { navigate('/venues'); setActiveDropdown(null); }} className="text-left px-4 py-3 hover:bg-[#FAF3F6] text-[#7A1F3D] font-bold">Book Venue</button>
                  <a href="#" className="px-4 py-3 hover:bg-[#FAF3F6]">Booking History</a>
                </div>
              )}
            </div>

            <div className="relative">
              <button type="button" onClick={() => toggleDropdown('events')} className="flex items-center gap-1 hover:text-[#7A1F3D] py-4">
                Events
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15L7 10H17L12 15Z" fill="currentColor" /></svg>
              </button>
              {activeDropdown === 'events' && (
                <div className="absolute top-14 left-0 w-48 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
                  <a href="#" className="px-4 py-3 hover:bg-[#FAF3F6]">Browse Events</a>
                </div>
              )}
            </div>

            <div className="relative">
              <button type="button" onClick={() => toggleDropdown('help')} className="flex items-center gap-1 hover:text-[#7A1F3D] py-4">
                Help &amp; Support
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15L7 10H17L12 15Z" fill="currentColor" /></svg>
              </button>
              {activeDropdown === 'help' && (
                <div className="absolute top-14 left-0 w-48 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
                  <button type="button" onClick={() => { navigate('/student-faq'); setActiveDropdown(null); }} className="text-left px-4 py-3 hover:bg-[#FAF3F6]">FAQ</button>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLScKPJLpauxqEzx6vavNyKgUUw9oVKgYx7L5wcDPizUSjgvgig/viewform?usp=publish-editor" target="_blank" rel="noreferrer" className="px-4 py-3 hover:bg-[#FAF3F6]">Lost Item</a>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSeE1J0a6KQTBnpRSbUyvReN9HSOOXqBgGY2fvxkH32g2ULMWA/viewform?usp=publish-editor" target="_blank" rel="noreferrer" className="px-4 py-3 hover:bg-[#FAF3F6]">Feedback</a>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="relative">
          <button type="button" onClick={() => toggleDropdown('role')} className="flex items-center gap-2 bg-[#7A1F3D] text-white px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-semibold">
            <span>Student</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.58744 11.379C7.63331 11.4234 7.69469 11.4597 7.76629 11.4848C7.8379 11.5099 7.91758 11.523 7.99847 11.523C8.07936 11.523 8.15904 11.5099 8.23064 11.4848C8.30224 11.4597 8.36363 11.4234 8.4095 11.379L12.9099 7.04593C12.9619 6.99595 12.9925 6.93741 12.9982 6.87667C13.0039 6.81594 12.9845 6.75532 12.9421 6.70142C12.8997 6.64751 12.836 6.60237 12.7579 6.57091C12.6797 6.53945 12.5901 6.52287 12.4988 6.52296H3.49811C3.40703 6.52322 3.31777 6.54001 3.23993 6.57155C3.1621 6.60309 3.09863 6.64817 3.05636 6.70195C3.01409 6.75573 2.99462 6.81618 3.00003 6.87678C3.00544 6.93739 3.03554 6.99587 3.08708 7.04593L7.58744 11.379Z" fill="white" /></svg>
          </button>
          {activeDropdown === 'role' && (
            <div className="absolute top-12 right-0 w-40 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
              <button type="button" onClick={() => { setIsProfileOpen(true); setActiveDropdown(null); }} className="text-left px-4 py-3 hover:bg-[#FAF3F6] text-sm text-gray-700">Profile Settings</button>
              <div className="border-t border-gray-100 my-1" />
              <button type="button" onClick={handleLogout} className="text-left px-4 py-3 hover:bg-red-50 text-sm text-red-600 font-medium">Logout</button>
            </div>
          )}
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-[#E3DEE0] shadow-lg z-40 flex flex-col py-2">
          <a href="/student-dashboard" className="px-6 py-3 text-[#1F1A1C] font-semibold border-b border-gray-100">Home</a>
          <div className="px-6 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Venue &amp; Booking</p>
            <button type="button" onClick={() => { closeMobileMenu(); navigate('/venues'); }} className="block w-full text-left py-1 text-[#7A1F3D] font-semibold">Book Venue</button>
            <a href="#" className="block py-1 text-[#1F1A1C] font-semibold">Booking History</a>
          </div>
          <div className="px-6 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Events</p>
            <a href="#" className="block py-1 text-[#1F1A1C] font-semibold">Browse Events</a>
          </div>
          <div className="px-6 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Help &amp; Support</p>
            <button type="button" onClick={() => { closeMobileMenu(); navigate('/student-faq'); }} className="block py-1 text-[#1F1A1C] font-semibold">FAQ</button>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScKPJLpauxqEzx6vavNyKgUUw9oVKgYx7L5wcDPizUSjgvgig/viewform?usp=publish-editor" target="_blank" rel="noreferrer" className="block py-1 text-[#1F1A1C] font-semibold">Lost Item</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeE1J0a6KQTBnpRSbUyvReN9HSOOXQBgGY2fvxkH32g2ULMWA/viewform?usp=publish-editor" target="_blank" rel="noreferrer" className="block py-1 text-[#1F1A1C] font-semibold">Feedback</a>
          </div>
        </div>
      )}

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
