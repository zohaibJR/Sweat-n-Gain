import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import DashBoard from './Pages/DashBoard.jsx';
import NavBar from './Components/NavBar.jsx';
import Attendence from './Pages/Attendence.jsx';
import Aboutus from './Pages/Aboutus.jsx';

// ------------------- ProtectedRoute Component -------------------
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/" replace />;
  }
  return children;
}

// ------------------- AppContent -------------------
function AppContent() {
  const location = useLocation();

  // Routes where Navbar should be hidden
  const hiddenPaths = ["/", "/signup"];
  const shouldShowNavbar = !hiddenPaths.includes(location.pathname.toLowerCase());

  return (
    <>
      {shouldShowNavbar && <NavBar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/attendence" 
          element={
            <ProtectedRoute>
              <Attendence />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/aboutus" 
          element={
            <ProtectedRoute>
              <Aboutus />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

// ------------------- Main App -------------------
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
