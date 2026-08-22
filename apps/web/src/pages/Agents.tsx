import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { api } from '../api/client';
import { 
  Bot, 
  Plus, 
  Dna, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  FileCode, 
  ExternalLink,
  ShieldCheck,
  Server,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Agents: React.FC = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    framework: 'LANGCHAIN',
    model: 'gpt-4o',
    systemPrompt: '',
    tools: '[]'
  });
  const navigate = useNavigate();

  const fetchAgents = () => {
    setLoading(true);
    api.getAgents()
      .then(res => {
        setAgents(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let parsedTools = [];
      try {
        parsedTools = JSON.parse(newAgent.tools);
      } catch {
        parsedTools = [];
      }

      await api.createAgent({
        ...newAgent,
        tools: parsedTools
      });
      setIsModalOpen(false);
      fetchAgents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleScanDNA = async (agentId: string) => {
    await api.scanAgentDNA(agentId);
    navigate('/dna');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E8E7E3] font-sans">
      <Header 
        title="Autonomous Agents Under Test (AUT)" 
        subtitle="Catalog, inspect OpenAPI tool definitions, and trigger automated DNA capabilities scans."
        actions={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-black text-xs font-black px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Connect New Agent</span>
          </button>
        }
      />

      <main className="p-6 lg:p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
        
        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div 
              key={agent.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4F4F1] flex items-center justify-center text-slate-900 shadow-sm">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">{agent.name}</h3>
                      <p className="text-[11px] text-slate-500 font-mono font-medium">
                        {agent.framework} • {agent.model}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                    (agent.securityScore || 70) >= 80 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    Score: {agent.securityScore || 70}%
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed">
                  {agent.description}
                </p>

                {/* Metadata List */}
                <div className="mt-5 space-y-2 text-xs font-mono border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Registered Tools:</span>
                    <strong className="text-slate-900 font-sans">{agent.tools?.length || 0} tools</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Digital Twins:</span>
                    <span className="text-emerald-600 font-bold font-sans">
                      {agent.digitalTwin ? '1 Active (Isolated)' : 'Auto-Provisioned'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Vulnerabilities:</span>
                    <strong className={(agent.findings?.length || 0) > 0 ? 'text-red-600 font-bold' : 'text-slate-900'}>
                      {agent.findings?.length || 0} Found
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleScanDNA(agent.id)}
                  className="flex items-center justify-center gap-1.5 bg-[#F4F4F1] hover:bg-[#EFEFEA] text-slate-900 font-bold text-xs py-2.5 px-3 rounded-2xl transition-all cursor-pointer"
                >
                  <Dna className="w-3.5 h-3.5" />
                  <span>Scan DNA</span>
                </button>
                <button
                  onClick={() => navigate('/attack-lab')}
                  className="flex items-center justify-center gap-1.5 bg-black hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3 rounded-2xl transition-all shadow-sm cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Test Agent</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Connect New Agent Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Connect New Agent Under Test</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-black text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAgent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Agent Name</label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={e => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="e.g. Wealth Management Assistant"
                  className="w-full bg-[#F8F8F6] border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <input
                  type="text"
                  value={newAgent.description}
                  onChange={e => setNewAgent({ ...newAgent, description: e.target.value })}
                  placeholder="e.g. Executes wire transfers and portfolio rebalancing"
                  className="w-full bg-[#F8F8F6] border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Framework</label>
                  <select
                    value={newAgent.framework}
                    onChange={e => setNewAgent({ ...newAgent, framework: e.target.value })}
                    className="w-full bg-[#F8F8F6] border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-black"
                  >
                    <option value="LANGCHAIN">LangChain</option>
                    <option value="LLAMA_INDEX">LlamaIndex</option>
                    <option value="OPENAI_ASSISTANT">OpenAI Assistant API</option>
                    <option value="AUTOGEN">AutoGen</option>
                    <option value="CREW_AI">CrewAI</option>
                    <option value="CUSTOM_HTTP">Custom HTTP Endpoint</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Base Model</label>
                  <select
                    value={newAgent.model}
                    onChange={e => setNewAgent({ ...newAgent, model: e.target.value })}
                    className="w-full bg-[#F8F8F6] border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-black"
                  >
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                    <option value="llama-3.1-70b">Llama 3.1 70B</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">OpenAPI / Tools JSON Schema</label>
                <textarea
                  value={newAgent.tools}
                  onChange={e => setNewAgent({ ...newAgent, tools: e.target.value })}
                  placeholder='[{"name": "transfer_funds", "parameters": {...}}]'
                  rows={4}
                  className="w-full bg-[#F8F8F6] border border-slate-200 rounded-2xl p-3 text-slate-900 font-mono text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-slate-600 hover:text-black font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-extrabold px-6 py-2.5 rounded-full shadow-sm cursor-pointer"
                >
                  Save & Ingest Tools
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
