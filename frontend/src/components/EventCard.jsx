export default function EventCard({ title, club, date, time, venue, isOpen, imageUrl }) {
  return (
    <div className="bg-white rounded-xl border border-[#E3DEE0] overflow-hidden flex flex-col w-full max-w-[370px] shadow-sm">
      {/* Poster Image Area */}
      <div className="w-full h-[130px] bg-[#F0EBED] flex items-center justify-center relative">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <p className="text-[#6B6468] text-[13px]">Poster</p>
        )}
      </div>
      
      {/* Event Details */}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h3 className="text-[#1F1A1C] font-bold text-base">{title}</h3>
        <p className="text-[#6B6468] text-[13px]">{club}</p>
        <p className="text-[#6B6468] text-xs">{date} · {time} · {venue}</p>
        
        {/* Status Badge */}
        <div className="mt-2">
          {isOpen ? (
            <span className="inline-block bg-[#D4F1DC] text-[#17703A] text-xs font-semibold px-3 py-1.5 rounded-lg">
              Registration Open
            </span>
          ) : (
            <span className="inline-block bg-[#E5E5E5] text-[#000555] text-xs font-semibold px-3 py-1.5 rounded-lg">
              Registration Closed
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 pt-0 flex justify-end">
        <button className="bg-[#7A1F3D] text-white text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-[#5c162d] transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}