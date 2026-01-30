import { useState } from 'react';
import Auth from './frontend/Auth';
import LandingPage from './frontend/LandingPage';
import Main from './frontend/Main';
import './App.css';

function App() {
  const [authState, setAuthState] = useState<'auth' | 'landing' | 'dashboard'>('auth');

  return (
    <>
      {authState === 'auth' ? (
        <Auth onAuthSuccess={() => setAuthState('landing')} />
      ) : authState === 'dashboard' ? (
        <Main onLogout={() => setAuthState('landing')} />
      ) : (
        <LandingPage onEnter={() => setAuthState('dashboard')} />
      )}
    </>
  );
}

export default App;