import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { api } from '../api/client';
import { CheckCircle2, AlertTriangle, ShieldCheck, Zap, Layers, RefreshCw, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EvalRow {
  id: string;
  agent: string;
  l1Rules: string;
  l2Consensus: string;
  l3Drift: string;
  verdict: 'PASSED' | 'THREAT_INTERCEPTED';
  riskScore: number;
}

const GENERATED_EVALS: EvalRow[] = [
  { id: 'EV_901A', agent: 'Finance Copilot (Unpatched)', l1Rules: 'FAIL (Max ₹5k Ceiling)', l2Consensus: 'FAIL (Divergence 0.94)', l3Drift: 'PASS (Anomaly 0.12)', verdict: 'THREAT_INTERCEPTED', riskScore: 96 },
  { id: 'EV_902B', agent: 'Finance Copilot (PR #1042)', l1Rules: 'PASS (₹5k Ceiling Verified)', l2Consensus: 'PASS (Consensus 0.98)', l3Drift: 'PASS (Nominal 0.04)', verdict: 'PASSED', riskScore: 6 },
  { id: 'EV_903C', agent: 'Customer Support Copilot', l1Rules: 'PASS (Schema Validated)', l2Consensus: 'PASS (Consensus 0.96)', l3Drift: 'PASS (Nominal 0.02)', verdict: 'PASSED', riskScore: 4 },
  { id: 'EV_904D', agent: 'Customer Support Copilot', l1Rules: 'PASS (Ticket Invariant OK)', l2Consensus: 'PASS (Consensus 0.94)', l3Drift: 'PASS (Nominal 0.05)', verdict: 'PASSED', riskScore: 8 },
  { id: 'EV_905E', agent: 'Finance Copilot (Unpatched)', l1Rules: 'FAIL (Missing PIN Auth)', l2Consensus: 'FAIL (Divergence 0.89)', l3Drift: 'PASS (Anomaly 0.18)', verdict: 'THREAT_INTERCEPTED', riskScore: 92 },
  { id: 'EV_906F', agent: 'Finance Copilot (PR #1042)', l1Rules: 'PASS (PIN Check Enforced)', l2Consensus: 'PASS (Consensus 0.99)', l3Drift: 'PASS (Nominal 0.01)', verdict: 'PASSED', riskScore: 2 },
  { id: 'EV_907G', agent: 'Customer Support Copilot', l1Rules: 'PASS (No Tool Leakage)', l2Consensus: 'PASS (Consensus 0.95)', l3Drift: 'PASS (Nominal 0.03)', verdict: 'PASSED', riskScore: 5 },
  { id: 'EV_908H', agent: 'Finance Copilot (Unpatched)', l1Rules: 'FAIL (Delimiter Injection)', l2Consensus: 'FAIL (Divergence 0.91)', l3Drift: 'PASS (Anomaly 0.15)', verdict: 'THREAT_INTERCEPTED', riskScore: 88 },
  { id: 'EV_909I', agent: 'Finance Copilot (PR #1042)', l1Rules: 'PASS (Delimiter Neutralized)', l2Consensus: 'PASS (Consensus 0.97)', l3Drift: 'PASS (Nominal 0.02)', verdict: 'PASSED', riskScore: 3 },
  { id: 'EV_910J', agent: 'Customer Support Copilot', l1Rules: 'PASS (Refund Blocked by Role)', l2Consensus: 'PASS (Consensus 0.99)', l3Drift: 'PASS (Nominal 0.01)', verdict: 'PASSED', riskScore: 1 }
];

export const Evaluations: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvalRow[]>(GENERATED_EVALS);
  const [filter, setFilter] = useState<'ALL' | 'PASSED' | 'THREATS'>('ALL');
  const navigate = useNavigate();

  const filteredEvals = evaluations.filter(ev => {
    if (filter === 'PASSED') return ev.verdict === 'PASSED';
    if (filter === 'THREATS') return ev.verdict === 'THREAT_INTERCEPTED';
    return true;
  });

  const passedCount = evaluations.filter(e => e.verdict === 'PASSED').length;
  const threatCount = evaluations.filter(e => e.verdict === 'THREAT_INTERCEPTED').length;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E8E7E3] font-sans">
      <Header 
        title="3-Layer Mutual Evaluation Guard Logs" 
        subtitle="Triangulated defense: Layer 1 Deterministic Rules, Layer 2 Cross-Model Consensus, Layer 3 Statistical Anomalies."
      />

      <main className="p-6 lg:p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
        
        {/* 3-Tier Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 card-soft-3d">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Layer 1: Deterministic Rules
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Validates strict JSON schemas, regex constraints, and transactional ceilings (₹5,000 max).
            </p>
            <div className="text-xs font-mono text-emerald-600 font-bold">Status: ACTIVE (0 False Positives)</div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 card-soft-3d">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Layer 2: LLM Consensus
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Independent cross-evaluation by Claude 3.5 Sonnet & GPT-4o with semantic divergence scoring.
            </p>
            <div className="text-xs font-mono text-amber-600 font-bold">Status: ACTIVE (2 Model Nodes)</div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 card-soft-3d">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              Layer 3: Statistical Drift
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Monitors token distribution entropy, latent representation drift, and invocation clustering.
            </p>
            <div className="text-xs font-mono text-blue-600 font-bold">Status: ACTIVE (Continuous Baseline)</div>
          </div>
        </div>

        {/* Logs Table with Filter Tabs */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden card-soft-3d">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-slate-900">Recent Evaluation Audit Trails</h3>
              <p className="text-xs text-slate-500 mt-0.5">Showing verified invariants and intercepted threats</p>
            </div>

            {/* Filter Toggle Buttons */}
            <div className="flex items-center p-1 bg-[#F4F4F1] rounded-2xl border border-slate-200 text-xs font-bold font-mono">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filter === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-black'
                }`}
              >
                All ({evaluations.length})
              </button>
              <button
                onClick={() => setFilter('PASSED')}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filter === 'PASSED' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-emerald-700'
                }`}
              >
                Verified Passed ({passedCount})
              </button>
              <button
                onClick={() => setFilter('THREATS')}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filter === 'THREATS' ? 'bg-white text-red-700 shadow-sm' : 'text-slate-500 hover:text-red-700'
                }`}
              >
                Threats Blocked ({threatCount})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-mono text-[11px] bg-[#FAF9F7]">
                  <th className="py-3.5 px-6 font-semibold">EVENT ID</th>
                  <th className="py-3.5 px-6 font-semibold">AGENT PROFILE</th>
                  <th className="py-3.5 px-6 font-semibold">LAYER 1 (RULES)</th>
                  <th className="py-3.5 px-6 font-semibold">LAYER 2 (CONSENSUS)</th>
                  <th className="py-3.5 px-6 font-semibold">LAYER 3 (DRIFT)</th>
                  <th className="py-3.5 px-6 font-semibold">FINAL VERDICT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredEvals.map((ev) => (
                  <tr key={ev.id} className="hover:bg-[#FAF9F7] transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">{ev.id}</td>
                    <td className="py-4 px-6 text-slate-900 font-semibold">{ev.agent}</td>
                    <td className={`py-4 px-6 font-mono font-bold ${ev.l1Rules.includes('PASS') ? 'text-emerald-700' : 'text-red-600'}`}>
                      {ev.l1Rules}
                    </td>
                    <td className={`py-4 px-6 font-mono font-bold ${ev.l2Consensus.includes('PASS') ? 'text-emerald-700' : 'text-red-600'}`}>
                      {ev.l2Consensus}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-600">{ev.l3Drift}</td>
                    <td className="py-4 px-6">
                      {ev.verdict === 'PASSED' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> PASSED (Risk {ev.riskScore}/100)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-red-50 text-red-700 border border-red-200">
                          <AlertTriangle className="w-3 h-3 text-red-600" /> THREAT BLOCKED (Risk {ev.riskScore}/100)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
