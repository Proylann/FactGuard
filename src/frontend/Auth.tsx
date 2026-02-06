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
} from 'lucide-react';
import logo from '../assets/logo.png';

type IconProp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

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

const floatingShape: Variants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

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
      <Icon className="w-5 h-5 text-indigo-300 group-focus-within:text-indigo-600 transition-colors duration-300" />
    </div>
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/60 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white/80 transition-all duration-300 shadow-sm"
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

type AuthProps = { onAuthSuccess?: () => void; onBack?: () => void };

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onBack }) => {
  const [mode, setMode] = useState<'landing' | 'login' | 'register'>(() => {
    const savedMode = localStorage.getItem('authMode');
    return (savedMode as 'landing' | 'login' | 'register') || 'landing';
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({ email: '', username: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Calculate password strength
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { level: 0, label: '', color: 'bg-gray-200' };
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    
    if (strength === 0) return { level: 1, label: 'Weak', color: 'bg-red-400' };
    if (strength <= 2) return { level: 2, label: 'Fair', color: 'bg-yellow-400' };
    if (strength <= 3) return { level: 3, label: 'Good', color: 'bg-blue-400' };
    return { level: 4, label: 'Strong', color: 'bg-green-400' };
  };
  const passwordStrength = getPasswordStrength(formData.password);

  // Save mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('authMode', mode);
  }, [mode]);

  const handleModeChange = (newMode: 'landing' | 'login' | 'register') => {
    setMode(newMode);
    setErrorMessage(null);
    setFormData({ email: '', username: '', password: '', confirmPassword: '' }); 
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // --- REAL BACKEND LOGIC (COMMENTED OUT) ---
    /*
    const endpoint = mode === 'register' ? '/api/signup' : '/api/login';

    try {
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        onAuthSuccess?.();
      } else {
        const errorDetail = Array.isArray(data.detail) ? data.detail[0].msg : data.detail;
        setErrorMessage(errorDetail || "Authentication failed.");
      }
    } catch (err) {
      setErrorMessage("Connection error. Is your FastAPI server running at port 8000?");
    } finally {
      setLoading(false);
    }
    */

    // --- DUMMY DATA SIMULATION ---
    console.log(`Simulating ${mode} request with:`, formData);
    
    // Simulate a 1.5 second network delay
    setTimeout(() => {
      // You can set specific dummy credentials here if you want to test failure cases
      // For example: if (formData.email === "fail@test.com") ...
      
      const isSuccess = true; 

      if (isSuccess) {
        console.log("Dummy Authentication Successful");
        // Trigger the success callback to move to the next screen
        onAuthSuccess?.();
      } else {
        setErrorMessage("Invalid dummy credentials (simulation).");
      }
      
      setLoading(false);
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-[#F0F4F8] text-slate-800 font-sans selection:bg-indigo-200 overflow-hidden relative flex items-center justify-center p-4">
      
      {/* --- BACKGROUND SHAPES --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div variants={floatingShape} animate="animate" className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-purple-300/30 rounded-full mix-blend-multiply filter blur-[80px]" />
        <motion.div variants={floatingShape} animate="animate" transition={{ delay: 2 }} className="absolute top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-[80px]" />
        <motion.div variants={floatingShape} animate="animate" transition={{ delay: 1 }} className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] bg-blue-300/30 rounded-full mix-blend-multiply filter blur-[80px]" />
      </div>

      <AnimatePresence mode="wait">
        {mode === 'landing' && (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="relative w-full max-w-6xl flex flex-col items-center z-10">
            <div className="mb-10 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div whileHover={{ scale: 1.05, rotate: 5 }} className="inline-flex relative overflow-hidden group">
                  <img src={logo} alt="FactGuard Logo" className="w-35 h-35 relative z-10" />
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900">
                  Fact<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Guard</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium">
                Defending truth in the age of synthetic media with AI-powered verification.
              </p>
            </div> 

            <div className="grid md:grid-cols-3 gap-6 w-full mb-12 px-4">
              {[
                { icon: Shield, title: 'Deepfake Detection', desc: 'Advanced analysis for synthetic artifacts.' },
                { icon: Zap, title: 'Real-time Verify', desc: 'Instant confidence scores & feedback.' },
                { icon: Check, title: 'Forensic Reports', desc: 'Detailed evidence for flagged content.' }
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-lg shadow-slate-200/50 text-left">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={() => handleModeChange('login')} className="group relative px-10 py-4 bg-[#0F172A] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2 text-lg">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {onBack && (
                <button onClick={onBack} className="group relative px-10 py-4 bg-white/90 text-slate-900 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 overflow-hidden border border-white/60">
                  <div className="absolute inset-0 bg-slate-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2 text-lg">
                    Learn More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {(mode === 'login' || mode === 'register') && (
          <motion.div key="auth-form" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-[480px] z-20">
            <div className="bg-white/80 backdrop-blur-2xl border border-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <div className="mb-8 text-center">
                <button onClick={() => handleModeChange('landing')} className="absolute top-8 left-8 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <div className="inline-block p-4 bg-indigo-50 rounded-2xl mb-4 text-indigo-600">
                  {mode === 'login' ? <Lock className="w-8 h-8" /> : <User className="w-8 h-8" />}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="text-slate-500">{mode === 'login' ? 'Please enter your details.' : 'Join us to verify the truth.'}</p>
              </div>

              {/* ERROR ALERT */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-shake">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {mode === 'register' && (
                  <InputField icon={User} placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                )}
                <InputField icon={Mail} type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} isPassword={true} showPassword={showPassword} togglePassword={() => setShowPassword(!showPassword)} />
                
                {mode === 'register' && (
                  <>
                    {formData.password && (
                      <div className="mb-4 px-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-slate-600">Password Strength</span>
                          <span className="text-xs font-bold text-slate-600">{passwordStrength.label}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full transition-all ${passwordStrength.color}`} style={{ width: `${(passwordStrength.level / 4) * 100}%` }} />
                        </div>
                      </div>
                    )}
                    <InputField icon={Lock} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} isPassword={true} showPassword={showConfirmPassword} togglePassword={() => setShowConfirmPassword(!showConfirmPassword)} />
                    {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500 font-medium mb-3 px-3">Passwords do not match</p>
                    )}
                  </>
                )}

                <button disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-4">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Sign Up'}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center pt-6 border-t border-slate-100">
                <p className="text-slate-500 font-medium">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                  <button onClick={() => handleModeChange(mode === 'login' ? 'register' : 'login')} className="ml-2 text-indigo-600 font-bold hover:underline">
                    {mode === 'login' ? 'Create one' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;