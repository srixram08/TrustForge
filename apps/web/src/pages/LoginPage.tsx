import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ShieldAlert, 
  Lock, 
  Terminal, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Github, 
  Cpu, 
  ShieldCheck, 
  Flame,
  UserCheck,
  Sparkles,
  UserPlus,
  Building2,
  Fingerprint
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GlitterWarp } from '../components/GlitterWarp';
import { Logo } from '../components/Logo';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  
  const [isRegister, setIsRegister] = useState(searchParams.get('mode') === 'register');
  const [name, setName] = useState('Alex Vance');
  const [org, setOrg] = useState('CyberSec Enterprise Labs');
  const [email, setEmail] = useState('secops.admin@enterprise.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [securityPin, setSecurityPin] = useState('9901-SEC-PIN');
  const [usePin, setUsePin] = useState(false);
  const [role, setRole] = useState('Lead AI Security Architect');
  
  const [authenticating, setAuthenticating] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (searchParams.get('mode') === 'register') {
      setIsRegister(true);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticating(true);
    setScanProgress(15);

    const timer1 = setTimeout(() => setScanProgress(60), 300);
    const timer2 = setTimeout(() => setScanProgress(100), 700);

    setTimeout(() => {
      login(email, role);
      setAuthenticating(false);
      navigate('/soc');
    }, 1100);
  };

  const handleQuickDemoAccess = () => {
    login('secops.lead@enterprise.ai', 'Lead AI Security Architect');
    navigate('/soc');
  };

  return (
    <div className="min-h-screen bg-[#E8E7E3] text-slate-900 flex flex-col font-sans relative overflow-hidden selection:bg-[#D4FF00] selection:text-black">
      {/* React Bits Pro Glitter Warp Starfield Tunnel Background */}
      <GlitterWarp 
        particleCount={600} 
        speed={1.4} 
        warpIntensity={1.9} 
        particleColor="#D4FF00" 
        glitterColors={['#D4FF00', '#111111', '#00F0FF', '#FFFFFF', '#84CC16']}
        className="opacity-70"
      />

      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4FF00]/15 blur-[130px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-slate-200/60 blur-[120px] pointer-events-none rounded-full"></div>

      {/* Outer Spatial Canvas Frame */}
      <div className="w-full max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col flex-1 relative z-10">
        
        {/* Top Header Navigation Pill with Cybernetic AI Logo */}
        <header className="flex items-center justify-between py-4 px-6 bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-sm mb-6">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <Logo size="sm" showWordmark={true} />
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-xs font-bold text-slate-700 hover:text-black transition-colors cursor-pointer"
          >
            ← Return to Overview
          </button>
        </header>

        {/* Central White Auth Card */}
        <main className="flex-1 flex items-center justify-center py-4">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-[2.2rem] p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] space-y-6 relative overflow-hidden card-soft-3d">
            
            {/* Authenticating Scanner Visual Overlay */}
            {authenticating && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 space-y-4">
                <div className="relative w-20 h-20 rounded-full border-2 border-slate-200 flex items-center justify-center overflow-hidden">
                  <Fingerprint className="w-10 h-10 text-slate-900 animate-pulse" />
                  <div className="absolute inset-x-0 h-1 bg-[#D4FF00] shadow-[0_0_12px_#D4FF00] animate-scan-laser"></div>
                </div>
                
                <div className="text-center space-y-1">
                  <div className="text-sm font-black text-slate-900 font-sans">
                    {isRegister ? 'Provisioning SecOps Account...' : 'Validating Cryptographic Handshake...'}
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    Generating Zero-Knowledge Session Token ({scanProgress}%)
                  </p>
                </div>

                <div className="w-48 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#D4FF00] h-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Top Tabs: Sign In / Create Account & Cyber Lime Emblem */}
            <div className="flex items-center justify-between">
              <div className="flex items-center p-1 bg-[#F4F4F1] rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    !isRegister ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-black'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isRegister ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-black'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F4F1] text-[10px] font-mono text-slate-800 font-bold border border-slate-200">
                <Lock className="w-3 h-3 text-slate-700" />
                <span>SECURE ACCESS</span>
              </div>
            </div>

            {/* Centered Cybernetic Logo Emblem & Heading */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#111111] p-1.5 border border-[#D4FF00]/40 shadow-[0_0_15px_rgba(212,255,0,0.25)] flex items-center justify-center flex-shrink-0">
                  <img
                    src="/trustforge_logo.png"
                    alt="TrustForge Logo"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    {isRegister ? 'Create SecOps Account' : 'Sign in to TrustForge'}
                  </h2>
                  <p className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-widest mt-1">
                    CYBERNETIC AI SECURITY • SINCE 2026
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {isRegister 
                  ? 'Provision enterprise credentials and access autonomous agent testing sandboxes.'
                  : 'Forge Trust in Autonomous AI — Authenticate with SecOps credentials or SSO.'}
              </p>
            </div>

            {/* Quick SSO Buttons */}
            <div className="grid grid-cols-2 gap-3 font-medium text-xs">
              <button
                type="button"
                onClick={handleQuickDemoAccess}
                className="flex items-center justify-center gap-2 bg-[#F8F8F6] hover:bg-[#EFEFEA] border border-slate-200 py-2.5 px-3 rounded-2xl transition-all text-slate-800 cursor-pointer"
              >
                <Github className="w-4 h-4 text-black" />
                <span>GitHub SSO</span>
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAccess}
                className="flex items-center justify-center gap-2 bg-[#F8F8F6] hover:bg-[#EFEFEA] border border-slate-200 py-2.5 px-3 rounded-2xl transition-all text-slate-800 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-slate-800" />
                <span>Okta / SAML</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-[1px] bg-slate-200 flex-1"></div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                {isRegister ? 'Enter Details' : 'Or SecOps Auth'}
              </span>
              <div className="h-[1px] bg-slate-200 flex-1"></div>
            </div>

            {/* Credentials / Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-sans">
              {isRegister && (
                <>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-[#F8F8F6] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                      Enterprise / Organization Name
                    </label>
                    <input
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="e.g. CyberSec Enterprise Labs"
                      className="w-full bg-[#F8F8F6] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                  SecOps Operator ID / Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8F8F6] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 font-mono text-xs focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 text-[11px]">
                  <label className="text-slate-700 font-bold">Master Key Password</label>
                  {!isRegister && (
                    <button
                      type="button"
                      onClick={() => setUsePin(!usePin)}
                      className="text-slate-500 hover:text-black font-semibold text-[10px] underline cursor-pointer"
                    >
                      {usePin ? 'Use Password' : 'Use PIN Authorization'}
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={usePin ? securityPin : password}
                  onChange={(e) => usePin ? setSecurityPin(e.target.value) : setPassword(e.target.value)}
                  className="w-full bg-[#F8F8F6] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 font-mono text-xs focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-black py-3 rounded-2xl text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                {isRegister ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create & Launch SecOps Terminal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Access SOC Operations Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Instant Hackathon Demo Bypass */}
            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                onClick={handleQuickDemoAccess}
                className="text-[11px] font-bold text-slate-600 hover:text-black underline cursor-pointer"
              >
                Instant Hackathon Demo Bypass (Skip Authentication) →
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center text-slate-500 font-mono text-[11px]">
          TrustForge — Forge Trust in Autonomous AI. v2.4 • SOC Level 4 Protected
        </footer>
      </div>
    </div>
  );
};
