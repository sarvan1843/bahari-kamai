import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { api } from './api';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";

/* ─── Auth Context ─── */
const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch user profile from Firestore
          const data = await api.getMe();
          setUser(data.user);
        } catch (err) {
          console.error("Failed to fetch user data", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (credentials) => {
    const data = await api.login(credentials);
    // User state will be set by onAuthStateChanged
    return data;
  };

  const signup = async (userData) => {
    await api.signup(userData);
    return true;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token: user ? user.id : null, loading, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ─── Protected Route ─── */
function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-md">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-on-primary">currency_rupee</span>
          </div>
          <p className="text-on-surface-variant font-sans text-body-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* ─── Lazy Page Imports ─── */
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SurveysPage from './pages/SurveysPage';
import SurveyDetailPage from './pages/SurveyDetailPage';
import AppsPage from './pages/AppsPage';
import WithdrawPage from './pages/WithdrawPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ReferPage from './pages/ReferPage';
import DailyRewardPage from './pages/DailyRewardPage';
import SpinWinPage from './pages/SpinWinPage';

/* ─── App Component ─── */
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/surveys" element={<ProtectedRoute><SurveysPage /></ProtectedRoute>} />
        <Route path="/survey/:id" element={<ProtectedRoute><SurveyDetailPage /></ProtectedRoute>} />
        <Route path="/apps" element={<ProtectedRoute><AppsPage /></ProtectedRoute>} />
        <Route path="/withdraw" element={<ProtectedRoute><WithdrawPage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/refer" element={<ProtectedRoute><ReferPage /></ProtectedRoute>} />
        <Route path="/daily-reward" element={<ProtectedRoute><DailyRewardPage /></ProtectedRoute>} />
        <Route path="/spin" element={<ProtectedRoute><SpinWinPage /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
