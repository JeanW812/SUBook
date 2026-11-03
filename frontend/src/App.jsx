import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/LoginPage'; 
import Onboarding from './pages/OnboardingPage';
import AuthCallback from './pages/AuthCallback';
import StudentDashboard from './pages/StudentDashboard';
import MPPDashboard from './pages/MPPDashboard';
import ClubDashboard from './pages/ClubDashboard';
import VenueCatalogue from './pages/VenueCatalogue';
import VenueDetails from './pages/VenueDetails';
import AvailabilityPlaceholder from './pages/AvailabilityPlaceholder';
import BookingRequestPlaceholder from './pages/BookingRequestPlaceholder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* ONBOARDING (Any logged-in user) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>
        {/* STUDENT AND CLUB REPRESENTATIVE VENUE BROWSING */}
        <Route element={<ProtectedRoute allowedRoles={['student', 'club_representative']} />}>
          <Route path="/venues" element={<VenueCatalogue />} />
          <Route path="/venues/:venueId" element={<VenueDetails />} />
          <Route path="/venues/:venueId/availability" element={<AvailabilityPlaceholder />} />
          <Route path="/booking-request" element={<BookingRequestPlaceholder />} />
        </Route>

        {/* STUDENT ROUTES ONLY */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          
        </Route>

        {/* CLUB REPRESENTATIVE ROUTES ONLY */}
        <Route element={<ProtectedRoute allowedRoles={['club_representative']} />}>
          <Route path="/club-dashboard" element={<ClubDashboard />} />
        </Route>

        {/* MPP ADMIN ROUTES ONLY */}
        <Route element={<ProtectedRoute allowedRoles={['mpp_admin']} />}>
          <Route path="/mpp-dashboard" element={<MPPDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
