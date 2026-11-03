import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../components/ProfileModal'; // ADDED IMPORT

export default function ClubDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // State to track which dropdown is open
  const [activeDropdown, setActiveDropdown] = useState(null);

  // State to track if the Profile Modal is open
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const fetchClubBookings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Find the club associated with this user
      const { data: clubData, error: clubError } = await supabase
        .from('clubs')
        .select('club_id')
        .eq('representative_id', user.id)
        .single();

      if (clubError || !clubData) {
        console.log("No club found for this user.");
        setLoading(false);
        return;
      }

      // Fetch the bookings for this club
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          venues (venue_name)
        `)
        .eq('club_id', clubData.club_id)
        .order('submitted_at', { ascending: false });

      if (!bookingsError) {
        setBookings(bookingsData || []);
      }
      setLoading(false);
    };

    fetchClubBookings();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // Toggle dropdown function
  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  // Helper function to format the date and time
  const formatDateTime = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const dateStr = startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const startTime = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(':00', '');
    const endTime = endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(':00', '');
    
    return `${dateStr} · ${startTime}–${endTime}`;
  };

  // Helper function to color-code the status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending_approval':
        return <span className="inline-block bg-[#FFF3CD] text-[#8A6D00] text-xs font-semibold px-3 py-1.5 rounded-lg">Pending Approval</span>;
      case 'approved_awaiting_payment':
        return <span className="inline-block bg-[#DCE8FF] text-[#1F4FA3] text-xs font-semibold px-3 py-1.5 rounded-lg">Approved – Awaiting Payment</span>;
      case 'confirmed':
        return <span className="inline-block bg-[#D4F1DC] text-[#17703A] text-xs font-semibold px-3 py-1.5 rounded-lg">Confirmed</span>;
      case 'rejected':
        return <span className="inline-block bg-[#FFE5E5] text-[#D32F2F] text-xs font-semibold px-3 py-1.5 rounded-lg">Rejected</span>;
      default:
        return <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4F5] flex flex-col">
      
      {/* 1. TOP NAVBAR WITH DROPDOWNS */}
      <header className="w-full bg-white border-b border-[#E3DEE0] h-16 flex items-center justify-between px-12 shrink-0 relative z-50">
        
        {/* Left Side: Logo & Menus */}
        <div className="flex items-center gap-24">
          <h1 className="text-[#7A1F3D] text-[22px] font-bold cursor-pointer">SUBook</h1>
          
          <nav className="hidden md:flex gap-16 text-sm font-semibold text-[#1F1A1C]">
            <a href="#" className="text-[#7A1F3D] py-4">Dashboard</a>
            
            {/* Venue Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('venue')}
                className="flex items-center gap-1 hover:text-[#7A1F3D] py-4"
              >
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

            {/* Events Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('events')}
                className="flex items-center gap-1 hover:text-[#7A1F3D] py-4"
              >
                Events
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15L7 10H17L12 15Z" fill="currentColor"/></svg>
              </button>
              {activeDropdown === 'events' && (
                <div className="absolute top-14 left-0 w-48 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
                  <a href="#" className="px-4 py-3 hover:bg-[#FAF3F6]">Publish Event</a>
                  <a href="#" className="px-4 py-3 hover:bg-[#FAF3F6]">Browse Events</a>
                </div>
              )}
            </div>

            {/* Help Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('help')}
                className="flex items-center gap-1 hover:text-[#7A1F3D] py-4"
              >
                Help & Support
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15L7 10H17L12 15Z" fill="currentColor"/></svg>
              </button>
              {activeDropdown === 'help' && (
                <div className="absolute top-14 left-0 w-48 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
                  <button onClick={() => { navigate('/faq'); setActiveDropdown(null); }} className="text-left px-4 py-3 hover:bg-[#FAF3F6]">FAQ</button>
                  <a href="https://forms.gle/YOUR_LOST_ITEM_LINK" target="_blank" rel="noreferrer" className="px-4 py-3 hover:bg-[#FAF3F6]">Lost Item</a>
                  <a href="https://forms.gle/YOUR_FEEDBACK_LINK" target="_blank" rel="noreferrer" className="px-4 py-3 hover:bg-[#FAF3F6]">Feedback</a>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Side: Role Dropdown */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('role')}
            className="flex items-center gap-2 bg-[#7A1F3D] text-white px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#5c162d] transition-colors"
          >
            <span>Club Rep</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.58744 11.379C7.63331 11.4234 7.69469 11.4597 7.76629 11.4848C7.8379 11.5099 7.91758 11.523 7.99847 11.523C8.07936 11.523 8.15904 11.5099 8.23064 11.4848C8.30224 11.4597 8.36363 11.4234 8.4095 11.379L12.9099 7.04593C12.9619 6.99595 12.9925 6.93741 12.9982 6.87667C13.0039 6.81594 12.9845 6.75532 12.9421 6.70142C12.8997 6.64751 12.836 6.60237 12.7579 6.57091C12.6797 6.53945 12.5901 6.52287 12.4988 6.52296H3.49811C3.40703 6.52322 3.31777 6.54001 3.23993 6.57155C3.1621 6.60309 3.09863 6.64817 3.05636 6.70195C3.01409 6.75573 2.99462 6.81618 3.00003 6.87678C3.00544 6.93739 3.03554 6.99587 3.08708 7.04593L7.58744 11.379Z" fill="white"/>
            </svg>
          </button>
          {activeDropdown === 'role' && (
            <div className="absolute top-12 right-0 w-48 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
              <button 
                onClick={() => {
                  setIsProfileOpen(true);
                  setActiveDropdown(null); // Close dropdown
                }} 
                className="text-left px-4 py-3 hover:bg-[#FAF3F6] text-sm text-gray-700"
              >
                Profile Settings
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button onClick={handleLogout} className="text-left px-4 py-3 hover:bg-red-50 text-sm text-red-600 font-medium">Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto w-full px-8 py-8 flex-grow">
        
        {/* Title Header */}
        <div className="mb-8">
          <h2 className="text-[#1F1A1C] text-[28px] font-bold">Club Dashboard</h2>
          <p className="text-[#6B6468] text-sm">Computing Society</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl border border-[#E3DEE0] shadow-sm">
            <p className="text-[#6B6468] text-xs font-semibold mb-2">Total Bookings</p>
            <p className="text-[#7A1F3D] text-[28px] font-bold">{loading ? '...' : bookings.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#E3DEE0] shadow-sm">
            <p className="text-[#6B6468] text-xs font-semibold mb-2">Upcoming Bookings</p>
            <p className="text-[#7A1F3D] text-[28px] font-bold">{loading ? '...' : bookings.filter(b => b.status === 'confirmed').length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#E3DEE0] shadow-sm">
            <p className="text-[#6B6468] text-xs font-semibold mb-2">Pending Approvals</p>
            <p className="text-[#7A1F3D] text-[28px] font-bold">{loading ? '...' : bookings.filter(b => b.status === 'pending_approval').length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#E3DEE0] shadow-sm">
            <p className="text-[#6B6468] text-xs font-semibold mb-2">Published Events</p>
            <p className="text-[#7A1F3D] text-[28px] font-bold">0</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="bg-[#7A1F3D] text-white text-[13px] font-semibold w-[180px] py-3 rounded-lg hover:bg-[#5c162d] transition-colors">
            Book Venue
          </button>
          <button className="bg-[#F2B705] text-[#1F1A1C] text-[13px] font-semibold w-[180px] py-3 rounded-lg hover:bg-yellow-500 transition-colors">
            Publish Event
          </button>
        </div>

        {/* Booking History Table */}
        <div className="bg-white rounded-xl border border-[#E3DEE0] shadow-sm p-6">
          <h3 className="text-[#1F1A1C] text-base font-bold mb-4">Booking History</h3>
          
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E3DEE0]">
                  <th className="py-3 text-[#1F1A1C] text-sm font-semibold">Event Name</th>
                  <th className="py-3 text-[#1F1A1C] text-sm font-semibold">Venue</th>
                  <th className="py-3 text-[#1F1A1C] text-sm font-semibold">Date & Time</th>
                  <th className="py-3 text-[#1F1A1C] text-sm font-semibold">Status</th>
                  <th className="py-3 text-[#1F1A1C] text-sm font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-[#6B6468]">Loading bookings...</td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-[#6B6468]">No bookings found for this club.</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.booking_id} className="border-b border-[#E3DEE0] last:border-0">
                      <td className="py-4 text-[#1F1A1C] text-sm font-semibold">{booking.event_name}</td>
                      <td className="py-4 text-[#1F1A1C] text-sm font-semibold">{booking.venues?.venue_name || 'Unknown Venue'}</td>
                      <td className="py-4 text-[#6B6468] text-[13px]">{formatDateTime(booking.start_time, booking.end_time)}</td>
                      <td className="py-4">{getStatusBadge(booking.status)}</td>
                      <td className="py-4 text-right">
                        {booking.status === 'approved_awaiting_payment' && (
                          <button className="bg-[#F2B705] text-[#1F1A1C] text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
                            Proceed to Payment
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* 3. PROFILE MODAL */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />

    </div>
  );
}