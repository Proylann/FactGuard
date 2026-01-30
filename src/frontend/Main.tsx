import { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, FileText, UploadCloud, CheckCircle2, 
  Fingerprint, Terminal, LogOut, History, FileVideo,
  ChevronRight, Sparkles, Loader, Newspaper
} from 'lucide-react';

const AnalysisLog = ({ logs }: { logs: Array<{ time: string; msg: string; type: string }> }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  return (
    <div className="bg-slate-950/80 rounded-b-xl p-4 font-mono text-xs h-40 overflow-y-auto space-y-1" ref={scrollRef}>
      {logs.length === 0 ? (
        <div className="text-slate-600 text-center py-8">Awaiting analysis...</div>
      ) : (
        <>
          {logs.map((log: any, i: number) => (
            <div key={i} className="flex gap-2">
              <span className="text-slate-600 shrink-0">[{log.time}]</span>
              <span className={log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-emerald-400' : 'text-slate-400'}>
                {log.msg}
              </span>
            </div>
          ))}
          {logs.length > 0 && <div className="animate-pulse text-indigo-500 font-bold">_</div>}
        </>
      )}
    </div>
  );
};

const ResultCard = ({ result }: { result: { id: string; score: number; artifacts: string[] } }) => (
  <div className="glass-panel rounded-2xl p-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
    <div className="flex items-center justify-between mb-8">
      <h3 className="text-xl font-black text-white flex items-center gap-2">
        <CheckCircle2 className="text-emerald-400" size={24} /> Forensic Analysis Complete
      </h3>
      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${result.score > 80 ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'}`}>
        {result.score > 80 ? '⚠️ Likely Synthetic' : '✓ Likely Authentic'}
      </span>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="glass-panel rounded-xl p-6 border border-slate-700/50">
        <div className="text-slate-400 text-xs uppercase font-black tracking-wider mb-3">Confidence Score</div>
        <div className="flex items-baseline gap-2 mb-4">
          <div className="text-4xl font-black text-white">{result.score}</div>
          <span className="text-slate-400 text-sm">%</span>
        </div>
        <div className="w-full bg-slate-800/50 h-2 rounded-full overflow-hidden border border-slate-700">
          <div 
            className={`h-full transition-all ${result.score > 80 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-emerald-500 to-emerald-600'}`} 
            style={{ width: `${result.score}%` }} 
          />
        </div>
      </div>

      <div className="glass-panel rounded-xl p-6 border border-slate-700/50">
        <div className="text-slate-400 text-xs uppercase font-black tracking-wider mb-3">Detection Artifacts</div>
        <div className="flex flex-wrap gap-2">
          {result.artifacts.map((art: string, i: number) => (
            <span key={i} className="px-3 py-1.5 bg-slate-900/50 border border-slate-700 rounded-lg text-xs text-slate-300 font-semibold">
              {art}
            </span>
          ))}
        </div>
      </div>
    </div>
    
    <div className="border-t border-slate-700/50 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-slate-500 font-mono">
      <div className="space-y-1">
        <div>Analysis ID: <span className="text-slate-400">{result.id}</span></div>
        <div>Model: <span className="text-slate-400">Xception-DeepFake-v4</span></div>
      </div>
      <button className="px-4 py-2 bg-indigo-600/20 border border-indigo-500/50 rounded-lg text-indigo-400 hover:bg-indigo-600/30 transition-all text-xs font-bold">
        Download Report
      </button>
    </div>
  </div>
);

// --- STYLES FOR DASHBOARD ---
const dashboardStyles = `
  @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
  .animate-scan { animation: scan 3s linear infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .glass-panel { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
`;

// --- MAIN DASHBOARD LAYOUT ---

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('media');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ id: string; score: number; artifacts: string[] } | null>(null);
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<Array<{ time: string; msg: string; type: string }>>([]);

  const addLog = (msg: string, type: string = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs((prev: any[]) => [...prev, { time, msg, type }]);
  };

  const handleAnalyze = () => {
    if (!inputVal) return;
    
    setAnalyzing(true);
    setResult(null);
    setLogs([]);
    
    addLog("Initializing inference engine...");
    setTimeout(() => addLog("Loading weights from /models/xception_net.h5..."), 800);
    setTimeout(() => addLog(activeTab === 'media' ? "Extracting frames (30fps)..." : "Scraping semantic data...", "info"), 1500);
    setTimeout(() => addLog(activeTab === 'media' ? "Detecting blending boundaries..." : "Cross-referencing Google News API...", "info"), 2400);
    
    setTimeout(() => {
      setAnalyzing(false);
      addLog("Analysis complete. Report generated.", "success");
      
      setResult({
        id: 'a1b2-c3d4-e5f6',
        score: Math.floor(Math.random() * 30) + 70,
        artifacts: activeTab === 'media' 
          ? ["Warping Area (Eye)", "Inconsistent Lighting", "Compression Noise"] 
          : ["Sentiment Mismatch", "Unverified Source", "Clickbait Pattern"]
      });
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      <style>{dashboardStyles}</style>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/50 glass-panel">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-2 rounded-lg shadow-lg shadow-indigo-500/30">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight text-white">TRUTHLENS</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Forensic Center</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">System Active</span>
            </div>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all text-sm font-bold"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/50">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={12} /> Forensic Analysis
              </span>
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-2">Deepfake & Misinformation Detector</h2>
          <p className="text-slate-400 max-w-2xl">Upload media or text to analyze authenticity using advanced AI forensics and fact-checking algorithms.</p>
        </div>

        {/* Analysis Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tab Selector */}
            <div className="flex gap-3 border-b border-slate-800 pb-4">
              <button 
                onClick={() => { setActiveTab('media'); setResult(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-bold text-sm transition-all border-b-2 ${activeTab === 'media' ? 'border-indigo-600 text-indigo-400 bg-indigo-600/10' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                <FileVideo size={16} /> Deepfake Detector
              </button>
              <button 
                onClick={() => { setActiveTab('text'); setResult(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-bold text-sm transition-all border-b-2 ${activeTab === 'text' ? 'border-indigo-600 text-indigo-400 bg-indigo-600/10' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                <Newspaper size={16} /> Misinformation Check
              </button>
            </div>

            {/* Input Card */}
            <div className="glass-panel rounded-2xl p-8 relative overflow-hidden">
              {analyzing && <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)] animate-scan" />}

              {activeTab === 'media' ? (
                <div className="border-2 border-dashed border-slate-700 rounded-xl bg-slate-950/30 p-12 text-center hover:border-indigo-500/50 transition-colors">
                  <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400 animate-float">
                    <UploadCloud size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Drag & Drop Media File</h3>
                  <p className="text-slate-400 text-sm mb-6">MP4, AVI, MOV, JPG, PNG • Max 50MB</p>
                  
                  <input 
                    type="file" 
                    id="file-upload" 
                    className="hidden" 
                    onChange={(e) => setInputVal(e.target.files?.[0]?.name || '')}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
                    Browse Files
                  </label>
                  {inputVal && <div className="mt-4 text-emerald-400 text-sm font-mono flex items-center justify-center gap-2"><CheckCircle2 size={14} /> {inputVal}</div>}
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="block text-slate-300 text-sm font-bold mb-3">Article URL or Headline</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 px-4 text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                        placeholder="https://news-site.com/article..."
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-700" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-500 font-bold uppercase tracking-wider">Or Paste Text</span>
                    </div>
                  </div>
                  <textarea 
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-4 text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all h-32 placeholder:text-slate-600 resize-none"
                    placeholder="Paste suspicious text content for semantic analysis..."
                  ></textarea>
                </div>
              )}

              <div className="mt-8 flex justify-between items-center">
                <div className="text-xs text-slate-500">
                  {analyzing && <span className="flex items-center gap-2"><Loader size={14} className="animate-spin" /> Processing...</span>}
                </div>
                <button 
                  onClick={handleAnalyze}
                  disabled={analyzing || !inputVal}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all shadow-lg ${analyzing || !inputVal ? 'bg-slate-800 text-slate-600 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-500 hover:to-indigo-600 shadow-indigo-600/30'}`}
                >
                  {analyzing ? 'Analyzing' : 'Run Forensic Analysis'} <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Results */}
            {result && <ResultCard result={result} />}
            
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* System Status */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-indigo-600/20 rounded-lg text-indigo-400">
                  <Fingerprint size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">Session Status</h3>
                  <p className="text-xs text-slate-500">API Ready</p>
                </div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Model Version</span>
                  <span className="text-xs font-mono text-slate-300">4.2.1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Accuracy</span>
                  <span className="text-xs font-bold text-emerald-400">99.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">API Latency</span>
                  <span className="text-xs font-mono text-slate-300">42ms</span>
                </div>
              </div>
            </div>

            {/* Live Activity Log */}
            <div className="glass-panel rounded-2xl p-1">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/50 rounded-t-xl border-b border-slate-800/50">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-indigo-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Live Log</span>
                </div>
              </div>
              <AnalysisLog logs={logs} />
            </div>

            {/* Recent Analyses */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <History size={16} /> Recent Analyses
              </h3>
              <div className="space-y-3">
                {[
                  { name: "conference_video.mp4", status: "Synthetic", icon: FileVideo },
                  { name: "interview_segment.mov", status: "Authentic", icon: FileVideo },
                  { name: "news_article_txt.md", status: "Authentic", icon: FileText },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-950/30 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <item.icon size={14} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-200 truncate group-hover:text-indigo-400 transition-colors">{item.name}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-wider ${item.status === 'Synthetic' ? 'text-red-400' : 'text-emerald-400'}`}>{item.status}</p>
                      </div>
                      <ChevronRight size={14} className="text-slate-700 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// ==========================================
// ROOT APP COMPONENT
// ==========================================

export default Dashboard;