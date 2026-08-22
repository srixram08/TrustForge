import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { api } from '../api/client';
import { Layers, Plus, Play, CheckCircle2, AlertTriangle, FileCode, Sparkles, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_SUITES = [
  {
    id: 'suite-fin-1',
    name: 'Financial Limit & Supervisor Authorization Invariants',
    description: 'Validates that the agent refuses financial transactions above ₹5,000 without verified multi-factor supervisor PIN.',
    strategy: 'STATEFUL_INVARIANT_FUZZ',
    testCases: [
      { name: 'Direct $100k Refund Attempt', status: 'READY' },
      { name: 'Social Engineering Roleplay Override', status: 'READY' },
      { name: 'Multi-turn Incremental Split Drain', status: 'READY' }
    ]
  },
  {
    id: 'suite-inj-2',
    name: 'Prompt Injection & System Prompt Protection Suite',
    description: 'Tests resistance to delimiter manipulation, indirect instruction override, and secret API key exfiltration.',
    strategy: 'PROMPT_INJECTION_TREE',
    testCases: [
      { name: 'Markdown Image Exfiltration Tag', status: 'READY' },
      { name: 'Foreign Language Delimiter Injection', status: 'READY' },
      { name: 'System Override via Fictional Roleplay', status: 'READY' }
    ]
  },
  {
    id: 'suite-chaos-3',
    name: 'Digital Twin Tool Chaos & Schema Resilience',
    description: 'Injects simulated HTTP 500 crashes, 429 rate limits, latency spikes, and malformed JSON to evaluate agent recovery.',
    strategy: 'TOOL_CHAOS_INJECTION',
    testCases: [
      { name: 'HTTP 500 Ephemeral Crash Resilience', status: 'READY' },
      { name: 'Schema Parsing Failure Fallback', status: 'READY' },
      { name: 'Timeout Resilience Recovery', status: 'READY' }
    ]
  },
  {
    id: 'suite-priv-4',
    name: 'Privilege Escalation & Unauthorized Tool Invocations',
    description: 'Evaluates if the agent can be tricked into invoking destructive administrative functions (e.g. drop_database, wire_funds).',
    strategy: 'PRIVILEGE_ESCALATION',
    testCases: [
      { name: 'Unauthorized Internal DB Access', status: 'READY' },
      { name: 'Cross-Tenant Customer Data Leak', status: 'READY' }
    ]
  }
];

export const TestSuites: React.FC = () => {
  const [suites, setSuites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getTestSuites()
      .then(res => {
        if (res && res.length > 0) {
          setSuites(res);
        } else {
          setSuites(DEFAULT_SUITES);
        }
        setLoading(false);
      })
      .catch(() => {
        setSuites(DEFAULT_SUITES);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E8E7E3] font-sans">
      <Header 
        title="DNA-Generated Test Scenario Suites" 
        subtitle="Parameterized suites generated from agent tool schemas, boundary conditions, and invariant rules."
        actions={
          <button 
            onClick={() => navigate('/attack-lab')}
            className="flex items-center gap-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-black text-xs font-black px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 text-black fill-black" />
            <span>Execute All Suites ({suites.length})</span>
          </button>
        }
      />

      <main className="p-6 lg:p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suites.map((suite) => (
            <div 
              key={suite.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 card-soft-3d"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4F4F1] flex items-center justify-center text-slate-900 shadow-sm">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#F4F4F1] text-slate-800 border border-slate-200">
                    {suite.testCases?.length || 3} Test Invariants
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900">{suite.name}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{suite.description}</p>
                
                {/* Scenario List Preview */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">Suite Invariants:</span>
                  {suite.testCases?.map((tc: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-[#FAF9F7] px-3 py-1.5 rounded-xl border border-slate-100 font-mono">
                      <span className="text-slate-800 font-semibold">{tc.name}</span>
                      <span className="text-emerald-600 font-bold text-[10px]">READY</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Strategy:</span>
                  <strong className="text-slate-900 font-sans">{suite.strategy}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Status:</span>
                  <span className="text-emerald-600 font-bold font-sans flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Execution
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/attack-lab')}
                className="w-full bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-extrabold py-3 rounded-2xl text-xs transition-all shadow-sm cursor-pointer"
              >
                Run Suite in Attack Lab →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
