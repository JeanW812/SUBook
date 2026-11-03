import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/LoginPage'; 
import Onboarding from './pages/OnboardingPage';
import AuthCallback from './pages/AuthCallback';
import StudentDashboard from './pages/StudentDashboard';
import MPPDashboard from './pages/MPPDashboard';
import ClubDashboard from './pages/ClubDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import Contact from './pages/Contact'
import AdminLoginPage from './pages/AdminLoginPage'
import ClubRepLoginPage from './pages/ClubRepLoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/login/club" element={<ClubRepLoginPage />} /> 

        {/* ONBOARDING (Any logged-in user) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
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