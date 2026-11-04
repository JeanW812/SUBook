import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ProfileModal from '../components/ProfileModal';

const clubFaqs = [
  {
    id: 1,
    question: "How do I book a venue for my club or society?",
    answer: "As a Club Representative, log in to your Club Dashboard and click 'Book Venue'. Select the venue, date, and time. Because you are booking on behalf of a club, the system will automatically apply the special Club/Society rates (which are lower than student rates). Crucially, you must upload an official event approval letter during the booking process. Our AI OCR system will scan the letter to pre-fill your event details, but MPP will still manually verify the document before approving your request.",
  },
  {
    id: 2,
    question: "How do I publish an event to the Student Dashboard?",
    answer: "Go to your Club Dashboard and click 'Publish Event'. Fill out the event creation form with the event name, description, date, time, venue, and an optional poster. You can also include an external registration link (like a Google Form or payment portal). Once published, your event will immediately appear on the centralized 'Events' page for all students to discover and register.",
  },
  {
    id: 3,
    question: "What happens if my club's booking request is rejected?",
    answer: "If the MPP Admin rejects your booking, the status will change to 'Rejected', and the system will display the reason provided by the admin (e.g., invalid approval letter, venue already booked, or incomplete information). The time slot will be released back to the public. You can correct the issue and submit a new booking request. You will also receive an in-app notification regarding the rejection.",
  },
  {
    id: 4,
    question: "How do I manage my club representative profile?",
    answer: "Click on the 'Club Rep' button in the top right corner and select 'Profile Settings'. You can update your personal full name, phone number, and profile picture. Note that your matric number is not displayed here, as club accounts are tied to the society rather than a specific student's academic profile.",
  },
  {
    id: 5,
    question: "What is the AI OCR feature for approval letters?",
    answer: "When you upload your approval letter, our Optical Character Recognition (OCR) system reads the document and automatically extracts key details such as the event name, date, and venue. This saves you time from typing everything manually and reduces errors. However, please double-check the extracted information on the form before submitting, as MPP will compare the final booking details against your original uploaded letter.",
  },
  {
    id: 6,
    question: "Can I edit an event after I have published it?",
    answer: "Yes. Navigate to 'My Published Events' in your dashboard, find the event you want to change, and click 'Edit'. You can update the description, change the time, or upload a new poster. If an event is cancelled or rescheduled, you must update the listing immediately so students are not misinformed. These edits will be reflected on the student-facing Events page instantly.",
  },
  {
    id: 7,
    question: "How does the 24-hour payment window work for clubs?",
    answer: "Once MPP approves your club's booking, the status changes to 'Approved – Awaiting Payment'. You have exactly 24 hours to complete the payment via the dashboard. If you fail to pay within 24 hours, the system will automatically cancel the booking, release the venue slot to other users, and notify you. Payment reminders will be sent to your dashboard before the deadline expires.",
  },
  {
    id: 8,
    question: "Can we book multiple venues for the same event?",
    answer: "Yes, if your event requires multiple spaces (e.g., a Seminar Hall for the talk and an Open Space for the exhibition), you can submit separate booking requests for each venue. Just ensure you select the exact same date and timings for all requests so the MPP Admin can approve them together without scheduling conflicts.",
  }
];

export default function ClubFAQ() {
  const [openId, setOpenId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Added Mobile State
  const navigate = useNavigate();

  const toggleFAQ = (id) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const leftFaqs = clubFaqs.slice(0, 4);
  const rightFaqs = clubFaqs.slice(4, 8);

  const renderFaqCard = (faq) => {
    const isOpen = openId === faq.id;
    return (
      <div 
        key={faq.id} 
        className="bg-white rounded-[8px] shadow-[0_15px_45px_-10px_rgba(0,0,0,0.15)] transition-all duration-300 w-full"
      >
        <button 
          onClick={() => toggleFAQ(faq.id)} 
          className="w-full flex items-start justify-between p-6 text-left focus:outline-none group"
        >
          <span className="text-[#1B1139] font-semibold text-[16px] pr-4 leading-snug">
            {faq.question}
          </span>
          <div className="shrink-0 mt-0.5">
            {isOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="#7A1F3D" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="#1B1139" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            )}
          </div>
        </button>

        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="px-6 pb-6 text-[#6B6468] text-sm leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF] flex flex-col relative overflow-x-hidden font-inter h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      <div className="absolute right-[-100px] top-[50px] w-[400px] h-[400px] bg-[#DB6D6F] rounded-full opacity-10 blur-3xl pointer-events-none"></div>

      {/* RESPONSIVE NAVBAR */}
      <header className="w-full bg-white border-b border-[#E3DEE0] h-16 flex items-center justify-between px-6 md:px-12 shrink-0 relative z-50">
        
        <div className="flex items-center gap-4 md:gap-24">
          
          {/* Mobile Hamburger Icon */}
          <button 
            className="md:hidden text-[#1F1A1C] p-2 -ml-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>

          <h1 onClick={() => navigate('/club-dashboard')} className="text-[#7A1F3D] text-[22px] font-bold cursor-pointer">SUBook</h1>
          
          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex gap-16 text-sm font-semibold text-[#1F1A1C]">
            <a href="/club-dashboard" className="hover:text-[#7A1F3D] py-4">Dashboard</a>
            
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
                  <a href="#" className="px-4 py-3 hover:bg-[#FAF3F6]">Publish Event</a>
                  <a href="#" className="px-4 py-3 hover:bg-[#FAF3F6]">Browse Events</a>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => toggleDropdown('help')} className="flex items-center gap-1 text-[#7A1F3D] py-4">
                Help & Support
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15L7 10H17L12 15Z" fill="currentColor"/></svg>
              </button>
              {activeDropdown === 'help' && (
                <div className="absolute top-14 left-0 w-48 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
                  <button onClick={() => { setActiveDropdown(null); }} className="text-left px-4 py-3 hover:bg-[#FAF3F6] text-[#7A1F3D] font-bold">FAQ</button>
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
            <span>Club Rep</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.58744 11.379C7.63331 11.4234 7.69469 11.4597 7.76629 11.4848C7.8379 11.5099 7.91758 11.523 7.99847 11.523C8.07936 11.523 8.15904 11.5099 8.23064 11.4848C8.30224 11.4597 8.36363 11.4234 8.4095 11.379L12.9099 7.04593C12.9619 6.99595 12.9925 6.93741 12.9982 6.87667C13.0039 6.81594 12.9845 6.75532 12.9421 6.70142C12.8997 6.64751 12.836 6.60237 12.7579 6.57091C12.6797 6.53945 12.5901 6.52287 12.4988 6.52296H3.49811C3.40703 6.52322 3.31777 6.54001 3.23993 6.57155C3.1621 6.60309 3.09863 6.64817 3.05636 6.70195C3.01409 6.75573 2.99462 6.81618 3.00003 6.87678C3.00544 6.93739 3.03554 6.99587 3.08708 7.04593L7.58744 11.379Z" fill="white"/>
            </svg>
          </button>
          {activeDropdown === 'role' && (
            <div className="absolute top-12 right-0 w-48 bg-white border border-[#E3DEE0] rounded-lg shadow-lg py-1 flex flex-col">
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
          <a href="/club-dashboard" className="px-6 py-3 text-[#7A1F3D] font-semibold border-b border-gray-100">Dashboard</a>
          
          <div className="px-6 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Venue & Booking</p>
            <a href="#" className="block py-1 text-[#1F1A1C] font-semibold">Book Venue</a>
            <a href="#" className="block py-1 text-[#1F1A1C] font-semibold">Booking History</a>
          </div>

          <div className="px-6 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Events</p>
            <a href="#" className="block py-1 text-[#1F1A1C] font-semibold">Publish Event</a>
            <a href="#" className="block py-1 text-[#1F1A1C] font-semibold">Browse Events</a>
          </div>

          <div className="px-6 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Help & Support</p>
            <button onClick={() => { setIsMobileMenuOpen(false); setActiveDropdown(null); }} className="block py-1 text-[#1F1A1C] font-semibold">FAQ</button>
            <a href="https://forms.gle/YOUR_LOST_ITEM_LINK" target="_blank" rel="noreferrer" className="block py-1 text-[#1F1A1C] font-semibold">Lost Item</a>
            <a href="https://forms.gle/YOUR_FEEDBACK_LINK" target="_blank" rel="noreferrer" className="block py-1 text-[#1F1A1C] font-semibold">Feedback</a>
          </div>
        </div>
      )}

      {/* FAQ Content Area */}
      <main className="flex-1 max-w-[1100px] mx-auto w-full px-4 md:px-8 py-10 md:py-20 relative z-10">
        <h1 className="text-[#7A1F3D] font-bold text-3xl md:text-[40px] text-center mb-10 md:mb-16 tracking-wide">
          Frequently Ask Questions
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
          <div className="flex flex-col gap-4 md:gap-8">
            {leftFaqs.map(renderFaqCard)}
          </div>
          
          <div className="flex flex-col gap-4 md:gap-8">
            {rightFaqs.map(renderFaqCard)}
          </div>
        </div>
      </main>

      <button className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#7A1F3D] w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-[#5c162d] transition-colors z-50">
        <span className="text-white text-base md:text-lg font-bold">AI</span>
      </button>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
}