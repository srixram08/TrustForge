import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { api } from '../api/client';
import { 
  Server, 
  RefreshCw, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  RotateCcw,
  Check,
  Flame,
  ShieldCheck,
  Activity,
  Sliders
} from 'lucide-react';

const parseFaults = (raw: any): string[] => {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return raw ? [raw] : [];
    }
  }
  return [];
};

export const DigitalTwins: React.FC = () => {
  const [twin, setTwin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedFaults, setSelectedFaults] = useState<string[]>([]);

  const fetchTwin = () => {
    setLoading(true);
    api.getDigitalTwins()
      .then(res => {
        if (res && res.length > 0) {
          setTwin(res[0]);
          setSelectedFaults(parseFaults(res[0].activeFaults));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTwin();
  }, []);

  const handleReset = async () => {
    if (!twin) return;
    setActionLoading(true);
    try {
      await api.resetTwin(twin.id);
      fetchTwin();
    } finally {
      setActionLoading(false);
    }
  };

  const handleApplyFaults = async () => {
    if (!twin) return;
    setActionLoading(true);
    try {
      await api.updateTwinFaults(twin.id, selectedFaults);
      fetchTwin();
    } finally {
      setActionLoading(false);
    }
  };

  const toggleFault = (fault: string) => {
    setSelectedFaults(prev => {
      const list = parseFaults(prev);
      return list.includes(fault) ? list.filter(f => f !== fault) : [...list, fault];
    });
  };

  const FAULT_OPTIONS = [
    { id: 'TIMEOUT_5000MS', label: 'Simulate API Timeout', desc: 'Delays tool response by 4,000ms' },
    { id: 'HTTP_500_INTERNAL', label: 'Inject HTTP 500 Error', desc: 'Simulates internal server crash' },
    { id: 'MALFORMED_JSON', label: 'Inject Malformed JSON', desc: 'Tests JSON schema parsing collapse' },
    { id: 'RATE_LIMIT_429', label: 'HTTP 429 Rate Limit', desc: 'Triggers rate limit exceeded response' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E8E7E3] font-sans">
      <Header 
        title="Dynamic Auto-Mocking Digital Twin Sandbox" 
        subtitle="Stateful mock tool runtime, ephemeral DBs, balance ledgers, and environmental chaos injectors."
        actions={
          <button 
            onClick={handleReset}
            disabled={actionLoading}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${actionLoading ? 'animate-spin' : ''}`} />
            <span>Reset Twin State</span>
          </button>
        }
      />

      <main className="p-6 lg:p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
        
        {/* Sandbox Status Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm card-soft-3d flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F4F4F1] flex items-center justify-center text-slate-900 shadow-sm">
              <Server className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  STATEFUL SANDBOX RUNNING
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {twin?.id || 'dtwin_mock_01'}</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                {twin?.name || 'Finance Gateway Digital Twin'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-xs font-mono hidden sm:block">
              <div className="text-slate-500">Isolation Level: <strong className="text-slate-900">Ephemeral Memory</strong></div>
              <div className="text-slate-500">Active Faults: <strong className="text-red-600 font-bold">{selectedFaults.length}</strong></div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Mock State & Chaos Fault Injection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Stateful Mock Ledger */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm card-soft-3d space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Stateful Mock Database Ledger</h3>
                <p className="text-xs text-slate-500 mt-0.5">Simulated records mutated by autonomous agent tool invocations</p>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-700 bg-[#F4F4F1] px-3 py-1 rounded-full border border-slate-200">
                5 Active Accounts
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-mono text-[11px] bg-[#FAF9F7]">
                    <th className="py-3 px-4 font-semibold">CUSTOMER ID</th>
                    <th className="py-3 px-4 font-semibold">ACCOUNT NAME</th>
                    <th className="py-3 px-4 font-semibold">LEDGER BALANCE</th>
                    <th className="py-3 px-4 font-semibold">LAST MUTATION</th>
                    <th className="py-3 px-4 font-semibold">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr className="hover:bg-[#FAF9F7] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">CUST_1029</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">Acme Global Enterprise</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">₹450,000.00</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">issue_refund (₹100,000)</td>
                    <td className="py-3.5 px-4"><span className="bg-red-50 text-red-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-red-200">MUTATED</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F7] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">CUST_8831</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">CyberDynamics Retail</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">₹12,450.00</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">check_balance</td>
                    <td className="py-3.5 px-4"><span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-200">NOMINAL</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F7] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">CUST_4429</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">Starlight Logistics</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">₹98,200.00</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">process_charge (₹2,500)</td>
                    <td className="py-3.5 px-4"><span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-200">NOMINAL</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right 1 Col: Chaos Fault Injector */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm card-soft-3d flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Chaos Fault Injectors</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Tool Mock
                </span>
              </div>

              <div className="space-y-2.5">
                {FAULT_OPTIONS.map((opt) => {
                  const active = selectedFaults.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleFault(opt.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        active 
                          ? 'bg-red-50/80 border-red-300 shadow-sm text-red-950' 
                          : 'bg-[#FAF9F7] border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        active ? 'bg-red-600 border-red-600 text-white' : 'border-slate-300'
                      }`}>
                        {active && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleApplyFaults}
              disabled={actionLoading}
              className="w-full bg-[#111111] hover:bg-black text-white text-xs font-extrabold py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#D4FF00]" />
              <span>Apply Chaos Faults ({selectedFaults.length})</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};
