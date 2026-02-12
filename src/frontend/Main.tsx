import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, FileText, UploadCloud, CheckCircle2, 
  Fingerprint, Terminal, LogOut, History, FileVideo,
  Sparkles, Loader2, Newspaper, 
  LayoutDashboard, Settings, Menu, 
  Zap,
  Activity, AlertTriangle, BarChart3, Scan,
  BookOpen, FileBarChart, List, Image as ImageIcon,
  Info, Check
} from 'lucide-react';

// --- TYPES ---
export interface Log {
  time: string;
  msg: string;
  type: 'info' | 'success' | 'error';
}

export interface ScanResult {
  id: string;
  score: number;
  type: string;
  artifacts: string[];
}

// --- ANIMATION VARIANTS ---
const fadeSlide = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
};

const floatingShape = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
  }
};

// --- SHARED COMPONENTS ---

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-white/80 backdrop-blur-2xl border border-white/60 p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-start justify-between group hover:-translate-y-1 transition-transform duration-300">
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 mb-1">{value}</h3>
      <p className={`text-xs font-bold flex items-center gap-1 ${color === 'red' ? 'text-red-500' : 'text-emerald-500'}`}>
        {sub}
      </p>
    </div>
    <div className={`p-4 rounded-2xl ${color === 'red' ? 'bg-gradient-to-br from-red-50 to-red-100 text-red-500' : color === 'indigo' ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600' : 'bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-500'} shadow-inner`}>
      <Icon size={24} />
    </div>
  </div>
);

const ResultCard = ({ result }: { result: ScanResult }) => (
  <motion.div 
    variants={fadeSlide} initial="initial" animate="animate"
    className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl shadow-indigo-100/50 border border-white mt-8 relative overflow-hidden"
  >
    <div className={`absolute top-0 left-0 w-full h-1.5 ${result.score > 80 ? 'bg-gradient-to-r from-red-500 to-rose-500' : 'bg-gradient-to-r from-emerald-400 to-teal-500'}`} />
    
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <div>
        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-2">
          {result.score > 80 ? <AlertTriangle className="text-red-500" size={28} /> : <CheckCircle2 className="text-emerald-500" size={28} />}
          Analysis Complete
        </h3>
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <span>ID: <span className="font-mono text-slate-400">{result.id}</span></span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md text-slate-600">
            {result.type === 'video' ? <FileVideo size={14}/> : result.type === 'image' ? <ImageIcon size={14}/> : <FileText size={14}/>}
            <span className="capitalize">{result.type}</span>
          </span>
        </div>
      </div>
      <span className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ${result.score > 80 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
        {result.score > 80 ? '⚠️ Synthetic Detected' : '✓ Verified Authentic'}
      </span>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-slate-50/50 rounded-[1.5rem] p-6 border border-slate-100 shadow-inner">
        <div className="text-slate-400 text-xs uppercase font-black tracking-wider mb-2">Confidence Score</div>
        <div className="flex items-baseline gap-2 mb-4">
          <div className="text-5xl font-black text-slate-900">{result.score}</div>
          <span className="text-slate-400 text-lg font-bold">%</span>
        </div>
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} animate={{ width: `${result.score}%` }} transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${result.score > 80 ? 'bg-gradient-to-r from-red-500 to-pink-600' : 'bg-gradient-to-r from-emerald-400 to-teal-500'}`} 
          />
        </div>
      </div>
      
      <div className="bg-slate-50/50 rounded-[1.5rem] p-6 border border-slate-100 shadow-inner">
        <div className="text-slate-400 text-xs uppercase font-black tracking-wider mb-4">Detected Artifacts & Anomalies</div>
        <div className="flex flex-wrap gap-2">
          {result.artifacts.map((art, i) => (
            <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-bold shadow-sm flex items-center gap-1.5">
              <Sparkles size={12} className="text-indigo-400" /> {art}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// --- VIEWS ---

const AnalyticsView = () => (
  <motion.div variants={fadeSlide} initial="initial" animate="animate" exit="exit" className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Scans" value="1,284" sub="+12% this week" icon={Activity} color="indigo" />
      <StatCard title="Threats Detected" value="342" sub="26.6% Detection Rate" icon={AlertTriangle} color="red" />
      <StatCard title="Avg. Confidence" value="98.2%" sub="+0.4% Accuracy" icon={Fingerprint} color="emerald" />
      <StatCard title="API Latency" value="42ms" sub="Optimal Performance" icon={Zap} color="indigo" />
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/60 shadow-xl shadow-slate-200/50">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="text-indigo-600" /> Detection Trends
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Volume of scans over the last 7 days</p>
          </div>
          <select className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-600 rounded-xl px-4 py-2 outline-none hover:bg-slate-100 transition-colors cursor-pointer">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        
        <div className="flex items-end justify-between h-56 gap-4 px-2">
          {[40, 65, 30, 85, 50, 95, 45].map((h, i) => (
            <div key={i} className="w-full bg-indigo-50 rounded-xl relative group h-full flex items-end">
              <div 
                className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-xl transition-all duration-500 group-hover:from-purple-600 group-hover:to-purple-400 shadow-lg shadow-indigo-200"
                style={{ height: `${h}%` }}
              ></div>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-xl pointer-events-none">
                {h * 12} Scans
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6 text-xs font-black text-slate-400 uppercase tracking-widest px-2">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/60 shadow-xl shadow-slate-200/50">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <History className="text-indigo-600" /> Quick History
        </h3>
        <div className="space-y-4">
          {[
            { name: "press_clip_02.mp4", status: "Synthetic", score: "94%" },
            { name: "market_update.txt", status: "Authentic", score: "12%" },
            { name: "viral_test.jpg", status: "Synthetic", score: "88%" },
            { name: "interview_raw.mov", status: "Authentic", score: "04%" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group cursor-pointer">
              <div className="flex-1 min-w-0 pr-4">
                <p className="font-bold text-slate-800 text-sm truncate group-hover:text-indigo-600 transition-colors">{item.name}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shrink-0 ${item.status === 'Synthetic' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-3 rounded-xl border-2 border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-indigo-600 transition-all">
          View All Scans
        </button>
      </div>
    </div>
  </motion.div>
);

const ToolsView = ({ activeTab, setActiveTab, analyzing, handleAnalyze, inputVal, setInputVal, result }: any) => (
  <motion.div variants={fadeSlide} initial="initial" animate="animate" exit="exit" className="max-w-5xl mx-auto space-y-8">
    <div className="text-center mb-10">
      <h2 className="text-4xl font-black text-slate-900 mb-4 drop-shadow-sm">Deepfake & Media Analyzer</h2>
      <p className="text-slate-500 font-medium text-lg">Upload media or paste text to run multi-modal authenticity checks.</p>
    </div>

    <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white shadow-2xl shadow-indigo-100/40">
      <div className="flex justify-center mb-10">
        <div className="flex p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/50 shadow-inner">
          <button onClick={() => setActiveTab('media')} className={`flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'media' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
            <FileVideo size={18} /> Visual Media (Image/Video)
          </button>
          <button onClick={() => setActiveTab('text')} className={`flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'text' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
            <Newspaper size={18} /> Text & Semantics
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 min-h-[350px] flex flex-col justify-center">
          {activeTab === 'media' ? (
            <div className="border-4 border-dashed border-indigo-100 bg-indigo-50/30 rounded-[2.5rem] p-12 text-center hover:bg-indigo-50 hover:border-indigo-300 transition-all cursor-pointer group h-full flex flex-col justify-center items-center relative overflow-hidden">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 text-indigo-600 shadow-xl shadow-indigo-200/50 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 relative z-10">
                <UploadCloud size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 relative z-10">Drop Media Here</h3>
              <p className="text-slate-500 font-medium mb-8 relative z-10">Supports MP4, AVI, JPG, PNG • Max 100MB</p>
              
              <input type="file" id="file-upload" className="hidden" onChange={(e: any) => setInputVal(e.target.files?.[0]?.name || '')} />
              <label htmlFor="file-upload" className="relative z-10 bg-[#0F172A] text-white px-10 py-4 rounded-2xl text-sm font-bold shadow-2xl hover:shadow-indigo-900/40 hover:-translate-y-1 transition-all cursor-pointer">
                Browse Files
              </label>
              {inputVal && <div className="mt-6 text-emerald-600 font-bold bg-emerald-50 px-6 py-3 rounded-xl inline-flex items-center gap-2 text-sm border border-emerald-100"><CheckCircle2 size={18} /> {inputVal}</div>}
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <textarea 
                className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 resize-none shadow-inner text-lg font-medium leading-relaxed"
                placeholder="Paste article text, transcript, or social media content here..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200">
          <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <Scan className="text-indigo-600" /> Detection Criteria
          </h4>
          <div className="space-y-4">
            {(activeTab === 'media' ? [
              "Facial Blending Boundaries",
              "Lighting & Shadow Inconsistencies",
              "Unnatural Eye Blinking Rates",
              "Compression Noise Analysis",
              "Audio-Visual Desynchronization"
            ] : [
              "Sentiment & Tone Anomalies",
              "Stylometric Analysis (Bot detection)",
              "Cross-referencing verified sources",
              "Clickbait & Sensationalism patterns",
              "Logical consistency checks"
            ]).map((criteria, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-indigo-100 p-1 rounded-md text-indigo-600 shrink-0"><Check size={12} strokeWidth={4}/></div>
                <p className="text-sm font-medium text-slate-600 leading-snug">{criteria}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200">
            <button 
              onClick={handleAnalyze} disabled={analyzing || !inputVal}
              className={`w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl ${analyzing || !inputVal ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/40 hover:-translate-y-1 active:scale-95'}`}
            >
              {analyzing ? <><Loader2 size={20} className="animate-spin" /> Analyzing...</> : "Run Scan"}
            </button>
          </div>
        </div>
      </div>
    </div>

    {result && <ResultCard result={result} />}
  </motion.div>
);

const LogsView = ({ logs }: { logs: Log[] }) => (
  <motion.div variants={fadeSlide} initial="initial" animate="animate" exit="exit" className="space-y-8">
    <div className="mb-8">
      <h2 className="text-3xl font-black text-slate-900 mb-2">Audit & System Logs</h2>
      <p className="text-slate-500 font-medium text-lg">Track user activity, system processes, and API calls.</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/60 shadow-xl shadow-slate-200/50">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Terminal className="text-indigo-600" /> Live System Console
        </h3>
        <div className="bg-[#0A0F1C] rounded-[1.5rem] p-6 font-mono text-sm h-[400px] overflow-y-auto space-y-3 shadow-inner border border-slate-800">
          {logs.length === 0 ? (
            <div className="text-slate-600 text-center py-20 italic">Awaiting operations...</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-slate-500 shrink-0">[{log.time}]</span>
                <span className={log.type === 'error' ? 'text-rose-400' : log.type === 'success' ? 'text-emerald-400' : 'text-slate-300'}>
                  {log.msg}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/60 shadow-xl shadow-slate-200/50">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <List className="text-indigo-600" /> User Audit Trail
        </h3>
        <div className="space-y-3">
          {[
            { action: "Login successful", user: "admin_f", time: "10:42 AM", ip: "192.168.1.1" },
            { action: "Initiated Video Scan", user: "admin_f", time: "10:45 AM", ip: "192.168.1.1" },
            { action: "Report Downloaded", user: "j_doe", time: "09:12 AM", ip: "10.0.0.5" },
            { action: "Failed Login Attempt", user: "unknown", time: "08:30 AM", ip: "142.22.1.0" },
            { action: "Settings Updated", user: "admin_f", time: "Yesterday", ip: "192.168.1.1" },
          ].map((audit, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <p className="font-bold text-slate-800 text-sm">{audit.action}</p>
                <p className="text-xs text-slate-400 mt-1">User: <span className="font-mono">{audit.user}</span> • IP: {audit.ip}</p>
              </div>
              <span className="text-xs font-bold text-slate-400">{audit.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const ReportsView = () => (
  <motion.div variants={fadeSlide} initial="initial" animate="animate" exit="exit" className="space-y-8">
    <div className="mb-8">
      <h2 className="text-3xl font-black text-slate-900 mb-2">Daily Detection Reports</h2>
      <p className="text-slate-500 font-medium text-lg">Categorized breakdown of analyzed content.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/60 shadow-xl shadow-rose-100/50">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">Synthetic Media</h3>
        <p className="text-slate-500 mb-8 font-medium">Deepfakes and manipulated content detected today.</p>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <span className="text-slate-600 font-bold">Total Flagged</span>
            <span className="text-xl font-black text-rose-600">24</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <span className="text-slate-600 font-bold">Primary Threat Type</span>
            <span className="text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">Face Swapping</span>
          </div>
        </div>
        <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-rose-600 transition-colors">
          Download Synthetic Report (PDF)
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/60 shadow-xl shadow-emerald-100/50">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">Authentic Media</h3>
        <p className="text-slate-500 mb-8 font-medium">Verified, unaltered content processed today.</p>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <span className="text-slate-600 font-bold">Total Verified</span>
            <span className="text-xl font-black text-emerald-600">142</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <span className="text-slate-600 font-bold">Avg Confidence Score</span>
            <span className="text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">98.5%</span>
          </div>
        </div>
        <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">
          Download Authentic Report (PDF)
        </button>
      </div>
    </div>
  </motion.div>
);

const DocsView = () => (
  <motion.div variants={fadeSlide} initial="initial" animate="animate" exit="exit" className="max-w-4xl space-y-8">
    <div className="mb-8">
      <h2 className="text-3xl font-black text-slate-900 mb-2">AI Model Documentation</h2>
      <p className="text-slate-500 font-medium text-lg">Understand the architecture behind FactGuard.</p>
    </div>

    <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white shadow-xl shadow-indigo-100/50 prose prose-slate max-w-none">
      <h3 className="flex items-center gap-3 text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">
        <BookOpen className="text-indigo-600"/> Core Architecture
      </h3>
      <p className="text-slate-600 font-medium leading-relaxed mt-4">
        FactGuard utilizes a hybrid ensemble approach. For visual media, we deploy a modified <strong>XceptionNet</strong> architecture trained on the FaceForensics++ dataset. This CNN excels at identifying spatial artifacts introduced during the face-warping and blending stages of deepfake generation.
      </p>
      
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 my-8">
        <h4 className="text-slate-900 font-bold flex items-center gap-2 mb-4"><Info size={18} className="text-indigo-500"/> Model Specifications</h4>
        <ul className="space-y-2 text-sm text-slate-600 font-medium">
          <li><strong>Base Vision Model:</strong> Xception-DeepFake-v4.2</li>
          <li><strong>NLP Engine:</strong> RoBERTa-Large (Fine-tuned for Misinformation)</li>
          <li><strong>Inference Time:</strong> ~400ms per frame</li>
          <li><strong>Input Resolution:</strong> Downsampled to 299x299 for CNN ingestion</li>
        </ul>
      </div>

      <p className="text-slate-600 font-medium leading-relaxed">
        For textual analysis, our NLP pipeline utilizes transformer-based embeddings to detect stylometric anomalies, cross-reference known hallucination patterns, and analyze sentiment volatility commonly found in AI-generated propaganda.
      </p>
    </div>
  </motion.div>
);

// --- MAIN APP SHELL ---

const DashboardShell = ({ onLogout }: { onLogout: () => void }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Tools State
  const [activeTab, setActiveTab] = useState<'media' | 'text'>('media');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [inputVal, setInputVal] = useState('');
  
  // Shared Logs State
  const [logs, setLogs] = useState<Log[]>([]);

  const addLog = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [{ time, msg, type }, ...prev].slice(0, 50));
  };

  const handleAnalyze = () => {
    if (!inputVal) return;
    setAnalyzing(true);
    setResult(null);
    
    addLog(`Initiating ${activeTab} scan on: ${inputVal}`, "info");
    setTimeout(() => addLog("Allocating GPU resources...", "info"), 500);
    setTimeout(() => addLog("Model Loaded: Xception-DeepFake-v4", "success"), 1200);
    setTimeout(() => addLog(activeTab === 'media' ? "Scanning frame sequences..." : "Parsing semantic structure...", "info"), 2000);
    
    setTimeout(() => {
      setAnalyzing(false);
      const score = Math.floor(Math.random() * 30) + 70;
      addLog(`Analysis Complete. Score: ${score}%`, score > 80 ? "error" : "success");
      
      let fileType = activeTab;
      if (activeTab === 'media') {
        const isImage = /\.(jpg|jpeg|png)$/i.test(inputVal);
        fileType = isImage ? 'image' : 'video';
      }

      setResult({
        id: `FG-${Math.floor(Math.random() * 10000)}`,
        score: score,
        type: fileType,
        artifacts: activeTab === 'media' 
          ? ["Warping Area (Eye)", "Inconsistent Lighting", "Audio Desync"] 
          : ["Sentiment Mismatch", "Unverified Source", "Clickbait Pattern"]
      });
    }, 3500);
  };

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Analytics' },
    { id: 'tools', icon: Scan, label: 'Detection Tools' },
    { id: 'logs', icon: Terminal, label: 'Audit Logs' },
    { id: 'reports', icon: FileBarChart, label: 'Daily Reports' },
    { id: 'docs', icon: BookOpen, label: 'AI Documentation' },
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-slate-800 font-sans selection:bg-indigo-200 overflow-hidden relative flex">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div variants={floatingShape} animate="animate" className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-purple-300/30 rounded-full mix-blend-multiply filter blur-[120px]" />
        <motion.div variants={floatingShape} animate="animate" transition={{ delay: 2 }} className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <motion.aside 
        initial={{ x: -250 }} animate={{ x: 0 }}
        className={`${sidebarOpen ? 'w-[280px]' : 'w-24'} hidden md:flex flex-col h-screen bg-white/80 backdrop-blur-2xl border-r border-white shadow-2xl shadow-indigo-100/30 z-20 transition-all duration-300`}
      >
        <div className="p-8 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/30"><Shield size={24} /></div>
              <div>
                <span className="font-black text-2xl tracking-tight text-slate-900 block leading-none">FactGuard</span>
              </div>
            </div>
          ) : (
             <div className="bg-indigo-600 p-3 rounded-2xl text-white mx-auto"><Shield size={24} /></div>
          )}
        </div>

        <nav className="flex-1 px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <button 
              key={item.id} onClick={() => setCurrentView(item.id)}
              className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all duration-300 group ${currentView === item.id ? 'bg-[#0F172A] text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-white hover:shadow-sm hover:text-indigo-600'}`}
            >
              <item.icon size={22} className={currentView === item.id ? 'text-indigo-400' : 'group-hover:text-indigo-500'} />
              {sidebarOpen && <span className="font-bold">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-200/50">
           <button onClick={onLogout} className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl text-slate-600 bg-slate-100 hover:bg-rose-100 hover:text-rose-600 font-bold transition-all">
             <LogOut size={20} />
             {sidebarOpen && <span>Logout</span>}
           </button>
           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex justify-center mt-6 text-slate-400 hover:text-indigo-600 transition-colors">
            {sidebarOpen ? <Menu size={24} className="rotate-90" /> : <Menu size={24} />}
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 h-screen overflow-y-auto relative z-10 p-6 md:p-10 lg:p-14 scroll-smooth">
        <header className="flex justify-between items-center mb-12">
          <div className="hidden md:block" />
          <div className="flex items-center gap-6 bg-white/60 backdrop-blur-xl p-2 pr-6 rounded-full shadow-lg shadow-slate-200/50 border border-white">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black">
              AD
            </div>
            <div className="text-sm font-bold text-slate-700">
              Admin User
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && <AnalyticsView key="analytics" />}
          {currentView === 'tools' && (
            <ToolsView key="tools" activeTab={activeTab} setActiveTab={setActiveTab} analyzing={analyzing} handleAnalyze={handleAnalyze} inputVal={inputVal} setInputVal={setInputVal} result={result} />
          )}
          {currentView === 'logs' && <LogsView key="logs" logs={logs} />}
          {currentView === 'reports' && <ReportsView key="reports" />}
          {currentView === 'docs' && <DocsView key="docs" />}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default DashboardShell;