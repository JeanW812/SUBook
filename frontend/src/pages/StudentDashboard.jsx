import Sidebar from '../components/Sidebar';
import EventCard from '../components/EventCard';

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F6F4F5]">
      {/* Sidebar from your previous tasks */}
      <Sidebar role="student" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Navigation Bar */}
        <header className="w-full bg-white border-b border-[#E3DEE0] h-16 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-8">
            <h1 className="text-[#7A1F3D] text-[22px] font-bold">SUBook</h1>
            <nav className="hidden md:flex gap-6 text-sm font-semibold text-[#1F1A1C]">
              <a href="#" className="text-[#7A1F3D]">Home</a>
              <a href="#" className="hover:text-[#7A1F3D]">Venue & Booking</a>
              <a href="#" className="hover:text-[#7A1F3D]">Events</a>
              <a href="#" className="hover:text-[#7A1F3D]">Help & Support</a>
            </nav>
          </div>
          <div className="flex items-center gap-2 bg-[#7A1F3D] text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer">
            <span>Student</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.58744 11.379C7.63331 11.4234 7.69469 11.4597 7.76629 11.4848C7.8379 11.5099 7.91758 11.523 7.99847 11.523C8.07936 11.523 8.15904 11.5099 8.23064 11.4848C8.30224 11.4597 8.36363 11.4234 8.4095 11.379L12.9099 7.04593C12.9619 6.99595 12.9925 6.93741 12.9982 6.87667C13.0039 6.81594 12.9845 6.75532 12.9421 6.70142C12.8997 6.64751 12.836 6.60237 12.7579 6.57091C12.6797 6.53945 12.5901 6.52287 12.4988 6.52296H3.49811C3.40703 6.52322 3.31777 6.54001 3.23993 6.57155C3.1621 6.60309 3.09863 6.64817 3.05636 6.70195C3.01409 6.75573 2.99462 6.81618 3.00003 6.87678C3.00544 6.93739 3.03554 6.99587 3.08708 7.04593L7.58744 11.379Z" fill="white"/>
            </svg>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto">
          
          {/* Hero Banner */}
          <div className="bg-[#7A1F3D] w-full py-16 px-8 relative">
            <div className="max-w-7xl mx-auto flex flex-col gap-4">
              <h2 className="text-white text-[40px] font-bold leading-tight max-w-[700px]">
                Book SUB venues.<br />Discover campus events.
              </h2>
              <p className="text-[#F3DCE4] text-base max-w-[482px]">
                One centralized platform for UTM students, clubs and societies.
              </p>
              <div className="flex gap-4 mt-4">
                <button className="bg-[#F2B705] text-[#1F1A1C] font-semibold text-[13px] px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors">
                  Book Venue
                </button>
                <button className="border border-white text-white font-semibold text-[13px] px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                  Browse Events
                </button>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="max-w-7xl mx-auto w-full px-8 py-8">
            <h3 className="text-[#1F1A1C] text-xl font-bold mb-6">Upcoming & ongoing events</h3>
            
            {/* Responsive Grid for Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EventCard 
                title="Tech Talk: AI in Industry" 
                club="Computing Society" 
                date="12 Nov" time="2:00 PM" venue="Seminar Hall" 
                isOpen={true} 
                imageUrl="/Rectangle(2).png"
              />
              <EventCard 
                title="Charity Run 5K" 
                club="Sports Club" 
                date="20 Nov" time="7:00 AM" venue="Open Space" 
                isOpen={true} 
                imageUrl="/Rectangle.png"
              />
              <EventCard 
                title="Dance Showcase" 
                club="Dance Society" 
                date="28 Oct" time="8:00 PM" venue="Activity Hall" 
                isOpen={false} 
                imageUrl="/Rectangle(1).png"
              />
            </div>
          </div>
        </main>

        {/* Floating AI Button */}
        <button className="fixed bottom-8 right-8 bg-[#7A1F3D] w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-[#5c162d] transition-colors z-50">
          <span className="text-white text-lg font-bold">AI</span>
        </button>

      </div>
    </div>
  );
}