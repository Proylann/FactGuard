import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import heroImage from '../assets/image.png'; 

type IconProp = FC<{ className?: string }>;

// SVG Icons (created manually to avoid external libraries)
const ShieldIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ArrowRightIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const CheckIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const AlertIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const ScanIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const EyeOffIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A4.5 4.5 0 1012 11.25 4.5 4.5 0 007.5 6.75L3 3zm9.75 4.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
  </svg>
);

const SirenIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const TargetIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LayersIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const DatabaseIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const CpuIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const GitBranchIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M17 20H7m10 0H7m10-4v6m-4-2H3m4 0h10m0-6h-4m4 0H7m6 0h4m-4 0a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const NewspaperIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const ZapIcon: IconProp = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

// Reusable Components
const NavLink: FC<{ href: string; children: ReactNode }> = ({ href, children }) => (
  <a 
    href={href} 
    className="text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-indigo-700 transition-colors duration-300"
  >
    {children}
  </a>
);

const ThreatCard: FC<{ icon: IconProp; title: string; desc: string }> = ({ icon: Icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-gray-800 rounded-lg text-red-400">
        <Icon className="w-5 h-5" />
      </div>
      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-300 leading-relaxed">{desc}</p>
  </motion.div>
);

const ObjectiveItem: FC<{ number: ReactNode; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="flex gap-4 items-start mb-8 last:mb-0">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
      {number}
    </div>
    <div>
      <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  </div>
);

const TechStackCard: FC<{ title: string; category: string; icon: IconProp; tools: string[] }> = ({ title, category, icon: Icon, tools }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-start gap-3 mb-4">
      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-gray-900">{title}</h4>
        <span className="text-xs text-indigo-600 font-medium">{category}</span>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mt-3">
      {tools.map((tool, i) => (
        <span 
          key={i} 
          className="px-2 py-1 bg-gray-50 text-xs font-medium text-gray-700 rounded-md border border-gray-200"
        >
          {tool}
        </span>
      ))}
    </div>
  </motion.div>
);

const LandingPage: FC<{ onEnter?: () => void }> = ({ onEnter }) => {
  const handleStartAnalyzing = () => {
    if (onEnter && typeof onEnter === 'function') {
      onEnter();
    } else {
      // Fallback for standalone usage
      alert('Login functionality will be implemented next!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-sans selection:bg-indigo-100">
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scan-animation {
          animation: scan 3s linear infinite;
        }
        .glass-header {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .scan-container {
          position: relative;
          overflow: hidden;
        }
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to right, transparent, #22c55e, transparent);
          box-shadow: 0 0 10px #22c55e;
        }
      `}</style>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-header border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="FactGuard Logo" className="w-15 h-15" />
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
              Fact<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Guard</span>
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#problem">The Threat</NavLink>
            <NavLink href="#solution">Our Solution</NavLink>
            <NavLink href="#technology">Technology</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-6">
              <ZapIcon className="w-3.5 h-3.5" /> AI-Powered Verification System
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
              Defending Truth in the Age of <span className="text-indigo-700">Synthetic Media</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
              FactGuard combines cutting-edge AI with forensic analysis to detect deepfakes and verify news authenticity in real-time. 
              Protect yourself from misinformation with military-grade verification technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleStartAnalyzing}
                className="bg-indigo-700 text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-indigo-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/40"
              >
                Start Free Analysis <ArrowRightIcon className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-indigo-700 font-medium text-base transition-colors border-b-2 border-transparent hover:border-indigo-300 pb-1">
                How It Works →
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-2xl font-bold text-indigo-700 mb-1">99.2%</div>
                <div className="text-xs text-gray-500 font-medium">Detection Accuracy</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-2xl font-bold text-indigo-700 mb-1">1.2s</div>
                <div className="text-xs text-gray-500 font-medium">Avg. Analysis Time</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group cursor-pointer"
            onClick={handleStartAnalyzing}
          >
            {/* UPDATED CONTAINER AND IMAGE:
               1. Added 'bg-white' to container so transparent areas match the image bg.
               2. Changed image class to 'w-full h-auto object-contain'. 
                  This ensures the full infographic is visible and height adjusts automatically.
            */}
            <div className="scan-container rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <div className="scan-line scan-animation"></div>
              
              <img 
                src={heroImage} 
                alt="AI Analysis Dashboard" 
                className="w-full h-auto object-contain"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent pointer-events-none" />
              
              {/* HUD Elements */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-mono px-3 py-1.5 rounded-md border border-white/20">
                SECURE MODE • ACTIVE
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs text-indigo-200 font-medium mb-1">ANALYSIS COMPLETE</div>
                    <div className="text-lg font-bold text-white">Authenticity Verified</div>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <CheckIcon className="w-5 h-5" />
                    <span className="font-bold">99.3%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-4">
              <div className="text-center">
                <div className="text-xs text-gray-400 font-medium mb-1">Threat Level</div>
                <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Low
                </div>
              </div>
              <div className="w-px h-10 bg-gray-100"></div>
              <div className="text-center">
                <div className="text-xs text-gray-400 font-medium mb-1">Processing</div>
                <div className="text-lg font-bold text-indigo-700">Real-time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Problem Section */}
      <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-4">
              <AlertIcon className="w-3.5 h-3.5" /> Digital Deception Crisis
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Rising Tide of Synthetic Deception</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Deepfake technology and AI-generated misinformation are evolving faster than our defenses. 
              In 2025 alone, deepfake incidents increased by 900%, threatening democracy, security, and personal safety.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ThreatCard 
              icon={ScanIcon} 
              title="Hyper-Realistic Deepfakes" 
              desc="AI can now generate convincing fake videos and audio that bypass human detection, enabling fraud, harassment, and political manipulation."
            />
            <ThreatCard 
              icon={EyeOffIcon} 
              title="Erosion of Trust" 
              desc="As synthetic media proliferates, society faces a 'reality apathy' crisis where people distrust authentic information and evidence."
            />
            <ThreatCard 
              icon={SirenIcon} 
              title="Weaponized Misinformation" 
              desc="Bad actors deploy AI-generated content to destabilize markets, incite violence, and undermine democratic institutions at unprecedented scale."
            />
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text font-bold text-5xl mb-4">
              900%
            </div>
            <div className="text-gray-300 text-lg">
              Increase in deepfake incidents since 2023 (Source: Cybersecurity Report 2026)
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium mb-6">
              <CheckIcon className="w-3.5 h-3.5" /> Our Approach
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Dual-Layer Verification Technology</h2>
            
            <div className="space-y-6">
              <ObjectiveItem 
                number="1" 
                title="Deepfake Detection Engine" 
                desc="Our proprietary neural network analyzes micro-expressions, lighting inconsistencies, and digital artifacts invisible to the human eye."
              />
              <ObjectiveItem 
                number="2" 
                title="Contextual Fact Verification" 
                desc="Cross-references claims against trusted sources using semantic analysis and real-time news aggregation to verify context and accuracy."
              />
              <ObjectiveItem 
                number="3" 
                title="Explainable AI Reporting" 
                desc="Provides clear, visual explanations of detection results with confidence scores and evidence highlights for transparent decision-making."
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-gray-100 shadow-lg">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <ShieldIcon className="w-16 h-16 text-indigo-700 mx-auto" />
                  <div className="absolute -bottom-2 -right-2 bg-white border-4 border-white rounded-full p-1.5">
                    <CheckIcon className="w-6 h-6 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
            <blockquote className="text-center">
              <p className="text-xl font-bold italic text-gray-900 mb-4">
                "FactGuard doesn't just detect fakes—it rebuilds trust through transparent, explainable verification."
              </p>
              <footer className="text-sm font-medium text-indigo-700">
                — FactGuard Mission Statement
              </footer>
            </blockquote>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
                <div className="text-2xl font-bold text-indigo-700 mb-1">47M+</div>
                <div className="text-xs text-gray-500">Media Analyzed</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
                <div className="text-2xl font-bold text-indigo-700 mb-1">99.8%</div>
                <div className="text-xs text-gray-500">User Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
              <LayersIcon className="w-8 h-8 text-indigo-700" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cutting-Edge Technology Stack</h2>
            <p className="text-gray-600 text-lg">
              Our system combines multiple AI disciplines in a unified architecture designed for accuracy, speed, and scalability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TechStackCard 
              title="Deepfake Detection" 
              category="Computer Vision AI" 
              icon={CpuIcon}
              tools={["TensorFlow", "PyTorch", "OpenCV", "Custom CNNs"]}
            />
            <TechStackCard 
              title="Fact Verification" 
              category="NLP & Knowledge Graphs" 
              icon={NewspaperIcon}
              tools={["BERT", "Knowledge Graphs", "News API", "Semantic Analysis"]}
            />
            <TechStackCard 
              title="Data Infrastructure" 
              category="Secure Storage" 
              icon={DatabaseIcon}
              tools={["MongoDB", "PostgreSQL", "Redis", "Encrypted Storage"]}
            />
            <TechStackCard 
              title="System Architecture" 
              category="Cloud & DevOps" 
              icon={GitBranchIcon}
              tools={["Docker", "Kubernetes", "AWS", "CI/CD Pipeline"]}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-xl mb-6">
              <TargetIcon className="w-8 h-8 text-indigo-700" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How FactGuard Protects You</h2>
            <p className="text-gray-600 text-lg">
              Our verification process combines multiple AI systems to deliver comprehensive analysis in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-800 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upload or Link</h3>
              <p className="text-gray-600">
                Submit video, audio, image, or news article URL through our secure portal
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-emerald-800 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our dual-engine system performs deepfake detection and fact verification simultaneously
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-purple-50 rounded-2xl border border-purple-100 md:col-span-2">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-800 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Results</h3>
              <p className="text-gray-600">
                Receive detailed report with authenticity score, evidence highlights, and sharing recommendations
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={handleStartAnalyzing}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-purple-500/30"
            >
              Start Your Free Analysis <ArrowRightIcon className="w-5 h-5" />
            </button>
            <p className="mt-4 text-gray-500 text-sm">
              No credit card required • First 10 analyses free • Enterprise plans available
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-300 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-indigo-700 p-1.5 rounded-lg">
                <ShieldIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">FactGuard</span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Building a more trustworthy digital world through advanced AI verification technology. 
              Protecting truth since 2026.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-700 transition-all duration-300 cursor-pointer"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['How It Works', 'Technology', 'Case Studies', 'Pricing'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Ethics Guidelines', 'Research Papers'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2026 FactGuard Technologies. All rights reserved. Military-grade verification for the digital age.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;