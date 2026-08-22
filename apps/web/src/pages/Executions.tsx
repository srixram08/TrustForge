import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { api } from '../api/client';
import { Activity, CheckCircle2, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Executions: React.FC = () => {
  const [executions, setExecutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getExecutions()
      .then(res => {
        setExecutions(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E8E7E3] font-sans">
      <Header 
        title="Adversarial Execution Runs & Telemetry Logs" 
        subtitle="OpenTelemetry / OpenInference standardized trace streams across isolated digital-twin test runs."
      />

      <main className="p-6 lg:p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Execution History</h3>
            <span className="text-xs font-mono font-bold text-slate-500">{executions.length} Runs Recorded</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-mono text-[11px] bg-[#FAF9F7]">
                  <th className="py-3.5 px-6 font-semibold">RUN ID</th>
                  <th className="py-3.5 px-6 font-semibold">AGENT</th>
                  <th className="py-3.5 px-6 font-semibold">ATTACK STRATEGY</th>
                  <th className="py-3.5 px-6 font-semibold">STATUS</th>
                  <th className="py-3.5 px-6 font-semibold">FINDINGS</th>
                  <th className="py-3.5 px-6 font-semibold">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {executions.map((exec) => (
                  <tr key={exec.id} className="hover:bg-[#FAF9F7] transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">{exec.id.slice(0, 8)}</td>
                    <td className="py-4 px-6 text-slate-900 font-semibold">{exec.agent?.name || 'Finance Copilot'}</td>
                    <td className="py-4 px-6 font-mono text-slate-600">{exec.strategy || 'STATEFUL_FUZZ'}</td>
                    <td className="py-4 px-6 font-mono">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                        <AlertTriangle className="w-3 h-3" /> FAILED (Exploit)
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-red-600 font-bold">1 Critical Breach</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => navigate('/graph')}
                        className="text-slate-900 hover:text-black font-bold flex items-center gap-1 text-xs underline cursor-pointer"
                      >
                        <span>Inspect DAG</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
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
