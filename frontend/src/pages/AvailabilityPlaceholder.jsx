import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCalendarDays } from '../utils/availabilityCalendar';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TIME_ZONE_OFFSET = '+08:00';
const OPENING_HOUR = 8;
const CLOSING_HOUR = 24;
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTH_FORMATTER = new Intl.DateTimeFormat('en-MY', { month: 'long', year: 'numeric', timeZone: 'Asia/Kuala_Lumpur' });
const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat('en-MY', { day: 'numeric', month: 'short', timeZone: 'Asia/Kuala_Lumpur' });

const pad = (value) => String(value).padStart(2, '0');
const monthKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
const parseDateKey = (value) => new Date(`${value}T00:00:00${TIME_ZONE_OFFSET}`);
const todayKey = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur' }).format(new Date());

const getSlots = (date) => Array.from({ length: CLOSING_HOUR - OPENING_HOUR }, (_, index) => {
  const startHour = OPENING_HOUR + index;
  const endHour = startHour + 1;
  return {
    id: `${date}-${startHour}`,
    date,
    startHour,
    endHour,
    start: new Date(`${date}T${pad(startHour % 24)}:00:00${TIME_ZONE_OFFSET}`),
    end: new Date(`${date}T${pad(endHour % 24)}:00:00${TIME_ZONE_OFFSET}`),
  };
});

const formatHour = (hour) => `${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
const formatSlot = (slot) => `${formatHour(slot.startHour)} – ${formatHour(slot.endHour % 24)}`;
const overlaps = (slot, booking) => new Date(booking.start_time) < slot.end && new Date(booking.end_time) > slot.start;

const navigation = [
  ['Home', '/student-dashboard'], ['Book Venue', '/venues'], ['Events', '#'], ['FAQ', '#'],
  ['Booking History', '#'], ['Lost Item', '#'], ['Feedback', '#'],
];

function AvailabilityLegend() {
  return (
    <div className="mt-7 flex flex-wrap justify-between gap-4 text-xs text-[#6B6468]">
      <span className="inline-flex items-center gap-2"><i className="h-3.5 w-3.5 rounded-[3px] border border-[#E3DEE0] bg-[#F8D7DA]" />Locked / reserved</span>
      <span className="inline-flex items-center gap-2"><i className="h-3.5 w-3.5 rounded-[3px] border border-[#E3DEE0] bg-[#E5E5E5]" />Unavailable</span>
      <span className="inline-flex items-center gap-2"><i className="h-3.5 w-3.5 rounded-[3px] border border-[#E3DEE0] bg-[#CDEFD6]" />Selected</span>
    </div>
  );
}

export default function AvailabilityPlaceholder() {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [month, setMonth] = useState(() => { const now = new Date(); return new Date(now.getFullYear(), now.getMonth(), 1); });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryToken, setRetryToken] = useState(0);

  const monthValue = monthKey(month);
  const currentMonth = useMemo(() => {
    const [year, monthNumber] = monthValue.split('-').map(Number);
    return { year, month: monthNumber - 1 };
  }, [monthValue]);
  const calendarDays = useMemo(() => getCalendarDays(currentMonth.year, currentMonth.month), [currentMonth]);
  const today = todayKey();
  const minimumMonth = monthKey(parseDateKey(today));

  useEffect(() => {
    const controller = new AbortController();
    // This effect synchronizes the page with the requested month and venue.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError('');
    setSelectedSlot(null);
    fetch(`${API}/api/venues/${encodeURIComponent(venueId)}/availability?month=${monthValue}`, { signal: controller.signal })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Unable to retrieve availability');
        return result.data;
      })
      .then((result) => {
        setVenue(result.venue);
        setBookings(result.bookings || []);
        setSelectedDate((current) => current && current.startsWith(monthValue) ? current : '');
      })
      .catch((fetchError) => { if (fetchError.name !== 'AbortError') setError(fetchError.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [monthValue, retryToken, venueId]);

  const selectedSlots = useMemo(() => {
    if (!selectedDate || !venue) return [];
    return getSlots(selectedDate).map((slot) => ({
      ...slot,
      reserved: bookings.some((booking) => overlaps(slot, booking)),
      unavailable: venue.venue_status !== 'available' || (selectedDate === today && slot.start <= new Date()),
    }));
  }, [bookings, selectedDate, today, venue]);

  const dateStatus = (date) => {
    if (!date || date < today || venue?.venue_status !== 'available') return 'unavailable';
    const slots = getSlots(date);
    const dateBookings = bookings.filter((booking) => booking.start_time.slice(0, 10) <= date && booking.end_time.slice(0, 10) >= date);
    return slots.every((slot) => dateBookings.some((booking) => overlaps(slot, booking))) ? 'reserved' : 'available';
  };

  const selectedSlotLabel = selectedSlot ? formatSlot(selectedSlot) : '—';
  const selectedDateLabel = selectedDate ? SHORT_DATE_FORMATTER.format(parseDateKey(selectedDate)) : '—';
  const estimatedRate = selectedSlot && venue?.hourly_rate != null ? `RM${Number(venue.hourly_rate).toFixed(2)}/hour` : '—';
  const canContinue = Boolean(selectedDate && selectedSlot && !selectedSlot.reserved && !selectedSlot.unavailable);

  const chooseDate = (date) => {
    if (!date || dateStatus(date) === 'unavailable') return;
    setSelectedDate(date);
    setSelectedSlot(null);
  };
  const moveMonth = (offset) => {
    const next = new Date(month.getFullYear(), month.getMonth() + offset, 1);
    if (monthKey(next) >= minimumMonth) setMonth(next);
  };

  return (
    <div className="min-h-screen bg-[#F6F4F5] font-inter text-[#1F1A1C]">
      <header className="border-b border-[#E3DEE0] bg-white">
        <div className="mx-auto flex min-h-16 max-w-[1280px] flex-wrap items-center gap-x-14 gap-y-3 px-5 py-3 sm:px-[60px] lg:flex-nowrap lg:py-0">
          <Link to="/student-dashboard" className="shrink-0 text-[22px] font-bold text-[#7A1F3D]">SUBook</Link>
          <nav aria-label="Main navigation" className="flex flex-1 flex-wrap items-center justify-start gap-x-7 gap-y-2 text-sm lg:justify-between">
            {navigation.map(([label, path]) => <a key={label} href={path} aria-current={label === 'Book Venue' ? 'page' : undefined} className={label === 'Book Venue' ? 'font-semibold text-[#7A1F3D]' : 'hover:text-[#7A1F3D]'}>{label}</a>)}
          </nav>
          <span className="rounded-lg bg-[#7A1F3D] px-6 py-[10px] text-[13px] font-semibold text-white">Student</span>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-5 pb-24 pt-7 sm:px-[60px]">
        {loading && <p role="status" className="mt-10 text-[#6B6468]">Loading availability…</p>}
        {!loading && error && <div className="mt-10 rounded-xl border border-[#E3DEE0] bg-white p-6"><p role="alert" className="text-[#6B6468]">{error}</p><button type="button" onClick={() => setRetryToken((value) => value + 1)} className="mt-4 rounded-lg bg-[#7A1F3D] px-4 py-2 text-sm font-semibold text-white">Retry</button></div>}
        {!loading && !error && venue && (
          <>
            <h1 className="text-[28px] font-bold">{venue.venue_name} – Select Date &amp; Time</h1>
            <p className="mt-1 text-sm text-[#6B6468]">Check colour indicators, then choose an available slot</p>
            <div className="mt-7 grid gap-6 xl:grid-cols-[520px_300px_295px]">
              <section className="rounded-xl border border-[#E3DEE0] bg-white p-4 sm:p-5" aria-label="Availability calendar">
                <div className="flex items-center justify-between"><h2 className="text-base font-bold">{MONTH_FORMATTER.format(month)}</h2><div className="flex gap-2"><button type="button" aria-label="Previous month" disabled={monthValue === minimumMonth} onClick={() => moveMonth(-1)} className="h-8 w-8 rounded border border-[#E3DEE0] text-[#6B6468] disabled:cursor-not-allowed disabled:opacity-40">‹</button><button type="button" aria-label="Next month" onClick={() => moveMonth(1)} className="h-8 w-8 rounded border border-[#E3DEE0] text-[#6B6468]">›</button></div></div>
                <div className="mt-5 grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-[#6B6468]">{WEEKDAYS.map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
                <div className="mt-2 grid grid-cols-7 gap-1.5">{calendarDays.map((date, index) => { const status = dateStatus(date); const selected = date === selectedDate; return <button key={date || `empty-${index}`} type="button" disabled={!date || status === 'unavailable'} onClick={() => chooseDate(date)} aria-label={date || undefined} aria-pressed={selected} className={`aspect-square rounded-lg border border-[#E3DEE0] p-2 text-left text-[13px] transition-colors ${selected ? 'bg-[#CDEFD6] font-bold' : status === 'reserved' ? 'bg-[#F8D7DA]' : status === 'unavailable' ? 'bg-[#E5E5E5] text-[#6B6468]' : 'bg-white hover:border-[#7A1F3D]'} ${!date ? 'invisible' : ''}`}>{date ? Number(date.slice(-2)) : ''}</button>; })}</div>
                <AvailabilityLegend />
              </section>
              <section aria-label="Time slots"><h2 className="text-base font-bold">Time slots {selectedDate ? `– ${selectedDateLabel}` : ''}</h2>{!selectedDate && <p className="mt-4 text-sm text-[#6B6468]">Select an available date to view time slots.</p>}{selectedDate && <div className="mt-4 space-y-2.5">{selectedSlots.map((slot) => { const status = slot.unavailable ? 'Unavailable' : slot.reserved ? 'Reserved' : 'Available'; const disabled = slot.unavailable || slot.reserved; return <button key={slot.id} type="button" disabled={disabled} onClick={() => setSelectedSlot(slot)} className={`flex min-h-[46px] w-full items-center justify-between rounded-lg border border-[#E3DEE0] px-4 text-left text-[13px] ${slot.unavailable ? 'bg-[#E5E5E5]' : slot.reserved ? 'bg-[#F8D7DA]' : selectedSlot?.id === slot.id ? 'bg-[#CDEFD6]' : 'bg-white hover:border-[#7A1F3D]'}`}><span>{formatSlot(slot)}</span><span className="text-xs font-semibold text-[#6B6468]">{status}</span></button>; })}</div>}</section>
              <aside className="h-fit rounded-xl border border-[#E3DEE0] bg-white p-5" aria-label="Booking summary"><h2 className="text-base font-bold">Estimated fee</h2><div className="mt-5 space-y-1 text-[13px] text-[#6B6468]"><p>Venue: {venue.venue_name}</p><p>Date: {selectedDate ? `${selectedDateLabel} ${selectedDate.slice(0, 4)}` : '—'}</p><p>Time: {selectedSlotLabel}</p><p>Rate: {estimatedRate}</p><p>Deposit:</p><p>{venue.hourly_deposit != null ? `RM${Number(venue.hourly_deposit).toFixed(2)} (use not exceeding 24 hours)` : '—'}</p><p>{venue.daily_deposit != null ? `RM${Number(venue.daily_deposit).toFixed(2)} (use exceeding 24 hours)` : '—'}</p></div><button type="button" disabled={!canContinue} onClick={() => navigate(`/booking-request?venueId=${encodeURIComponent(venue.venue_id)}&date=${selectedDate}&startTime=${selectedSlot.start.toISOString()}&endTime=${selectedSlot.end.toISOString()}`)} className="mt-7 h-[42px] w-full rounded-lg bg-[#7A1F3D] text-[13px] font-semibold text-white hover:bg-[#651830] disabled:cursor-not-allowed disabled:opacity-50">Continue</button></aside>
            </div>
          </>
        )}
      </main>
      <div className="fixed bottom-5 right-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#7A1F3D] text-lg font-bold text-white">AI</div>
    </div>
  );
}
