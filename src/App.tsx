import { useState, useEffect } from 'react';
import Auth from './frontend/Auth';
import LandingPage from './frontend/LandingPage';
import Main from './frontend/Main';
import './App.css';

function App() {
  // Initialize state from localStorage: if session exists, open dashboard
  const [authState, setAuthState] = useState<'auth' | 'landing' | 'dashboard'>(() => {
    try {
      const s = localStorage.getItem('fg_session');
      if (s) return 'dashboard';
      const saved = localStorage.getItem('authState') as 'auth' | 'landing' | 'dashboard' | null;
      return saved || 'auth';
    } catch (e) {
      return 'auth';
    }
  });

  // Save authState to localStorage whenever it changes (non-sensitive)
  useEffect(() => {
    try { localStorage.setItem('authState', authState); } catch (e) { /* ignore */ }
  }, [authState]);

  const handleAuthSuccess = (session?: any) => {
    try {
      if (session) localStorage.setItem('fg_session', JSON.stringify(session));
      else localStorage.setItem('fg_session', JSON.stringify({ authenticated: true }));
    } catch (e) { /* ignore */ }
    setAuthState('dashboard');
  };

  const handleLogout = () => {
    try { localStorage.removeItem('fg_session'); } catch (e) { /* ignore */ }
    setAuthState('landing');
  };

  return (
    <>
      {authState === 'landing' ? (
        <LandingPage onEnter={() => setAuthState('auth')} />
      ) : authState === 'auth' ? (
        <Auth onAuthSuccess={handleAuthSuccess} onBack={() => setAuthState('landing')} />
      ) : (
        <Main onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;