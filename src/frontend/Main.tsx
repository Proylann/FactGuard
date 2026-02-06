import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, FileText, UploadCloud, CheckCircle2, 
  Fingerprint, Terminal, LogOut, History, FileVideo,
  ChevronRight, Sparkles, Loader2, Newspaper, 
  LayoutDashboard, Settings, Bell, Search, Menu, X,
  Activity, AlertTriangle, BarChart3, Scan
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10 }
};

const floatingShape = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  }
};

// --- SHARED COMPONENTS ---

const StatCard = ({ title, value, sub, icon: Icon, color }) => (
  <div className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-2xl shadow-lg shadow-indigo-100/20 flex items-start justify-between group hover:-translate-y-1 transition-transform">
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-800 mb-1">{value}</h3>
      <p className={`text-xs font-bold ${color === 'red' ? 'text-red-500' : 'text-emerald-500'}`}>{sub}</p>
    </div>
    <div className={`p-3 rounded-xl ${color === 'red' ? 'bg-red-50 text-red-500' : color === 'indigo' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'}`}>
      <Icon size={24} />
    </div>
  </div>
);

const AnalysisLog = ({ logs }) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  return (
    <div className="bg-[#0F172A] rounded-xl p-4 font-mono text-xs h-64 overflow-y-auto space-y-2 border border-slate-800 shadow-inner" ref={scrollRef}>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[10px] font-bold">
        <Terminal size={12} className="text-indigo-500" /> System Console
      </div>
      {logs.length === 0 ? (
        <div className="text-slate-600 text-center py-12 italic">System Idle...</div>
      ) : (
        <>
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <span className="text-slate-500 shrink-0">[{log.time}]</span>
              <span className={log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-emerald-400' : 'text-slate-300'}>
                {log.msg}
              </span>
            </motion.div>
          ))}
          <div className="animate-pulse text-indigo-500 font-bold">_</div>
        </>
      )}
    </div>
  );
};

const ResultCard = ({ result }) => (
  <motion.div 
    variants={fadeIn}
    initial="initial"
    animate="animate"
    className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-indigo-100/50 border border-white mt-6 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <div>
        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
          <CheckCircle2 className="text-emerald-500" size={28} /> Analysis Complete
        </h3>
        <p className="text-slate-500 text-sm mt-1">ID: <span className="font-mono text-slate-400">{result.id}</span></p>
      </div>
      <span className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ${result.score > 80 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
        {result.score > 80 ? '⚠️ High Probability Synthetic' : '✓ Verified Authentic'}
      </span>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
        <div className="text-slate-400 text-xs uppercase font-black tracking-wider mb-2">Confidence Score</div>
        <div className="flex items-baseline gap-2 mb-4">
          <div className="text-5xl font-black text-slate-900">{result.score}</div>
          <span className="text-slate-400 text-lg font-bold">%</span>
        </div>
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${result.score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${result.score > 80 ? 'bg-gradient-to-r from-red-500 to-pink-600' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`} 
          />
        </div>
      </div>
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
        <div className="text-slate-400 text-xs uppercase font-black tracking-wider mb-4">Detected Anomalies</div>
        <div className="flex flex-wrap gap-2">
          {result.artifacts.map((art, i) => (
            <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 font-bold shadow-sm">
              {art}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// --- VIEW 1: DASHBOARD ANALYTICS ---
const AnalyticsView = ({ logs }) => (
  <motion.div variants={fadeIn} initial="initial" animate="animate" className="space-y-6">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Scans" value="1,284" sub="+12% this week" icon={Activity} color="indigo" />
      <StatCard title="Threats Detected" value="342" sub="26% Detection Rate" icon={AlertTriangle} color="red" />
      <StatCard title="Avg. Confidence" value="98.2%" sub="+0.4% Accuracy" icon={Fingerprint} color="emerald" />
      <StatCard title="API Latency" value="42ms" sub="Optimal Performance" icon={Zap} color="indigo" />
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Chart Area (Simulated) */}
      <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-xl shadow-indigo-100/50">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="text-indigo-500" /> Detection Trends
          </h3>
          <select className="bg-slate-100 border-none text-xs font-bold text-slate-600 rounded-lg px-3 py-1 cursor-pointer outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        {/* CSS Bar Chart Simulation */}
        <div className="flex items-end justify-between h-48 gap-2 px-2">
          {[40, 65, 30, 85, 50, 95, 45].map((h, i) => (
            <div key={i} className="w-full bg-indigo-50 rounded-t-xl relative group">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-xl transition-all duration-500 group-hover:bg-purple-500"
                style={{ height: `${h}%` }}
              ></div>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded transition-opacity">
                {h} Scans
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>

      {/* Live System Log */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 border border-white shadow-xl shadow-indigo-100/50">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Terminal size={18} className="text-slate-400" /> System Activity
        </h3>
        <AnalysisLog logs={logs} />
      </div>
    </div>

    {/* Recent History Table */}
    <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-xl shadow-indigo-100/50">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <History className="text-indigo-500" /> Recent History
      </h3>
      <div className="space-y-3">
        {[
          { name: "press_conference_v2.mp4", type: "Video", date: "Just now", status: "Analyzing...", score: "-" },
          { name: "ceo_statement_clip.mov", type: "Video", date: "2 hrs ago", status: "Synthetic", score: "94%" },
          { name: "market_update_article.txt", type: "Text", date: "5 hrs ago", status: "Authentic", score: "12%" },
          { name: "viral_deepfake_test.mp4", type: "Video", date: "1 day ago", status: "Synthetic", score: "99%" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-lg ${item.type === 'Video' ? 'bg-indigo-50 text-indigo-500' : 'bg-purple-50 text-purple-500'}`}>
                {item.type === 'Video' ? <FileVideo size={20} /> : <FileText size={20} />}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                <p className="text-xs text-slate-400">{item.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score</p>
                <p className="font-mono text-sm font-bold text-slate-600">{item.score}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${item.status === 'Synthetic' ? 'bg-red-100 text-red-600' : item.status === 'Authentic' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- VIEW 2: FORENSIC TOOLS (FUNCTION) ---
const ToolsView = ({ activeTab, setActiveTab, analyzing, handleAnalyze, inputVal, setInputVal, result }) => (
  <motion.div variants={fadeIn} initial="initial" animate="animate" className="max-w-4xl mx-auto space-y-8">
    
    <div className="text-center mb-8">
      <h2 className="text-3xl font-black text-slate-900 mb-2">Forensic Analysis</h2>
      <p className="text-slate-500">Upload media or paste text to run deep-learning authenticity checks.</p>
    </div>

    {/* Main Input Card */}
    <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white shadow-xl shadow-indigo-100/50">
      
      {/* Tab Switcher */}
      <div className="flex justify-center mb-10">
        <div className="flex p-1.5 bg-slate-100/80 rounded-2xl">
          <button 
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'media' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <FileVideo size={18} /> Media Forensic
          </button>
          <button 
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'text' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Newspaper size={18} /> Text Analysis
          </button>
        </div>
      </div>

      {/* Upload/Input Area */}
      <div className="min-h-[300px] flex flex-col justify-center">
        {activeTab === 'media' ? (
          <div className="border-3 border-dashed border-indigo-100 bg-indigo-50/20 rounded-[2rem] p-12 text-center hover:bg-indigo-50/50 hover:border-indigo-300 transition-all cursor-pointer group">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 shadow-xl shadow-indigo-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <UploadCloud size={36} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Drag & Drop Media File</h3>
            <p className="text-slate-400 text-sm mb-8">Supports MP4, AVI, MOV • Max 100MB</p>
            
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              onChange={(e) => setInputVal(e.target.files?.[0]?.name || '')}
            />
            <label htmlFor="file-upload" className="inline-block bg-[#0F172A] text-white px-8 py-4 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
              Browse Files
            </label>
            {inputVal && <div className="mt-6 text-emerald-600 font-bold bg-emerald-50 px-6 py-3 rounded-xl inline-flex items-center gap-2 text-sm animate-in fade-in slide-in-from-bottom-2"><CheckCircle2 size={18} /> {inputVal}</div>}
          </div>
        ) : (
          <div className="space-y-4">
            <textarea 
              className="w-full bg-white border border-slate-200 rounded-[2rem] p-8 text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all h-64 placeholder:text-slate-400 resize-none shadow-inner text-lg leading-relaxed"
              placeholder="Paste article text, headline, or suspicious content here for semantic analysis..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>

      {/* Run Button */}
      <div className="mt-10 flex justify-end">
        <button 
          onClick={handleAnalyze}
          disabled={analyzing || !inputVal}
          className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl ${analyzing || !inputVal ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/40 hover:-translate-y-1 active:scale-95'}`}
        >
          {analyzing ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Processing...
            </>
          ) : (
            <>
              Run Forensic Analysis <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>

    {/* Result Component */}
    <AnimatePresence>
      {result && <ResultCard result={result} />}
    </AnimatePresence>

  </motion.div>
);

// --- MAIN APP SHELL ---
import { Zap } from 'lucide-react';

const DashboardShell = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'tools'
  const [activeTab, setActiveTab] = useState('media');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Helper: Log Generator
  const addLog = (msg, type = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [{ time, msg, type }, ...prev].slice(0, 50));
  };

  // Helper: Simulation Logic
  const handleAnalyze = () => {
    if (!inputVal) return;
    setAnalyzing(true);
    setResult(null);
    
    addLog("Initiating request...", "info");
    setTimeout(() => addLog("Allocating GPU resources...", "info"), 500);
    setTimeout(() => addLog("Model Loaded: Xception-DeepFake-v4", "success"), 1200);
    setTimeout(() => addLog(activeTab === 'media' ? "Scanning frame sequences..." : "Parsing semantic structure...", "info"), 2000);
    
    setTimeout(() => {
      setAnalyzing(false);
      const score = Math.floor(Math.random() * 30) + 70;
      addLog(`Analysis Complete. Score: ${score}%`, score > 80 ? "error" : "success");
      setResult({
        id: `FG-${Math.floor(Math.random() * 10000)}`,
        score: score,
        artifacts: activeTab === 'media' 
          ? ["Warping Area (Eye)", "Inconsistent Lighting", "Audio Desync"] 
          : ["Sentiment Mismatch", "Unverified Source", "Clickbait Pattern"]
      });
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-slate-800 font-sans selection:bg-indigo-200 overflow-hidden relative flex">
      
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div variants={floatingShape} animate="animate" className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-purple-300/30 rounded-full mix-blend-multiply filter blur-[100px]" />
        <motion.div variants={floatingShape} animate="animate" transition={{ delay: 2 }} className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-[100px]" />
        <motion.div variants={floatingShape} animate="animate" transition={{ delay: 1 }} className="absolute -bottom-[20%] left-[20%] w-[40vw] h-[40vw] bg-blue-300/30 rounded-full mix-blend-multiply filter blur-[100px]" />
      </div>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className={`${sidebarOpen ? 'w-72' : 'w-24'} hidden md:flex flex-col h-screen bg-white/70 backdrop-blur-xl border-r border-white/50 shadow-2xl shadow-indigo-100/20 z-20 transition-all duration-300`}
      >
        <div className="p-8 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30"><Shield size={24} /></div>
              <div>
                <span className="font-black text-xl tracking-tight text-slate-900 block leading-none">FactGuard</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise</span>
              </div>
            </div>
          ) : (
             <div className="bg-indigo-600 p-2 rounded-xl text-white mx-auto"><Shield size={24} /></div>
          )}
        </div>

        <nav className="flex-1 px-6 py-4 space-y-3">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all group ${currentView === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}
          >
            <LayoutDashboard size={22} className={currentView === 'dashboard' ? 'text-indigo-200' : 'group-hover:text-indigo-500'} />
            {sidebarOpen && <span className="font-bold">Analytics</span>}
          </button>

          <button 
            onClick={() => setCurrentView('tools')}
            className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all group ${currentView === 'tools' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}
          >
            <Scan size={22} className={currentView === 'tools' ? 'text-indigo-200' : 'group-hover:text-indigo-500'} />
            {sidebarOpen && <span className="font-bold">Forensic Tools</span>}
          </button>

          <div className="pt-4 mt-4 border-t border-slate-200/50">
            <button className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all text-slate-500 hover:bg-white hover:text-slate-700 group`}>
              <Settings size={22} className="group-hover:text-indigo-500" />
              {sidebarOpen && <span className="font-bold">Settings</span>}
            </button>
          </div>
        </nav>

        <div className="p-6">
           <button onClick={onLogout} className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl text-red-500 bg-red-50 hover:bg-red-100 font-bold transition-all">
             <LogOut size={20} />
             {sidebarOpen && <span>Logout</span>}
           </button>
           <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex justify-center mt-4 text-slate-400 hover:text-indigo-500"
          >
            {sidebarOpen ? <Menu size={20} className="rotate-90" /> : <Menu size={20} />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10 p-4 md:p-8 lg:p-12 scroll-smooth">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-1">{currentView === 'dashboard' ? 'Overview' : 'Analyzer'}</h1>
            <p className="text-slate-500 font-medium">System Status: <span className="text-emerald-500 font-bold">Online</span></p>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-white/80 rounded-full border border-white shadow-sm text-slate-500 text-sm font-bold">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              v4.2.0 Stable
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold shadow-xl shadow-slate-300">
              F
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' ? (
            <AnalyticsView key="analytics" logs={logs} />
          ) : (
            <ToolsView 
              key="tools"
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              analyzing={analyzing}
              handleAnalyze={handleAnalyze}
              inputVal={inputVal}
              setInputVal={setInputVal}
              result={result}
            />
          )}
        </AnimatePresence>

      </main>
    </div>
  );
};

export default DashboardShell;