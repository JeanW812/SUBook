import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Sidebar from '../components/Sidebar';

export default function ClubDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubBookings = async () => {
      // 1. Get the currently logged-in user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 2. Find the club associated with this user
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

      // 3. Fetch the bookings for this club
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

  // Helper function to format the date and time (e.g., "12 Nov · 2-4 PM")
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
    <div className="flex min-h-screen bg-[#F6F4F5]">
      <Sidebar role="club_representative" />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="w-full bg-white border-b border-[#E3DEE0] h-16 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-8">
            <h1 className="text-[#7A1F3D] text-[22px] font-bold">SUBook</h1>
            <nav className="hidden md:flex gap-6 text-sm font-semibold text-[#1F1A1C]">
              <a href="#" className="text-[#7A1F3D]">Dashboard</a>
              <a href="#" className="hover:text-[#7A1F3D]">Venue & Booking</a>
              <a href="#" className="hover:text-[#7A1F3D]">Events</a>
              <a href="#" className="hover:text-[#7A1F3D]">Help & Support</a>
            </nav>
          </div>
          <div className="flex items-center gap-2 bg-[#7A1F3D] text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer">
            <span>Club Rep</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-6">
            <h2 className="text-[#1F1A1C] text-[28px] font-bold">Club Dashboard</h2>
            <p className="text-[#6B6468] text-sm">Computing Society</p>
          </div>

          {/* Summary Cards (Hardcoded for now, can be updated to dynamic later) */}
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
              <p className="text-[#7A1F3D] text-[28px] font-bold">0</p> {/* Hardcoded until Events table is built */}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button className="bg-[#7A1F3D] text-white text-[13px] font-semibold px-6 py-3 rounded-lg hover:bg-[#5c162d] transition-colors">
              Book Venue
            </button>
            <button className="bg-[#F2B705] text-[#1F1A1C] text-[13px] font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors">
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
      </div>
    </div>
  );
}