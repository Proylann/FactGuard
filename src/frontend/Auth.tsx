import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Shield,
  Zap,
  Check,
  ArrowRight,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  KeyRound,
  Sparkles,
  Search
} from 'lucide-react';
// Make sure to import your logo correctly based on your project structure
import logo from '../assets/logo.png'; 

type IconProp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type AuthMode = 'landing' | 'login' | 'register' | 'forgot';

// --- ANIMATION VARIANTS ---

const pageVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.98,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  })
};

const floatingShape: Variants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

// --- SUB-COMPONENTS ---

type InputFieldProps = {
  icon: IconProp;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  showPassword?: boolean;
  togglePassword?: () => void;
  required?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, type = 'text', placeholder = '', value, onChange, isPassword = false, showPassword = false, togglePassword, required = true }) => (
  <div className="relative mb-5 group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Icon className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-600 transition-colors duration-300" />
    </div>
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-300 shadow-sm font-medium"
    />
    {isPassword && (
      <button 
        type="button" 
        onClick={togglePassword}
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    )}
  </div>
);

type AuthProps = { onAuthSuccess?: (session?: any) => void; onBack?: () => void };

// --- MAIN COMPONENT ---

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onBack }) => {
  const [mode, setMode] = useState<AuthMode>(() => {
    const savedMode = localStorage.getItem('authMode');
    return (savedMode as AuthMode) || 'landing';
  });
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({ email: '', username: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { level: 0, label: '', color: 'bg-gray-200' };
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    
    if (strength === 0) return { level: 1, label: 'Weak', color: 'bg-red-400' };
    if (strength <= 2) return { level: 2, label: 'Fair', color: 'bg-amber-400' };
    if (strength <= 3) return { level: 3, label: 'Good', color: 'bg-indigo-400' };
    return { level: 4, label: 'Strong', color: 'bg-emerald-400' };
  };
  const passwordStrength = getPasswordStrength(formData.password);

  useEffect(() => {
    localStorage.setItem('authMode', mode);
  }, [mode]);

  const handleModeChange = (newMode: AuthMode) => {
    const order = { landing: 0, login: 1, register: 2, forgot: 3 };
    setDirection(order[newMode] > order[mode] ? 1 : -1);
    setMode(newMode);
    setErrorMessage(null);
    setFormData({ email: '', username: '', password: '', confirmPassword: '' }); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);


    //  --Backend--//

    let endpoint = '/api/login';
    if (mode === 'register') endpoint = '/api/signup';
    if (mode === 'forgot') endpoint = '/api/forgot-password';

    try {
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      let data = responseText ? JSON.parse(responseText) : {};

      if (response.ok) {
          if (mode === 'forgot') {
            setErrorMessage("Password reset link sent to your email.");
          } else {
            // Save session info to localStorage so page refresh keeps user logged in.
            try {
              const token = data.access_token || data.token || data.session || null;
              const session = token ? { token, user: data.user || formData.email } : { authenticated: true, user: data.user || formData.email };
              localStorage.setItem('fg_session', JSON.stringify(session));
              onAuthSuccess?.(session);
            } catch (e) {
              onAuthSuccess?.();
            }
          }
      } else {
        const errorDetail = Array.isArray(data.detail) ? data.detail[0].msg : data.detail;
        setErrorMessage(errorDetail || "Request failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Connection error. Is your server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-slate-800 font-sans selection:bg-indigo-200 overflow-hidden relative flex items-center justify-center p-4">
      
      {/* PAGE BACKGROUND LAYER (Applies to both Landing and Auth) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div variants={floatingShape} animate="animate" className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-purple-300/30 rounded-full mix-blend-multiply filter blur-[100px]" />
        <motion.div variants={floatingShape} animate="animate" transition={{ delay: 2 }} className="absolute top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-[100px]" />
        
        {/* Subtle Grid Pattern for tech feel */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* ============================== */}
        {/* LANDING VIEW           */}
        {/* ============================== */}
        {mode === 'landing' && (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="relative w-full max-w-6xl flex flex-col items-center z-10 py-12">
            
            {/* Header Area */}
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-5 mb-8">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }} 
                  className="inline-flex relative overflow-hidden group bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] shadow-2xl shadow-indigo-200/50 border border-white"
                >
                  {/* Fallback to Shield if logo image fails, otherwise render image */}
                  {logo ? (
                     <img src={logo} alt="FactGuard" className="w-14 h-14 relative z-10 object-contain" />
                  ) : (
                     <Shield className="w-14 h-14 text-indigo-600 relative z-10" />
                  )}
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 drop-shadow-sm">
                  Fact<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Guard</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                Defending truth in the age of synthetic media. <br className="hidden md:block"/> Upload, verify, and expose deepfakes instantly.
              </p>
            </div> 

            {/* Upgraded Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 w-full mb-16 px-4 relative">
              {/* Background glowing orb behind cards */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-indigo-400/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

              {[
                { icon: Search, title: 'Deepfake Detection', desc: 'Advanced AI analysis to uncover subtle synthetic artifacts and anomalies.' },
                { icon: Zap, title: 'Real-time Verify', desc: 'Instant confidence scores and visual feedback on uploaded media.' },
                { icon: Check, title: 'Forensic Reports', desc: 'Downloadable, detailed forensic evidence for flagged content.' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10 }} 
                  className="relative group bg-white/60 backdrop-blur-2xl border border-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 text-left overflow-hidden transition-all duration-300"
                >
                  {/* Subtle inner gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-white to-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 shadow-md border border-white">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center w-full px-4">
              <button 
                onClick={() => handleModeChange('login')} 
                className="group relative px-10 py-5 bg-[#0F172A] text-white font-bold rounded-2xl shadow-2xl hover:shadow-indigo-900/30 transition-all duration-300 active:scale-95 overflow-hidden flex-1 sm:flex-none max-w-xs"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center gap-3 text-lg">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button 
                onClick={onBack || (() => console.log('Scroll down or handle Learn More'))} 
                className="group relative px-10 py-5 bg-white/50 backdrop-blur-md text-slate-900 font-bold rounded-2xl shadow-xl hover:bg-white hover:shadow-2xl transition-all duration-300 active:scale-95 border border-white/80 flex-1 sm:flex-none max-w-xs"
              >
                <span className="relative flex items-center justify-center gap-3 text-lg">
                  Learn More
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ============================== */}
        {/* SPLIT-PANE AUTH CARD       */}
        {/* ============================== */}
        {mode !== 'landing' && (
          <motion.div key="auth-container" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-5xl z-20">
            
            <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[650px]">
              
              {/* LEFT SIDE: IMAGE & BRANDING (Hidden on small screens) */}
              <div className="hidden md:flex md:w-5/12 relative bg-slate-900 overflow-hidden">
                {/* Unsplash Image */}
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop" 
                  alt="AI Security Abstract" 
                  className="absolute inset-0 object-cover w-full h-full opacity-40 mix-blend-overlay"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/80 to-slate-900/90" />
                
                {/* Decorative Shapes inside the left panel */}
                <div className="absolute top-[-10%] left-[-20%] w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-20%] w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10 pointer-events-none" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
                  <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
                </svg>

                {/* Left Panel Content */}
                <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white w-full">
                  <div>
                    <button onClick={() => handleModeChange('landing')} className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors text-sm font-bold bg-white/10 px-4 py-2 rounded-full w-fit backdrop-blur-md border border-white/10 hover:bg-white/20">
                      <ArrowRight className="w-4 h-4 rotate-180" /> Home
                    </button>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                        <Shield className="w-8 h-8 text-indigo-300" />
                      </div>
                      <span className="text-3xl font-black tracking-tight drop-shadow-md">FactGuard</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 leading-tight">Verify the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 drop-shadow-lg">Absolute Truth.</span></h2>
                    <p className="text-indigo-100/90 text-lg leading-relaxed font-medium">
                      Join our secure forensic platform. Detect synthetic media, deepfakes, and misinformation instantly.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-indigo-200 text-sm font-bold">
                    <Sparkles className="w-4 h-4" /> Powered by AI Forensics
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: FORMS */}
              <div className="w-full md:w-7/12 p-8 md:p-14 relative flex flex-col justify-center">
                
                {/* Subtle Right Side Background Graphic */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

                {/* Mobile Back Button (Only visible when image panel is hidden) */}
                <button onClick={() => handleModeChange('landing')} className="md:hidden absolute top-6 left-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div 
                    key={mode} 
                    custom={direction} 
                    variants={slideVariants} 
                    initial="enter" 
                    animate="center" 
                    exit="exit"
                    className="w-full max-w-md mx-auto"
                  >
                    {/* Form Header */}
                    <div className="mb-10 text-center md:text-left">
                      <div className="md:hidden inline-block p-4 bg-indigo-50 rounded-2xl mb-4 text-indigo-600">
                        {mode === 'login' && <Lock className="w-8 h-8" />}
                        {mode === 'register' && <User className="w-8 h-8" />}
                        {mode === 'forgot' && <KeyRound className="w-8 h-8" />}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 drop-shadow-sm">
                        {mode === 'login' && 'Welcome Back'}
                        {mode === 'register' && 'Create Account'}
                        {mode === 'forgot' && 'Reset Password'}
                      </h2>
                      <p className="text-slate-500 font-medium text-lg">
                        {mode === 'login' && 'Enter your credentials to access the dashboard.'}
                        {mode === 'register' && 'Join the network to start verifying media.'}
                        {mode === 'forgot' && 'Enter your email to receive reset instructions.'}
                      </p>
                    </div>

                    {/* ERROR ALERT */}
                    {errorMessage && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-shake shadow-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-bold">{errorMessage}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      
                      {mode === 'register' && (
                        <InputField icon={User} placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                      )}
                      
                      <InputField icon={Mail} type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      
                      {(mode === 'login' || mode === 'register') && (
                        <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} isPassword={true} showPassword={showPassword} togglePassword={() => setShowPassword(!showPassword)} />
                      )}

                      {mode === 'login' && (
                        <div className="flex justify-end mb-6">
                          <button type="button" onClick={() => handleModeChange('forgot')} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                            Forgot password?
                          </button>
                        </div>
                      )}
                      
                      {mode === 'register' && (
                        <>
                          {formData.password && (
                            <div className="mb-5 px-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Strength</span>
                                <span className={`text-xs font-black uppercase tracking-wider ${passwordStrength.color.replace('bg-', 'text-')}`}>{passwordStrength.label}</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full transition-all duration-500 ${passwordStrength.color}`} style={{ width: `${(passwordStrength.level / 4) * 100}%` }} />
                              </div>
                            </div>
                          )}
                          <InputField icon={Lock} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} isPassword={true} showPassword={showConfirmPassword} togglePassword={() => setShowConfirmPassword(!showConfirmPassword)} />
                          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <p className="text-xs text-red-500 font-bold mb-4 px-2">Passwords do not match</p>
                          )}
                        </>
                      )}

                      <button disabled={loading} className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-900/20 hover:shadow-indigo-500/30 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 mt-2 group">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                          <>
                            {mode === 'login' && 'Sign In'}
                            {mode === 'register' && 'Sign Up'}
                            {mode === 'forgot' && 'Send Reset Link'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Form Footer Links */}
                    <div className="mt-8 text-center md:text-left">
                      <p className="text-slate-500 font-medium">
                        {mode === 'login' && (
                          <>Don't have an account? <button type="button" onClick={() => handleModeChange('register')} className="ml-2 text-indigo-600 font-black hover:underline">Create one</button></>
                        )}
                        {mode === 'register' && (
                          <>Already have an account? <button type="button" onClick={() => handleModeChange('login')} className="ml-2 text-indigo-600 font-black hover:underline">Sign in</button></>
                        )}
                        {mode === 'forgot' && (
                          <>Remember your password? <button type="button" onClick={() => handleModeChange('login')} className="ml-2 text-indigo-600 font-black hover:underline">Back to Login</button></>
                        )}
                      </p>
                    </div>

                  </motion.div>
                </AnimatePresence>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;