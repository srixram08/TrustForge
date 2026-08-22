import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Bot, 
  Dna, 
  Server, 
  Flame, 
  Layers, 
  Activity, 
  Network, 
  CheckCircle2, 
  Wrench, 
  Link2, 
  Settings, 
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { name: 'SOC Dashboard', path: '/soc', icon: LayoutDashboard },
  { name: 'Agents Under Test', path: '/agents', icon: Bot },
  { name: 'Agent DNA Profile', path: '/dna', icon: Dna },
  { name: 'Digital Twin Mocks', path: '/twins', icon: Server },
  { name: 'Attack Lab (Fuzzer)', path: '/attack-lab', icon: Flame },
  { name: 'Test Scenario Suites', path: '/test-suites', icon: Layers },
  { name: 'Execution Runs', path: '/executions', icon: Activity },
  { name: 'Failure Graph (DAG)', path: '/graph', icon: Network },
  { name: '3-Tier Evaluations', path: '/evaluations', icon: CheckCircle2 },
  { name: 'Auto-Remediation & PR', path: '/remediation', icon: Wrench },
  { name: 'Enterprise Integrations', path: '/integrations', icon: Link2 },
  { name: 'Security Policies', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col h-screen sticky top-0 select-none z-30 font-sans shadow-sm">
      {/* Brand Header */}
      <div 
        className="p-5 border-b border-slate-100 flex items-center gap-3 cursor-pointer"
        onClick={() => navigate('/')}
        title="Return to TrustForge Platform Home"
      >
        <div className="w-10 h-10 rounded-2xl bg-[#111111] flex items-center justify-center text-white shadow-md">
          <ShieldAlert className="w-5 h-5 text-[#D4FF00]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-black text-base tracking-tight text-slate-900 font-sans">
              TRUSTFORGE.
            </span>
            <span className="bg-[#D4FF00] text-black text-[9px] font-mono px-1.5 py-0.5 rounded font-black">
              SOC
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono font-medium">Forge Trust in AI</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-sm font-sans'
                    : 'text-slate-600 hover:text-black hover:bg-[#F4F4F1]'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* System Status & Sign Out Footer */}
      <div className="p-4 border-t border-slate-100 bg-[#FAF9F7] space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-500 font-medium">TrustForge Guard</span>
          <span className="flex items-center gap-1 text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ACTIVE
          </span>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-slate-200 hover:border-red-200 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out of Terminal</span>
        </button>
      </div>
    </aside>
  );
};
