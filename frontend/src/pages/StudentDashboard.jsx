import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import EventCard from '../components/EventCard';
import ProfileModal from '../components/ProfileModal';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // State for Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (!error) {
        setEvents(data || []);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null); 
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4F5] flex flex-col">
      
      {/* 1. TOP NAVBAR */}
      <header className="w-full bg-white border-b border-[#E3DEE0] h-16 flex items-center justify-between px-6 md:px-12 shrink-0 relative z-50">
        
        {/* Left Side: Logo & Menus */}
        <div className="flex items-center gap-4 md:gap-24">
          
          {/* Mobile Hamburger Icon */}
          <button 
            className="md:hidden text-[#1F1A1C] p-2 -ml-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>

          <h1 onClick={() => navigate('/student-dashboard')} className="text-[#7A1F3D] text-[22px] font-bold cursor-pointer">SUBook</h1>
          
          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex gap-16 text-sm font-semibold text-[#1F1A1C]">
            <a href="#" className="text-[#7A1F3D] py-4">Home</a>
            
            <div className="relative">
              <button onClick={() => toggleDropdown('venue')} className="flex items-center gap-1 hover:text-[#7A1F3D] py-4">
                Venue & Booking
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15L7 10H17L12 15Z" fill="currentColor"/></svg>
              </button>
              {activeDropdown === 'venue' && (
                <div className="absolute top-14 left-0 w-48 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
                  <a href="#" className="px-4 py-3 hover:bg-[#FAF3F6]">Book Venue</a>
                  <a href="#" className="px-4 py-3 hover:bg-[#FAF3F6]">Booking History</a>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => toggleDropdown('events')} className="flex items-center gap-1 hover:text-[#7A1F3D] py-4">
                Events
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15L7 10H17L12 15Z" fill="currentColor"/></svg>
              </button>
              {activeDropdown === 'events' && (
                <div className="absolute top-14 left-0 w-48 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
                  <a href="#" className="px-4 py-3 hover:bg-[#FAF3F6]">Browse Events</a>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => toggleDropdown('help')} className="flex items-center gap-1 hover:text-[#7A1F3D] py-4">
                Help & Support
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15L7 10H17L12 15Z" fill="currentColor"/></svg>
              </button>
              {activeDropdown === 'help' && (
                <div className="absolute top-14 left-0 w-48 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
                  <button onClick={() => { navigate('/student-faq'); setActiveDropdown(null); }} className="text-left px-4 py-3 hover:bg-[#FAF3F6]">FAQ</button>
                  <a href="https://forms.gle/YOUR_LOST_ITEM_LINK" target="_blank" rel="noreferrer" className="px-4 py-3 hover:bg-[#FAF3F6]">Lost Item</a>
                  <a href="https://forms.gle/YOUR_FEEDBACK_LINK" target="_blank" rel="noreferrer" className="px-4 py-3 hover:bg-[#FAF3F6]">Feedback</a>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Side: Role Dropdown */}
        <div className="relative">
          <button onClick={() => toggleDropdown('role')} className="flex items-center gap-2 bg-[#7A1F3D] text-white px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-semibold">
            <span>Student</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.58744 11.379C7.63331 11.4234 7.69469 11.4597 7.76629 11.4848C7.8379 11.5099 7.91758 11.523 7.99847 11.523C8.07936 11.523 8.15904 11.5099 8.23064 11.4848C8.30224 11.4597 8.36363 11.4234 8.4095 11.379L12.9099 7.04593C12.9619 6.99595 12.9925 6.93741 12.9982 6.87667C13.0039 6.81594 12.9845 6.75532 12.9421 6.70142C12.8997 6.64751 12.836 6.60237 12.7579 6.57091C12.6797 6.53945 12.5901 6.52287 12.4988 6.52296H3.49811C3.40703 6.52322 3.31777 6.54001 3.23993 6.57155C3.1621 6.60309 3.09863 6.64817 3.05636 6.70195C3.01409 6.75573 2.99462 6.81618 3.00003 6.87678C3.00544 6.93739 3.03554 6.99587 3.08708 7.04593L7.58744 11.379Z" fill="white"/>
            </svg>
          </button>
          {activeDropdown === 'role' && (
            <div className="absolute top-12 right-0 w-40 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
              <button onClick={() => { setIsProfileOpen(true); setActiveDropdown(null); }} className="text-left px-4 py-3 hover:bg-[#FAF3F6] text-sm text-gray-700">Profile Settings</button>
              <div className="border-t border-gray-100 my-1"></div>
              <button onClick={handleLogout} className="text-left px-4 py-3 hover:bg-red-50 text-sm text-red-600 font-medium">Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-[#E3DEE0] shadow-lg z-40 flex flex-col py-2">
          <a href="#" className="px-6 py-3 text-[#7A1F3D] font-semibold border-b border-gray-100">Home</a>
          
          <div className="px-6 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Venue & Booking</p>
            <a href="#" className="block py-1 text-[#1F1A1C] font-semibold">Book Venue</a>
            <a href="#" className="block py-1 text-[#1F1A1C] font-semibold">Booking History</a>
          </div>

          <div className="px-6 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Events</p>
            <a href="#" className="block py-1 text-[#1F1A1C] font-semibold">Browse Events</a>
          </div>

          <div className="px-6 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Help & Support</p>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/student-faq'); }} className="block py-1 text-[#1F1A1C] font-semibold">FAQ</button>
            <a href="https://forms.gle/YOUR_LOST_ITEM_LINK" target="_blank" rel="noreferrer" className="block py-1 text-[#1F1A1C] font-semibold">Lost Item</a>
            <a href="https://forms.gle/YOUR_FEEDBACK_LINK" target="_blank" rel="noreferrer" className="block py-1 text-[#1F1A1C] font-semibold">Feedback</a>
          </div>
        </div>
      )}

      {/* 2. HERO BANNER */}
      <div className="bg-[#7A1F3D] w-full py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <h2 className="text-white text-3xl md:text-[40px] font-bold leading-tight max-w-[700px]">
            Book SUB venues.<br />Discover campus events.
          </h2>
          <p className="text-[#F3DCE4] text-sm md:text-base max-w-[482px]">
            One centralized platform for UTM students, clubs and societies.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button className="bg-[#F2B705] text-[#1F1A1C] font-semibold text-[13px] w-[160px] py-3 rounded-lg hover:bg-yellow-500 transition-colors flex justify-center items-center">
              Book Venue
            </button>
            <button className="border border-white text-white font-semibold text-[13px] w-[160px] py-3 rounded-lg hover:bg-white/10 transition-colors flex justify-center items-center">
              Browse Events
            </button>
          </div>
        </div>
      </div>

      {/* 3. EVENTS SECTION */}
      <main className="max-w-7xl mx-auto w-full px-8 py-8 flex-grow">
        <h3 className="text-[#1F1A1C] text-xl font-bold mb-6">Upcoming & ongoing events</h3>
        
        {loading ? (
          <p className="text-[#6B6468]">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-[#6B6468]">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard 
                key={event.event_id}
                title={event.event_name}
                club={event.club_name}
                date={event.event_date}
                startTime={event.start_time}
                endTime={event.end_time}
                venue={event.venue_name}
                isOpen={event.registration_open}
                imageUrl={event.poster_url}
              />
            ))}
          </div>
        )}
      </main>

      <button className="fixed bottom-8 right-8 bg-[#7A1F3D] w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-[#5c162d] transition-colors z-50">
        <span className="text-white text-lg font-bold">AI</span>
      </button>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
}