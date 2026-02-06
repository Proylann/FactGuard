import { useState, useEffect } from 'react';
import Auth from './frontend/Auth';
import LandingPage from './frontend/LandingPage';
import Main from './frontend/Main';
import './App.css';

function App() {
  // Initialize state from localStorage, defaulting to auth
  const [authState, setAuthState] = useState<'auth' | 'landing' | 'dashboard'>(() => {
    // Always start fresh with auth page
    return 'auth';
  });

  // Save authState to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('authState', authState);
  }, [authState]);

  return (
    <>
      {authState === 'landing' ? (
        // Landing -> navigates to Auth when user clicks Enter
        <LandingPage onEnter={() => setAuthState('auth')} />
      ) : authState === 'auth' ? (
        // After successful auth, go to dashboard (Main)
        <Auth onAuthSuccess={() => setAuthState('dashboard')} onBack={() => setAuthState('landing')} />
      ) : (
        <Main onLogout={() => setAuthState('landing')} />
      )}
    </>
  );
}

export default App;