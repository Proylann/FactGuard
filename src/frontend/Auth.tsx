import React, { useState } from 'react';
import { 
  ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle,
  CheckCircle2, Zap, User, Loader
} from 'lucide-react';

// --- STYLES ---
const authStyles = `
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-gradient { animation: gradient-shift 8s ease infinite; background-size: 200% 200%; }
  .glass-panel { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
  .animate-float { animation: float 6s ease-in-out infinite; }
`;

interface AuthProps {
  onAuthSuccess: () => void;
}

export default function Auth({ onAuthSuccess }: AuthProps) {
  const [mode, setMode] = useState<'landing' | 'login' | 'register'>('landing');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const validateRegister = () => {
    const newErrors = validateLogin();
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateLogin();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess();
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateRegister();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess();
    }, 1500);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  const handleModeChange = (newMode: typeof mode) => {
    resetForm();
    setMode(newMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans selection:bg-indigo-500/30 overflow-hidden">
      <style>{authStyles}</style>

      {/* Animated Background Decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Landing Page */}
      {mode === 'landing' && (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl w-full">
            {/* Header */}
            <div className="text-center mb-20">
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-2xl shadow-indigo-500/20 animate-float">
                  <ShieldCheck className="text-white" size={48} strokeWidth={1.5} />
                </div>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                TruthLens
              </h1>
              <p className="text-xl text-slate-400 mb-2">Forensic Intelligence for the Synthetic Age</p>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Distinguish between authentic human expression and generative AI manipulations with our dual-layer verification framework.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: ShieldCheck, title: 'AI Detection', desc: 'Advanced CNN model analyzes video & images for deepfake artifacts' },
                { icon: Zap, title: 'Fact Checking', desc: 'LLM-powered semantic analysis verifies claim authenticity' },
                { icon: CheckCircle2, title: 'Verified Results', desc: 'Get detailed forensic reports with confidence scores' }
              ].map((feature, i) => (
                <div key={i} className="glass-panel rounded-2xl p-8 text-center border-slate-700/50 hover:border-indigo-500/50 transition-all">
                  <feature.icon className="text-indigo-400 mb-4 mx-auto" size={32} />
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleModeChange('login')}
                className="group relative px-8 py-4 rounded-xl font-bold text-lg transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 transition-all group-hover:shadow-lg group-hover:shadow-indigo-500/50" />
                <span className="relative flex items-center justify-center gap-2">
                  Sign In <ArrowRight size={20} />
                </span>
              </button>
              
              <button
                onClick={() => handleModeChange('register')}
                className="px-8 py-4 rounded-xl font-bold text-lg glass-panel border border-indigo-500/50 hover:border-indigo-400/80 hover:bg-indigo-500/10 transition-all"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Page */}
      {mode === 'login' && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full">
            {/* Back Button & Header */}
            <button
              onClick={() => handleModeChange('landing')}
              className="mb-12 text-slate-400 hover:text-white transition-colors font-bold text-sm flex items-center gap-2"
            >
              ← Back to Home
            </button>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-600/20 rounded-lg">
                  <ShieldCheck className="text-indigo-400" size={24} />
                </div>
                <h2 className="text-3xl font-black">Welcome Back</h2>
              </div>
              <p className="text-slate-400">Sign in to access your forensic dashboard</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); }}
                    className={`w-full bg-slate-950/50 border rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500/50 focus:ring-red-500/30' : 'border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-500'}`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: '' }); }}
                    className={`w-full bg-slate-950/50 border rounded-lg py-3 pl-12 pr-12 text-white focus:outline-none focus:ring-2 transition-all ${errors.password ? 'border-red-500/50 focus:ring-red-500/30' : 'border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-500'}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.password}</p>}
              </div>

              {/* Remember & Forgot */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-slate-400 hover:text-slate-300 cursor-pointer transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded bg-slate-950 border-slate-700" />
                  Remember me
                </label>
                <a href="#" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">Forgot Password?</a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-slate-400 mt-8">
              Don't have an account?{' '}
              <button
                onClick={() => handleModeChange('register')}
                className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Register Page */}
      {mode === 'register' && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full">
            {/* Back Button & Header */}
            <button
              onClick={() => handleModeChange('landing')}
              className="mb-12 text-slate-400 hover:text-white transition-colors font-bold text-sm flex items-center gap-2"
            >
              ← Back to Home
            </button>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-600/20 rounded-lg">
                  <User className="text-indigo-400" size={24} />
                </div>
                <h2 className="text-3xl font-black">Join TruthLens</h2>
              </div>
              <p className="text-slate-400">Create your forensic analysis account</p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); }}
                    className={`w-full bg-slate-950/50 border rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500/50 focus:ring-red-500/30' : 'border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-500'}`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: '' }); }}
                    className={`w-full bg-slate-950/50 border rounded-lg py-3 pl-12 pr-12 text-white focus:outline-none focus:ring-2 transition-all ${errors.password ? 'border-red-500/50 focus:ring-red-500/30' : 'border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-500'}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors({ ...errors, confirmPassword: '' }); }}
                    className={`w-full bg-slate-950/50 border rounded-lg py-3 pl-12 pr-12 text-white focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword ? 'border-red-500/50 focus:ring-red-500/30' : 'border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-500'}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.confirmPassword}</p>}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 text-slate-400 text-sm cursor-pointer hover:text-slate-300 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded bg-slate-950 border-slate-700 mt-1" />
                I agree to the Terms of Service and Privacy Policy
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" /> Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-slate-400 mt-8">
              Already have an account?{' '}
              <button
                onClick={() => handleModeChange('login')}
                className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
