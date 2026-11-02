import { Link, useParams } from 'react-router-dom';

export default function AvailabilityPlaceholder() {
  const { venueId } = useParams();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F4F5] px-5 font-inter text-[#1F1A1C]">
      <main className="w-full max-w-lg rounded-xl border border-[#E3DEE0] bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A1F3D]">SCRUM-18 integration point</p>
        <h1 className="mt-3 text-2xl font-bold">Select a Slot</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#6B6468]">The availability calendar for this venue is not implemented yet. The selected venue is preserved for the upcoming booking flow.</p>
        <Link to={`/venues/${encodeURIComponent(venueId)}`} className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-[#7A1F3D] px-5 text-sm font-semibold text-white hover:bg-[#651830]">Back to Venue Details</Link>
      </main>
    </div>
  );
}
