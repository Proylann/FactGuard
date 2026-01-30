import { 
  ShieldCheck, ArrowRight,
  CheckCircle2, Zap, Terminal, Activity, AlertOctagon,
  ScanFace, EyeOff, Siren, Target, Layers, Layout, Database, 
  Cpu, GitBranch, Newspaper
} from 'lucide-react';

// --- STYLES ---
const customStyles = `
  @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
  .animate-scan { animation: scan 3s linear infinite; }
  .glass-header { background: rgba(255, 255, 255, 0.9); backdrop-filter: saturate(180%) blur(10px); }
  .glass-card-dark { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
  .tech-card-gradient { background: linear-gradient(145deg, #ffffff, #f8fafc); }
`;

// --- REUSABLE COMPONENTS ---

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 hover:text-indigo-600 transition-colors">
    {children}
  </a>
);

const ThreatCard = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <div className="p-6 glass-card-dark rounded-xl border border-slate-700/50 hover:border-red-500/30 transition-colors group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-slate-800 rounded-lg text-red-400 group-hover:text-red-500 transition-colors">
        <Icon size={20} />
      </div>
      <Activity size={16} className="text-slate-600 group-hover:text-red-500/50" />
    </div>
    <h3 className="text-lg font-bold text-slate-100 mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

const ObjectiveItem = ({ number, title, desc }: { number: string; title: string; desc: string }) => (
  <div className="flex gap-6 items-start">
    <div className="text-4xl font-black text-indigo-100 leading-none">{number}</div>
    <div>
      <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed max-w-sm">{desc}</p>
    </div>
  </div>
);

const TechStackCard = ({ title, category, icon: Icon, tools }: { title: string; category: string; icon: any; tools: string[] }) => (
  <div className="p-6 rounded-2xl border border-slate-200 tech-card-gradient hover:shadow-lg transition-all hover:-translate-y-1">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
          <Icon size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{category}</span>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      {tools.map((tool: string, i: number) => (
        <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-600 shadow-sm">
          {tool}
        </span>
      ))}
    </div>
  </div>
);

// --- SECTIONS ---

const LandingPage = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <div className="min-h-screen bg-[#fcfdfe] text-slate-900 selection:bg-indigo-100">
      <style>{customStyles}</style>
      
      {/* Navigation - Full Width */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-header border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <span className="font-black text-lg tracking-tight">TRUTHLENS</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            <NavLink href="#problem">The Threat</NavLink>
            <NavLink href="#objectives">Mission</NavLink>
            <NavLink href="#tech-stack">Tech Stack</NavLink>
            <NavLink href="#architecture">Architecture</NavLink>
          </div>

          <button 
            onClick={onEnter} 
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-indigo-600 transition-all active:scale-95"
          >
            Launch System <Terminal size={14} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-6">
              <Zap size={12} /> CITE Capstone 2026
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Forensic Intelligence for the <br /> 
              <span className="text-indigo-600">Synthetic Age.</span>
            </h1>
            <p className="text-base text-slate-600 mb-8 max-w-lg leading-relaxed font-medium">
              We provide a dual-layer verification framework designed to distinguish between authentic human expression and generative AI manipulations in video and text.
            </p>
            <div className="flex items-center gap-6">
              <button onClick={onEnter} className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
                Execute Analysis <ArrowRight size={18} />
              </button>
              <button className="text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors border-b-2 border-transparent hover:border-slate-900">
                View Methodology
              </button>
            </div>
          </div>
          
          <div className="relative group cursor-pointer" onClick={onEnter}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200 transition-transform duration-500 group-hover:scale-[1.01]">
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop" 
                alt="Cyber Forensic Scan" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply" />
              <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)] animate-scan" />
              
              {/* HUD Elements */}
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="bg-black/50 backdrop-blur text-white text-[10px] font-mono px-2 py-1 rounded border border-white/20">
                  REC ● 00:12:44
                </div>
              </div>
            </div>
            
            {/* Quick Metrics Overlay */}
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-xl border border-slate-100 flex gap-8">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Confidence</div>
                <div className="text-xl font-black text-slate-900">99.1%</div>
              </div>
              <div className="w-px bg-slate-100" />
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Status</div>
                <div className="text-xl font-black text-emerald-600 flex items-center gap-1">
                   Live <span className="relative flex h-2 w-2 ml-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PROBLEM STATEMENT Section (Dark Mode) */}
      <section id="problem" className="py-24 px-6 lg:px-12 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(to right, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <div className="text-red-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <AlertOctagon size={14} /> The Problem Context
              </div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-6">The Erosion of Digital Reality</h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                Generative Adversarial Networks (GANs) and Large Language Models (LLMs) have lowered the barrier for creating hyper-realistic synthetic media. This has led to an information crisis.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <div className="text-4xl font-black text-white mb-1">600%</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Increase in Deepfakes (2025)</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ThreatCard 
              icon={ScanFace} 
              title="Identity Synthesis" 
              desc="Deepfake algorithms (e.g., Faceswap, DeepFaceLab) can manipulate facial features with sub-pixel accuracy, bypassing traditional biometric checks."
            />
            <ThreatCard 
              icon={EyeOff} 
              title="Visual Disinformation" 
              desc="Synthetic media is increasingly used to fabricate events, creating false narratives that spread rapidly across social platforms before verification."
            />
            <ThreatCard 
              icon={Siren} 
              title="Institutional Distrust" 
              desc="The 'Liar's Dividend': As fake content improves, the public begins to doubt authentic evidence, destabilizing journalism and legal systems."
            />
          </div>
        </div>
      </section>

      {/* OBJECTIVES Section */}
      <section id="objectives" className="py-24 px-6 lg:px-12 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <div className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
              <Target size={14} /> Project Goals
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8">System Objectives</h2>
            <div className="space-y-10">
              <ObjectiveItem 
                number="01" 
                title="Develop Robust Detection" 
                desc="To engineer a CNN-based model capable of identifying mesoscopic artifacts in video frames with >95% accuracy."
              />
              <ObjectiveItem 
                number="02" 
                title="Automate Fact Verification" 
                desc="To integrate real-time LLM agents that cross-reference textual claims against verified global news APIs."
              />
              <ObjectiveItem 
                number="03" 
                title="Unified User Interface" 
                desc="To create an accessible web dashboard that democratizes access to advanced forensic tools for non-technical users."
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-center">
             <div className="flex items-center justify-center mb-8">
               <div className="relative">
                 <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full"></div>
                 <ShieldCheck size={120} className="text-indigo-900 relative z-10" strokeWidth={1} />
                 <CheckCircle2 size={40} className="text-emerald-500 absolute -bottom-2 -right-2 bg-white rounded-full border-4 border-white z-20" />
               </div>
             </div>
             <blockquote className="text-center">
               <p className="text-lg font-bold text-slate-900 italic mb-4">"Our goal isn't just to detect fakes, but to provide a layer of interpretability that explains <u>why</u> content is flagged."</p>
               <footer className="text-xs font-bold uppercase text-slate-500 tracking-widest">— Project TruthLens Team</footer>
             </blockquote>
          </div>
        </div>
      </section>

      {/* TECH STACK Section */}
      <section id="tech-stack" className="py-24 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-white rounded-xl shadow-sm border border-slate-100 mb-4">
              <Layers className="text-indigo-600" size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Hybrid Technology Stack</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Our system utilizes a microservice architecture, bridging a high-performance MERN web application 
              with a Python-based deep learning inference engine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TechStackCard 
              title="MERN Platform" 
              category="Frontend & API" 
              icon={Layout}
              tools={["React (Vite)", "Tailwind CSS", "Node.js", "Express"]}
            />
            <TechStackCard 
              title="Data Persistance" 
              category="Database" 
              icon={Database}
              tools={["MongoDB Atlas", "Mongoose ODM", "GridFS (Media)"]}
            />
            <TechStackCard 
              title="Inference Engine" 
              category="Machine Learning" 
              icon={Cpu}
              tools={["Python 3.10", "TensorFlow", "OpenCV", "Flask API"]}
            />
            <TechStackCard 
              title="Integration" 
              category="DevOps & Tools" 
              icon={GitBranch}
              tools={["Git/GitHub", "REST API", "Axios", "Google News API"]}
            />
          </div>
        </div>
      </section>

      {/* Architecture Section (Compact) */}
      <section id="architecture" className="py-24 px-6 lg:px-12 bg-white border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Technical Architecture</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Separating concerns between user management and heavy GPU processing.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <ScanFace className="text-indigo-600" /> Visual Engine (CNN)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Powered by a custom <strong>Xception Net</strong> trained on the FaceForensics++ dataset. It analyzes frame-by-frame compression artifacts and boundary inconsistencies.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">TensorFlow</span>
                <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">OpenCV</span>
              </div>
            </div>

            <div className="p-8 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Newspaper className="text-indigo-600" /> Semantic Engine (LLM)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                An orchestration layer using <strong>RAG (Retrieval-Augmented Generation)</strong>. It scrapes live news data and uses an LLM to verify claim accuracy and context.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">LangChain</span>
                <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">Google News API</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 bg-white border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">© 2026 CITE TruthLens Group</span>
          </div>
          <div className="flex gap-8">
            <NavLink href="#">University Ethics</NavLink>
            <NavLink href="#">Privacy Policy</NavLink>
            <NavLink href="#">Technical API</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- APP ENTRY POINT ---
export default LandingPage;