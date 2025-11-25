// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BookingConfirmation from './pages/BookingConfirmation';

import AboutPage from './pages/AboutPage';      // ⬅️ new
import ContactPage from './pages/ContactPage';  // ⬅️ new

import Header from './components/Header';
import Footer from './components/Footer';
import AdminShortcut from './components/AdminShortcut';

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AdminShortcut />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />       {/* ⬅️ new */}
          <Route path="/contact" element={<ContactPage />} />   {/* ⬅️ new */}

          <Route
            path="/admin/login"
            element={
              isAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLogin />
              )
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

export default App;
