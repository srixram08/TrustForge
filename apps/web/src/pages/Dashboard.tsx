import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { api } from '../api/client';
import { 
  ShieldAlert, 
  Bot, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Zap, 
  ExternalLink,
  ArrowUpRight,
  Flame,
  ArrowRight,
  Sparkles,
  GitPullRequest
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PixelMagnet } from '../components/PixelMagnet';
import { GlitterWarp } from '../components/GlitterWarp';

export const Dashboard: React.FC = () => {
  const { isThreatResolved } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOverview = () => {
    api.getOverview()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOverview();
    const interval = setInterval(fetchOverview, 4000);
    return () => clearInterval(interval);
  }, []);

  // Posture state synced with active threat / remediation status
  const securityScore = isThreatResolved ? 94 : 62;
  const criticalCount = isThreatResolved ? 0 : 4;
  const exploitRate = isThreatResolved ? '0.0%' : '68.4%';

  const trendData = isThreatResolved ? [
    { name: 'Mon', risk: 78, tests: 40 },
    { name: 'Tue', risk: 82, tests: 55 },
    { name: 'Wed', risk: 65, tests: 70 },
    { name: 'Thu', risk: 70, tests: 85 },
    { name: 'Fri', risk: 58, tests: 110 },
    { name: 'Sat', risk: 62, tests: 130 },
    { name: 'Sun (Patched)', risk: 12, tests: 160 }
  ] : [
    { name: 'Mon', risk: 45, tests: 40 },
    { name: 'Tue', risk: 52, tests: 55 },
    { name: 'Wed', risk: 48, tests: 70 },
    { name: 'Thu', risk: 60, tests: 85 },
    { name: 'Fri', risk: 55, tests: 110 },
    { name: 'Sat', risk: 70, tests: 130 },
    { name: 'Sun (Exploit)', risk: 96, tests: 160 }
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E8E7E3] font-sans selection:bg-[#D4FF00] selection:text-black relative overflow-hidden">
      {/* React Bits Pro Glitter Warp Starfield Tunnel */}
      <GlitterWarp 
        particleCount={450} 
        speed={0.9} 
        warpIntensity={1.4} 
        particleColor="#D4FF00" 
        glitterColors={['#D4FF00', '#000000', '#00F0FF', '#FFFFFF', '#A3E635']}
        className="opacity-50"
      />

      {/* React Bits Pro Pixel Magnet Cursor Trail */}
      <PixelMagnet 
        pixelSize={3.5}
        gap={28}
        magnetRadius={150}
        magnetStrength={0.5}
        pixelColor="rgba(17, 17, 17, 0.08)"
        activeColor="#D4FF00"
        className="z-0"
      />

      <div className="relative z-10 flex-1 flex flex-col">
        <Header 
          title="Executive AI Security SOC Dashboard" 
          subtitle="Real-time autonomous threat detection, vulnerability posture, and active defense status."
          actions={
            <button 
              onClick={() => navigate('/attack-lab')}
              className="flex items-center gap-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-black text-xs font-black px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <Flame className="w-4 h-4 text-black" />
              <span>Launch Attack Lab</span>
            </button>
          }
        />

      <main className="p-6 lg:p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
        
        {/* Dynamic Status Banner */}
        {isThreatResolved ? (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border-2 border-emerald-500 shadow-md card-soft-3d flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold">
                    REMEDIATION VERIFIED
                  </span>
                  <span className="text-xs text-slate-500 font-mono">PR #1042 Active</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  Finance Copilot ₹100,000 Financial Drain Invariant Enforced (Score 94%)
                </h4>
              </div>
            </div>
            <button
              onClick={() => navigate('/remediation')}
              className="bg-[#D4FF00] hover:bg-[#c2eb00] text-black text-xs font-black px-5 py-2.5 rounded-full shadow-sm cursor-pointer"
            >
              Inspect Remediation Diff →
            </button>
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border-2 border-red-500 shadow-md card-soft-3d flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold">
                    ACTIVE THREAT DETECTED
                  </span>
                  <span className="text-xs text-red-600 font-mono font-bold">4 Critical Vulnerabilities Found</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  Unauthorized ₹100,000 Financial Drain Exploit Succeeded on Finance Copilot
                </h4>
              </div>
            </div>
            <button
              onClick={() => navigate('/remediation?autoSolve=true')}
              className="bg-[#D4FF00] hover:bg-[#c2eb00] text-black text-xs font-black px-5 py-2.5 rounded-full shadow-md cursor-pointer animate-bounce"
            >
              Auto-Remediate (PR #1042) →
            </button>
          </div>
        )}

        {/* Top 4 Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Agents Under Test</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{data?.metrics?.agentsTested || 2}</h3>
              <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% DNA Scanned
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#F4F4F1] flex items-center justify-center text-slate-900 shadow-sm">
              <Bot className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Critical Vulnerabilities</p>
              <h3 className={`text-3xl font-black mt-1 ${criticalCount === 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {criticalCount}
              </h3>
              <p className={`text-xs mt-1.5 flex items-center gap-1 font-semibold ${criticalCount === 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {criticalCount === 0 ? (
                  <><CheckCircle2 className="w-3.5 h-3.5" /> All Invariants Clean</>
                ) : (
                  <><AlertTriangle className="w-3.5 h-3.5" /> Requires Auto-Patch</>
                )}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${criticalCount === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              <ShieldAlert className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Security Reliability Score</p>
              <h3 className={`text-3xl font-black mt-1 ${securityScore >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {securityScore}%
              </h3>
              <p className="text-xs mt-1.5 flex items-center gap-1 font-semibold text-slate-600">
                {isThreatResolved ? (
                  <span className="text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> +32% post-remediation</span>
                ) : (
                  <span className="text-red-600 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Degraded under active attack</span>
                )}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${securityScore >= 90 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              <Zap className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Attack Exploit Rate</p>
              <h3 className={`text-3xl font-black mt-1 ${isThreatResolved ? 'text-emerald-600' : 'text-red-600'}`}>
                {exploitRate}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 font-medium">Across 160 Fuzz Runs</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${isThreatResolved ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Risk Trend Chart */}
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Risk Score & Adversarial Simulation Volume</h3>
                <p className="text-xs text-slate-500 mt-0.5">Continuous trajectory over 160 automated state-space evaluations</p>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-900 bg-[#F4F4F1] border border-slate-200 px-3 py-1 rounded-full">
                Live Invariant Stream
              </span>
            </div>
            
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="riskGradLightSoft" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isThreatResolved ? "#D4FF00" : "#EF4444"} stopOpacity={0.7}/>
                      <stop offset="95%" stopColor={isThreatResolved ? "#D4FF00" : "#EF4444"} stopOpacity={0.02}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: 16, fontSize: 12, boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }} />
                  <Area type="monotone" dataKey="risk" stroke="#111111" strokeWidth={3} fillOpacity={1} fill="url(#riskGradLightSoft)" name="Average Risk Score" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Severity Breakdown */}
          <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">Vulnerabilities by Severity</h3>
              <p className="text-xs text-slate-500 mt-0.5">3-tier evaluation classifications</p>
            </div>

            <div className="h-52 w-full flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={isThreatResolved ? [
                      { name: 'Verified Invariant', value: 20, color: '#10B981' },
                      { name: 'Low Risk', value: 2, color: '#3B82F6' }
                    ] : [
                      { name: 'Critical', value: 4, color: '#EF4444' },
                      { name: 'High', value: 6, color: '#F97316' },
                      { name: 'Medium', value: 8, color: '#FBBF24' },
                      { name: 'Low', value: 5, color: '#3B82F6' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {(isThreatResolved ? [
                      { name: 'Verified Invariant', value: 20, color: '#10B981' },
                      { name: 'Low Risk', value: 2, color: '#3B82F6' }
                    ] : [
                      { name: 'Critical', value: 4, color: '#EF4444' },
                      { name: 'High', value: 6, color: '#F97316' },
                      { name: 'Medium', value: 8, color: '#FBBF24' },
                      { name: 'Low', value: 5, color: '#3B82F6' }
                    ]).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: 16, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-slate-100">
              {isThreatResolved ? (
                <>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Verified: 20</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Low: 2</div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Critical: 4</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> High: 6</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recent Critical Findings Panel */}
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">Recent Critical Findings & Policy Violations</h3>
              <p className="text-xs text-slate-500 mt-0.5">Discovered in isolated stateful Digital Twin sandboxes</p>
            </div>
            <button 
              onClick={() => navigate('/remediation?autoSolve=true')}
              className="text-xs font-bold text-slate-900 hover:text-black flex items-center gap-1 bg-[#F4F4F1] hover:bg-[#EFEFEA] px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              <span>Auto-Remediate All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Finding Card 1 */}
            <div className="p-6 rounded-2xl bg-[#FFF8F8] border border-red-200 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-red-600 text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold">
                    CRITICAL (Risk 96/100)
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-medium">Agent: Finance Copilot</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Unauthorized Financial Drain via Prompt Injection
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Prompt Injection bypassed supervisor PIN confirmation and invoked <code className="text-red-700 font-mono font-semibold">issue_refund(amount=100000)</code>.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-red-100">
                <span className="text-xs text-red-700 font-mono font-bold">Affected Tool: issue_refund</span>
                <button 
                  onClick={() => navigate('/graph')}
                  className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Failure Graph</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Finding Card 2 */}
            <div className="p-6 rounded-2xl bg-[#FFFDF5] border border-amber-200 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-amber-500 text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold">
                    HIGH (Risk 84/100)
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-medium">Agent: Support Copilot</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  System Prompt & API Key Disclosure
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Roleplay jailbreak triggered system prompt exfiltration revealing confidential backend credentials.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-amber-100">
                <span className="text-xs text-amber-700 font-mono font-bold">Affected Vector: Prompt Leakage</span>
                <button 
                  onClick={() => navigate('/remediation?autoSolve=true')}
                  className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Generate Patch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};
