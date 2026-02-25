import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewDiagnosis from "./pages/NewDiagnosis";
import Report from "./pages/Report";
import Consent from "./pages/Consent";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Pricing from "./pages/Pricing";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [consentAccepted, setConsentAccepted] = useState<boolean>(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedConsent = localStorage.getItem("consentAccepted");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedConsent) {
      setConsentAccepted(true);
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setConsentAccepted(false);
    localStorage.removeItem("user");
    localStorage.removeItem("consentAccepted");
  };

  const handleAcceptConsent = () => {
    setConsentAccepted(true);
    localStorage.setItem("consentAccepted", "true");
  };

  const handleUpdateUser = (userData: any) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/nosotros" />} />
        <Route path="/nosotros" element={<Landing user={user} />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        
        {/* Consent Route */}
        <Route 
          path="/consent" 
          element={
            user ? (
              consentAccepted ? <Navigate to="/dashboard" /> : <Consent onAccept={handleAcceptConsent} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        {/* Protected Routes */}
        <Route 
          element={
            user ? (
              consentAccepted ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/consent" />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="/dashboard" element={<Dashboard user={user} onUpdateUser={handleUpdateUser} />} />
          <Route path="/new" element={<NewDiagnosis user={user} onUpdateUser={handleUpdateUser} />} />
          <Route path="/report/:id" element={<Report user={user} />} />
          <Route path="/pricing" element={<Pricing user={user} />} />
        </Route>
      </Routes>
    </Router>
  );
}
