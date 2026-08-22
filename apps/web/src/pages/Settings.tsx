import React from 'react';
import { Header } from '../components/Header';
import { Settings as SettingsIcon, Shield, Sliders, Lock, Check } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E8E7E3] font-sans">
      <Header 
        title="Global Security Policies & Thresholds" 
        subtitle="Configure autonomous transaction ceilings, consensus quorum requirements, and CI/CD gate tolerances."
      />

      <main className="p-6 lg:p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-black text-slate-900">Autonomous Execution Invariants</h3>
            <p className="text-xs text-slate-500 mt-0.5">Strict platform-wide rules applied to all connected agents</p>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div className="p-5 rounded-2xl bg-[#FAF9F7] border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Maximum Autonomous Transaction Ceiling</h4>
                <p className="text-slate-500 mt-0.5">Any refund/transfer tool call exceeding this threshold triggers an immediate hard block.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  defaultValue="₹5,000"
                  className="bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-slate-900 font-mono font-bold w-28 text-right"
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F7] border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Enforce Multi-Factor Supervisor PIN for Financial Mutating Tools</h4>
                <p className="text-slate-500 mt-0.5">Requires verified cryptographically signed PIN prior to calling issue_refund, wire_funds, or drop_table.</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-black rounded cursor-pointer" />
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F7] border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">3-Tier Consensus Quorum Tolerance</h4>
                <p className="text-slate-500 mt-0.5">Minimum agreement threshold across LLM consensus nodes before flagging false positive.</p>
              </div>
              <select className="bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-slate-900 font-bold">
                <option>Strict (95% Agreement)</option>
                <option>Balanced (80% Agreement)</option>
                <option>Permissive (60% Agreement)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button className="bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-black text-xs px-6 py-3 rounded-full shadow-md cursor-pointer">
              Save Security Policies
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
