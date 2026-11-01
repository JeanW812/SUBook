import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage'; // Import your beautiful login page
import Onboarding from './pages/OnboardingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route shows the Login page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;