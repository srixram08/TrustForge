import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { api } from '../api/client';
import { 
  Dna, 
  ShieldAlert, 
  AlertTriangle, 
  Lock, 
  FileCode, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AgentDNA: React.FC = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getAgents()
      .then(res => {
        setAgents(res);
        if (res.length > 0) {
          setSelectedAgent(res[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL_FINANCIAL_DESTRUCTIVE':
      case 'CRITICAL':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'HIGH_STATE_MUTATION':
      case 'HIGH':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'MEDIUM_WRITE':
      case 'MEDIUM':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E8E7E3] font-sans">
      <Header 
        title="Agent Capability DNA & Attack Surface Matrix" 
        subtitle="Static analysis of agent tools, permission tiers, side-effect potentials, and invariant constraints."
        actions={
          <button 
            onClick={() => navigate('/attack-lab')}
            className="flex items-center gap-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-black text-xs font-black px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 text-black" />
            <span>Fuzz Active Profile</span>
          </button>
        }
      />

      <main className="p-6 lg:p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
        
        {/* Agent Selector Bar */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 font-mono pl-2">Select Agent Profile:</span>
          {agents.map(agent => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                selectedAgent?.id === agent.id
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-[#F4F4F1] hover:bg-[#EFEFEA] text-slate-700'
              }`}
            >
              {agent.name}
            </button>
          ))}
        </div>

        {selectedAgent && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Capability Risk Classification */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-black text-slate-900">Extracted Tool Capability Map</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Automated parameter inspection & blast-radius categorization</p>
                </div>

                <div className="space-y-4">
                  {selectedAgent.tools?.map((tool: any) => (
                    <div 
                      key={tool.id}
                      className="p-5 rounded-2xl bg-[#FAF9F7] border border-slate-200/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-mono">
                          <code className="text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-xl border border-slate-200">
                            {tool.name}
                          </code>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getRiskColor(tool.riskLevel)}`}>
                          {tool.riskLevel}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {tool.description}
                      </p>

                      <div className="text-[11px] font-mono text-slate-500 flex items-center gap-4 pt-1">
                        <span>Side Effects: <strong className="text-slate-800 font-sans">{tool.sideEffect ? 'State Mutating' : 'Read Only'}</strong></span>
                        <span>•</span>
                        <span>Requires Auth: <strong className="text-slate-800 font-sans">{tool.requiresAuth ? 'Yes' : 'No'}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Attack Surface Synthesis */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <div>
                  <h3 className="text-base font-black text-slate-900">DNA Threat Profile</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Invariant exposure metrics</p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-[#F8F8F6] border border-slate-200/60">
                    <span className="text-[11px] text-slate-500">Autonomous Financial Blast Radius</span>
                    <div className="text-sm font-bold text-red-600 mt-1">₹100,000 / execution</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8F8F6] border border-slate-200/60">
                    <span className="text-[11px] text-slate-500">Privilege Escalation Risk</span>
                    <div className="text-sm font-bold text-amber-600 mt-1">HIGH (Missing PIN validation)</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8F8F6] border border-slate-200/60">
                    <span className="text-[11px] text-slate-500">Prompt Injection Vulnerability</span>
                    <div className="text-sm font-bold text-red-600 mt-1">CRITICAL (System override possible)</div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/attack-lab')}
                  className="w-full bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-extrabold py-3.5 rounded-full text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Launch Fuzzing Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};
