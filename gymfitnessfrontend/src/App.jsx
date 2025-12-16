import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import DashBoard from './Pages/DashBoard.jsx';
import NavBar from './Components/NavBar.jsx';
import Attendence from './Pages/Attendence.jsx';
import Aboutus from './Pages/Aboutus.jsx';

// Wrapper to use useLocation()
function AppContent() {
  const location = useLocation();

  // 🚫 Add ONLY the routes where you want to HIDE the Navbar
  const hiddenPaths = ["/", "/signup"];  
  // Example: hide on login + signup

  // Navbar will show on ALL routes except the ones in hiddenPaths
  const shouldShowNavbar = !hiddenPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <NavBar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/attendce" element={<Attendence />} />
        <Route path="/aboutus" element={<Aboutus />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
