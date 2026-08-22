import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { api } from '../api/client';
import { Github, MessageSquare, AlertCircle, Cpu, Link2, CheckCircle2 } from 'lucide-react';

export const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getIntegrations()
      .then(res => {
        setIntegrations(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const INTEGRATION_TYPES = [
    { name: 'GitHub Enterprise', type: 'GITHUB', desc: 'Auto-dispatch remediation PRs, webhook triggers on merge, CI/CD gates.', icon: Github, active: true },
    { name: 'Slack SOC Alerting', type: 'SLACK', desc: 'Real-time alert notifications for critical policy violations and zero-day discoveries.', icon: MessageSquare, active: true },
    { name: 'PagerDuty', type: 'PAGERDUTY', desc: 'High-severity automated incident escalation for production agent anomalies.', icon: AlertCircle, active: false },
    { name: 'Anthropic / OpenAI API', type: 'LLM_PROVIDER', desc: 'Mutual evaluator consensus and automated invariant generation.', icon: Cpu, active: true },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E8E7E3] font-sans">
      <Header 
        title="Enterprise CI/CD & SOC Integrations" 
        subtitle="Connect GitHub repositories, Slack alerting channels, PagerDuty incident streams, and LLM consensus providers."
      />

      <main className="p-6 lg:p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INTEGRATION_TYPES.map((integ, idx) => {
            const Icon = integ.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4F4F1] flex items-center justify-center text-slate-900">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      integ.active 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {integ.active ? 'CONNECTED' : 'DISCONNECTED'}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900">{integ.name}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{integ.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">Status: {integ.active ? 'Syncing Healthy' : 'Setup Required'}</span>
                  <button className="bg-[#F4F4F1] hover:bg-[#EFEFEA] text-slate-900 text-xs font-bold px-4 py-2 rounded-2xl transition-all cursor-pointer">
                    Configure →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
