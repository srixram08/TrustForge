import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Terminal, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  Dna, 
  Network, 
  GitPullRequest, 
  Zap, 
  Play, 
  Cpu, 
  Lock, 
  Check, 
  ExternalLink,
  ChevronRight,
  UserCheck,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  RefreshCw,
  Sliders,
  Database,
  Code2,
  FileCode,
  TrendingUp,
  Brain,
  Crosshair,
  GitBranch,
  Shield,
  Bot
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GlitterWarp } from '../components/GlitterWarp';
import { PixelMagnet } from '../components/PixelMagnet';
import { Logo } from '../components/Logo';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [telemetryCounter, setTelemetryCounter] = useState(542);
  
  // Interactive 3D mouse parallax state
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryCounter(prev => prev + 1);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Compute 3D rotation angles
  const rotX = isHovering ? -mousePos.y * 12 : 0;
  const rotY = isHovering ? mousePos.x * 16 : 0;

  return (
    <div className="min-h-screen bg-[#E8E7E3] text-slate-900 flex flex-col font-sans relative overflow-x-hidden selection:bg-[#D4FF00] selection:text-black">
      
      {/* React Bits Pro Glitter Warp Starfield Tunnel Background */}
      <GlitterWarp 
        particleCount={700} 
        speed={1.1} 
        warpIntensity={1.7} 
        particleColor="#D4FF00" 
        glitterColors={['#D4FF00', '#000000', '#00F0FF', '#FFFFFF', '#A3E635']}
        className="opacity-75"
      />

      {/* React Bits Pro Pixel Magnet Cursor Trail */}
      <PixelMagnet 
        pixelSize={3.5}
        gap={28}
        magnetRadius={150}
        magnetStrength={0.5}
        pixelColor="rgba(17, 17, 17, 0.08)"
        activeColor="#D4FF00"
        className="z-0"
      />

      {/* Outer Spatial Canvas Wrapper */}
      <div className="w-full max-w-[1440px] mx-auto p-3 sm:p-6 lg:p-8 flex flex-col flex-1 space-y-12 relative z-10">
        
        {/* ==========================================
            HERO SECTION
        ========================================== */}
        <div 
          ref={heroRef}
          onMouseMove={(e) => {
            setIsHovering(true);
            handleMouseMove(e);
          }}
          onMouseLeave={handleMouseLeave}
          className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.06)] border border-slate-200/80 p-6 sm:p-10 lg:p-14 relative overflow-hidden flex flex-col justify-between min-h-[840px] transition-all duration-700 hover:shadow-[0_30px_85px_-15px_rgba(0,0,0,0.09)]"
        >
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-b from-[#D4FF00]/12 via-[#D4FF00]/4 to-transparent blur-[140px] pointer-events-none rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-slate-100/90 to-transparent blur-[120px] pointer-events-none rounded-full"></div>

          {/* Top Floating Glass Navigation Bar */}
          <header className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-30">
            {/* Left Brand Logo Emblem */}
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <Logo size="sm" showWordmark={true} />
            </div>

            {/* Left Nav Pill Group */}
            <div className="flex items-center gap-1 sm:gap-1.5 bg-[#F4F4F1]/90 border border-slate-200/90 rounded-full px-3 py-1.5 shadow-sm backdrop-blur-md">
              <a href="#problem" className="px-4 py-1.5 text-xs font-bold text-slate-700 hover:text-black transition-colors rounded-full hover:bg-white/80">
                The Problem
              </a>
              <a href="#how-it-works" className="px-4 py-1.5 text-xs font-bold text-slate-700 hover:text-black transition-colors rounded-full hover:bg-white/80">
                How It Works
              </a>
              <a href="#features" className="px-4 py-1.5 text-xs font-bold text-slate-700 hover:text-black transition-colors rounded-full hover:bg-white/80">
                Features
              </a>
              <a href="#architecture" className="px-4 py-1.5 text-xs font-bold text-slate-700 hover:text-black transition-colors rounded-full hover:bg-white/80">
                Architecture
              </a>
              <button onClick={() => navigate('/soc')} className="px-4 py-1.5 text-xs font-bold text-slate-700 hover:text-black transition-colors rounded-full hover:bg-white/80">
                SOC Terminal
              </button>
            </div>

            {/* Right Action Pill Group */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigate('/soc')}
                    className="text-xs font-bold text-slate-800 hover:text-black px-3.5 py-2 transition-colors font-sans cursor-pointer flex items-center gap-2 bg-[#F4F4F1] hover:bg-[#EFEFEA] rounded-full"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                    <span>SOC Terminal ({user?.name?.split(' ')[0] || 'SecOps'})</span>
                  </button>
                  <button 
                    onClick={() => logout()}
                    className="text-xs font-bold text-red-600 hover:text-red-700 px-3 py-2 transition-colors font-sans cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-xs font-bold text-slate-800 hover:text-black px-3 py-2 transition-colors font-sans cursor-pointer"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/login?mode=register')}
                    className="text-xs font-bold text-slate-700 hover:text-black px-3 py-2 transition-colors font-sans cursor-pointer hidden sm:inline"
                  >
                    Create Account
                  </button>
                </div>
              )}
              
              <button 
                onClick={() => navigate('/agents')}
                className="flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-extrabold px-6 py-3 rounded-full shadow-lg shadow-black/10 hover:shadow-black/20 hover:scale-[1.02] transition-all cursor-pointer group"
              >
                <span>Start Security Scan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </header>

          {/* Central Layered 3D Composition (Orb below + Text Properly Scaled Above) */}
          <div className="relative text-center my-auto py-8 sm:py-12 select-none perspective-1000 flex items-center justify-center min-h-[360px] overflow-hidden max-w-full">
            
            {/* 1. Centered 3D Pure Lime & Chrome Orb */}
            <div 
              style={{
                transform: `perspective(1000px) rotateX(${rotX * 0.8}deg) rotateY(${rotY * 0.8}deg) scale(1.05)`,
                transition: isHovering ? 'transform 0.15s ease-out' : 'transform 0.8s ease-out'
              }}
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            >
              <img
                src="/pure_lime_orb.png"
                alt="TrustForge 3D Chrome Core"
                className="w-full max-w-[420px] sm:max-w-[500px] object-contain mix-blend-multiply opacity-95 animate-float-orb"
              />
            </div>

            {/* 2. Massive Translucent Floating Name: TRUSTFORGE. (Moving RIGHT TO LEFT) */}
            <div 
              style={{
                transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(30px)`,
                transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out'
              }}
              className="relative z-20 w-full animate-float-right-to-left pointer-events-none max-w-full px-2"
            >
              <h1 className="text-[8.5vw] sm:text-[8.8vw] lg:text-[7.4rem] font-black tracking-tight leading-none text-translucent-3d uppercase font-sans drop-shadow-sm opacity-90 block">
                TRUSTFORGE.
              </h1>
            </div>
          </div>

          {/* Bottom Hero Tagline & CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end relative z-30 pt-4">
            
            {/* Left Social Proof & Micro Tagline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-slate-900 text-white font-bold text-[10px] items-center justify-center shadow-sm">
                    AV
                  </div>
                  <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-[#111111] text-[#D4FF00] font-bold text-[10px] items-center justify-center shadow-sm">
                    TF
                  </div>
                  <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-slate-700 text-white font-bold text-[10px] items-center justify-center shadow-sm">
                    AI
                  </div>
                </div>
                <div>
                  <span className="text-xl font-extrabold text-[#111111] font-sans tracking-tight">2M+</span>
                  <p className="text-[11px] text-slate-500 font-sans font-medium">Autonomous decisions verified</p>
                </div>
              </div>

              {/* Tagline */}
              <div className="pt-1">
                <p className="text-xs text-slate-900 font-bold max-w-[320px] leading-relaxed">
                  Forge Trust. Break Weaknesses. Secure AI Agents.
                </p>
                <p className="text-[11px] text-slate-500 font-medium max-w-[320px] mt-0.5">
                  Built for the next generation of autonomous AI.
                </p>
              </div>
            </div>

            {/* Center Action Buttons */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/agents')}
                  className="bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-black text-xs px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Start Security Scan</span>
                </button>
                <button
                  onClick={() => navigate('/soc')}
                  className="bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs px-6 py-3 rounded-full border border-slate-200 shadow-sm hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4 text-black" />
                  <span>Explore the Platform</span>
                </button>
              </div>
            </div>

            {/* Right Side Metadata & Floating Play Badge */}
            <div className="flex flex-col md:items-end justify-between space-y-6">
              <div className="text-left md:text-right space-y-1 text-xs font-sans font-medium">
                <div className="text-slate-500">Continuous Red-Teaming <span className="text-slate-400 font-mono">/01</span></div>
                <div className="text-slate-500">Digital Twin Mocks <span className="text-slate-400 font-mono">/02</span></div>
                <div className="text-[#111111] font-bold">Auto-Remediation PRs <span className="text-slate-400 font-mono">/03</span></div>
              </div>

              <button
                onClick={() => navigate('/attack-lab')}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-extrabold flex flex-col items-center justify-center gap-1 shadow-[0_15px_35px_rgba(212,255,0,0.4)] hover:scale-105 transition-all p-3 text-center cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold font-sans">
                  <Play className="w-3.5 h-3.5 fill-black text-black" />
                  <span>How it works?</span>
                </div>
                <span className="text-[9px] font-mono opacity-75 uppercase tracking-tight font-bold">Live Attack Demo</span>
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            TRUST STATEMENT
        ========================================== */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm card-soft-3d max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4F4F1] border border-slate-200 text-xs font-mono text-slate-800 font-bold">
            <Lock className="w-3.5 h-3.5 text-slate-900" />
            <span>TRUST STATEMENT</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-snug">
            AI agents are becoming autonomous. <br className="hidden sm:inline" />
            <span className="underline decoration-[#D4FF00] decoration-4">Their security can't remain manual.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            AI agents can access APIs, databases, financial systems, internal tools, and sensitive information. 
            A single unsafe decision can trigger a cascading chain of destructive actions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4 text-left font-mono text-xs">
            <div className="p-5 rounded-2xl bg-[#F8F8F6] border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Traditional Testing Asks:</span>
              <p className="text-sm font-bold text-slate-700 mt-1">"Does the agent work?"</p>
            </div>

            <div className="p-5 rounded-2xl bg-black text-white border border-slate-800 shadow-md">
              <span className="text-[10px] text-[#D4FF00] font-bold uppercase">TrustForge Asks:</span>
              <p className="text-sm font-bold text-white mt-1">"What happens when the agent is attacked?"</p>
            </div>
          </div>
        </section>

        {/* ==========================================
            THE PROBLEM SECTION
        ========================================== */}
        <section id="problem" className="space-y-6">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-3.5 py-1 rounded-full uppercase">
              THE PROBLEM
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Your AI Agent Doesn't Need to Be Hacked. It Can Be Manipulated.
            </h2>
            <div className="pt-2">
              <span className="text-xs font-mono font-bold text-slate-600 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm inline-block">
                User → LLM → Memory → Tools → APIs → Enterprise Systems
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              A vulnerability anywhere in this execution chain creates catastrophic consequences across your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
            {/* Common Failure 1 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">Prompt Injection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manipulate the agent into ignoring its original instructions and system constraints through indirect or nested roleplay payloads.
              </p>
            </div>

            {/* Common Failure 2 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <Crosshair className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">Tool Abuse</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Force an agent to execute dangerous, unauthorized, or high-volume actions such as unverified bank refunds and database modifications.
              </p>
            </div>

            {/* Common Failure 3 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">Privilege Escalation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exploit excessive permissions exposed through tools and invoke internal administrative methods without MFA token confirmation.
              </p>
            </div>

            {/* Common Failure 4 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">Data Leakage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extract confidential system prompts, customer PII, internal API keys, and corporate secrets through adversarial conversation traps.
              </p>
            </div>

            {/* Common Failure 5 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">State Manipulation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gradually poison and influence an agent’s memory across multi-turn sessions to alter its long-term decision invariants.
              </p>
            </div>

            {/* Common Failure 6 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm card-soft-3d space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">Unsafe Decisions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cause the autonomous agent to perform critical actions completely outside organizational governance and legal compliance boundaries.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            THE SOLUTION: MEET TRUSTFORGE
        ========================================== */}
        <section className="bg-black text-white rounded-[2.5rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4FF00]/10 blur-[120px] pointer-events-none rounded-full"></div>

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest">
              SOLUTION — MEET TRUSTFORGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              The Continuous Security Layer for AI Agents
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              TrustForge transforms AI-agent security from manual pentesting into an automated, continuous security lifecycle:
            </p>
            <div className="text-xs sm:text-sm font-mono font-bold text-[#D4FF00] pt-2">
              Discover → Attack → Evaluate → Explain → Fix → Verify
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[#D4FF00] font-bold">01. Why it failed</span>
              <p className="text-slate-400 font-sans text-xs mt-1">Causal reasoning path identification</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[#D4FF00] font-bold">02. How the attack worked</span>
              <p className="text-slate-400 font-sans text-xs mt-1">Full multi-turn payload trace</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[#D4FF00] font-bold">03. Which tool was exploited</span>
              <p className="text-slate-400 font-sans text-xs mt-1">Isolated mock tool invocation parameters</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[#D4FF00] font-bold">04. What state it reached</span>
              <p className="text-slate-400 font-sans text-xs mt-1">Digital twin ledger & memory mutations</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[#D4FF00] font-bold">05. How severe it is</span>
              <p className="text-slate-400 font-sans text-xs mt-1">Multi-perspective risk scoring (0-100)</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[#D4FF00] font-bold">06. How to fix & verify</span>
              <p className="text-slate-400 font-sans text-xs mt-1">Auto Git PRs with permanent regression tests</p>
            </div>
          </div>
        </section>

        {/* ==========================================
            HOW IT WORKS: 4 CORE PILLARS
        ========================================== */}
        <section id="how-it-works" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              From Agent to Trusted Agent
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Step 01 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm card-soft-3d space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">01 — DISCOVER</span>
                  <div className="w-9 h-9 rounded-2xl bg-[#F4F4F1] flex items-center justify-center text-slate-900 font-bold">
                    <Dna className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900">Map the Agent's DNA</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  TrustForge automatically analyzes your agent's tools, APIs, permissions, schemas, data access, behavioral patterns, and high-risk operations.
                </p>
                <div className="p-3 bg-[#F8F8F6] rounded-2xl border border-slate-200 font-mono text-[11px]">
                  <strong>Output:</strong> <code>Agent DNA</code> — Complete attack surface map.
                </div>
              </div>
              <button onClick={() => navigate('/dna')} className="text-xs font-bold text-slate-900 flex items-center gap-1 hover:underline pt-2 cursor-pointer">
                View DNA Analyzer <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 02 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm card-soft-3d space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">02 — SIMULATE</span>
                  <div className="w-9 h-9 rounded-2xl bg-[#F4F4F1] flex items-center justify-center text-slate-900 font-bold">
                    <Server className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900">Create a Digital Twin</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Converts tool specifications and OpenAPI definitions into isolated, stateful mock environments. No production systems required.
                </p>
                <div className="p-3 bg-[#F8F8F6] rounded-2xl border border-slate-200 font-mono text-[11px]">
                  <strong>Chaos Injections:</strong> <code>Timeout → HTTP 500 → Stale Data → 401</code>
                </div>
              </div>
              <button onClick={() => navigate('/twins')} className="text-xs font-bold text-slate-900 flex items-center gap-1 hover:underline pt-2 cursor-pointer">
                Inspect Digital Twins <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 03 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm card-soft-3d space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">03 — ATTACK</span>
                  <div className="w-9 h-9 rounded-2xl bg-[#F4F4F1] flex items-center justify-center text-slate-900 font-bold">
                    <Flame className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900">Think Like an Attacker</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Semantic fuzzing explores entire execution paths: Prompt Injection, Edge-Case Data, Tool Chaos, Multi-Turn Manipulation, Boundary Attacks, and State Manipulation.
                </p>
                <div className="p-3 bg-[#F8F8F6] rounded-2xl border border-slate-200 font-mono text-[11px]">
                  <strong>Core Philosophy:</strong> <em>"What if I change agent state at this decision point?"</em>
                </div>
              </div>
              <button onClick={() => navigate('/attack-lab')} className="text-xs font-bold text-slate-900 flex items-center gap-1 hover:underline pt-2 cursor-pointer">
                Launch Attack Lab <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 04 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm card-soft-3d space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">04 — EVALUATE</span>
                  <div className="w-9 h-9 rounded-2xl bg-[#F4F4F1] flex items-center justify-center text-slate-900 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900">Never Trust a Single Judge</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Combines Deterministic Rules (JSON schemas, ceilings), Cross-Model LLM Consensus (Claude + GPT-4o), and Statistical Anomaly Detection.
                </p>
                <div className="p-3 bg-[#F8F8F6] rounded-2xl border border-slate-200 font-mono text-[11px]">
                  <strong>Verdict:</strong> One authoritative verdict from multiple perspectives.
                </div>
              </div>
              <button onClick={() => navigate('/evaluations')} className="text-xs font-bold text-slate-900 flex items-center gap-1 hover:underline pt-2 cursor-pointer">
                View 3-Tier Guards <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>

        {/* ==========================================
            ATTACK GRAPH & RISK ENGINE PREVIEW
        ========================================== */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm card-soft-3d space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                ATTACK GRAPH & RISK ENGINE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                See Exactly How the Agent Failed
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                From a vulnerability report to an interactive causal attack story.
              </p>
            </div>

            <button
              onClick={() => navigate('/graph')}
              className="bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-extrabold text-xs px-5 py-2.5 rounded-full shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Explore Interactive DAG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Causal Flow Chain Visual */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-center text-xs">
            <div className="p-3 rounded-2xl bg-[#F8F8F6] border border-slate-200 font-bold">1. USER INPUT</div>
            <div className="p-3 rounded-2xl bg-red-50 text-red-700 border border-red-200 font-bold">2. PROMPT INJECTION</div>
            <div className="p-3 rounded-2xl bg-[#F8F8F6] border border-slate-200 font-bold">3. AGENT DECISION</div>
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 font-bold">4. TOOL CALL</div>
            <div className="p-3 rounded-2xl bg-[#F8F8F6] border border-slate-200 font-bold">5. DIGITAL TWIN</div>
            <div className="p-3 rounded-2xl bg-orange-50 text-orange-800 border border-orange-200 font-bold">6. STATE CHANGE</div>
            <div className="p-3 rounded-2xl bg-red-100 text-red-900 border border-red-300 font-bold">7. POLICY VIOLATION</div>
            <div className="p-3 rounded-2xl bg-black text-white font-bold">8. AUTO-FIX (PR)</div>
          </div>

          {/* Risk Formula Bar */}
          <div className="p-6 rounded-2xl bg-[#FAF9F7] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px]">Unified Risk Engine Formula:</span>
              <div className="text-sm font-black text-slate-900 mt-0.5">
                Severity × Exploitability × Impact × Confidence
              </div>
            </div>
            <div className="flex items-center gap-2 font-bold text-[10px]">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">LOW</span>
              <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">MEDIUM</span>
              <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full border border-orange-200">HIGH</span>
              <span className="bg-red-600 text-white px-3 py-1 rounded-full">CRITICAL</span>
            </div>
          </div>
        </section>

        {/* ==========================================
            AUTONOMOUS REMEDIATION & GIT INTEGRATION
        ========================================== */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm card-soft-3d space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                AUTONOMOUS REMEDIATION & GIT PR AUTO-PATCH
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Don't Just Find Vulnerabilities. Fix Them.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Vulnerability → Security Fix → Code Diff → Regression Test → Pull Request (PR #1042)
              </p>
            </div>

            <button
              onClick={() => navigate('/remediation?autoSolve=true')}
              className="bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-extrabold text-xs px-5 py-2.5 rounded-full shadow-md cursor-pointer flex items-center gap-2"
            >
              <GitPullRequest className="w-3.5 h-3.5 text-black" />
              <span>Generate Fix & Open PR</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Finding Card */}
            <div className="p-6 rounded-2xl bg-red-50/60 border border-red-200 space-y-3 font-sans">
              <span className="text-xs font-mono font-bold text-red-600">CRITICAL — Refund Limit Bypass</span>
              <h4 className="text-sm font-bold text-slate-900">
                Agent executes <code>issue_refund(amount = ₹100,000)</code> without supervisor authorization.
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Roleplay prompt injection allowed malicious user to drain corporate balances past ₹5,000 ceiling.
              </p>
            </div>

            {/* Generated Invariant Fix Card */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3 font-sans">
              <span className="text-xs font-mono font-bold text-emerald-700">AUTONOMOUS REMEDIATION PACKAGE</span>
              <ul className="text-xs text-slate-700 space-y-1.5 font-mono">
                <li>• <strong>System Prompt Patch:</strong> Explicit boundaries & supervisor PIN rule</li>
                <li>• <strong>Tool Schema Patch:</strong> <code>{`{"amount": {"maximum": 5000}}`}</code></li>
                <li>• <strong>Policy Rule:</strong> <code>refund.amount &lt;= 5000</code></li>
                <li>• <strong>Regression Test:</strong> Permanent validation across 160 permutations</li>
              </ul>
            </div>
          </div>

          {/* Continuous Validation Scores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF9F7] border border-slate-200">
              <span className="text-slate-400 font-bold uppercase text-[10px]">BEFORE REMEDIATION:</span>
              <div className="text-base font-bold text-red-600 mt-1">Security Score: 62 / 100 • 4 Critical Findings</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-emerald-200">
              <span className="text-emerald-700 font-bold uppercase text-[10px]">AFTER REMEDIATION (PR #1042):</span>
              <div className="text-base font-bold text-emerald-700 mt-1">Security Score: 94 / 100 • 0 Critical Findings</div>
            </div>
          </div>
        </section>

        {/* ==========================================
            KEY FEATURES (9-GRID)
        ========================================== */}
        {/* ==========================================
            KEY FEATURES (9-GRID)
        ========================================== */}
        <section id="features" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest bg-white px-3.5 py-1 rounded-full border border-slate-200 shadow-sm">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Everything You Need to Trust Autonomous AI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
              Enterprise-grade automated red-teaming, causal attack graphs, and self-healing git patches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Dna, tag: 'DISCOVERY', title: 'Agent DNA Profiler', desc: 'Automatically maps tool schemas, API parameters, memory dependencies, and systemic attack surfaces in real-time.', color: 'text-purple-600', bg: 'bg-purple-50' },
              { icon: Server, tag: 'ISOLATION', title: 'Stateful Digital Twins', desc: 'Execute dangerous financial and system actions safely inside ephemeral mock tool runtimes and ledgers.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: Flame, tag: 'RED-TEAMING', title: 'Semantic State Fuzzing', desc: 'Explores multi-turn conversation trees, prompt injections, and privilege boundary overrides with 0 manual effort.', color: 'text-orange-600', bg: 'bg-orange-50' },
              { icon: Brain, tag: 'EVALUATION', title: 'Multi-Model Consensus', desc: 'Eliminates single-evaluator bias using 3-judge cross-model LLM consensus and strict schema validators.', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: GitBranch, tag: 'VISUALIZATION', title: 'Causal Failure Graph (DAG)', desc: 'Visualizes the step-by-step reasoning and tool mutation sequence that caused a policy breach.', color: 'text-red-600', bg: 'bg-red-50' },
              { icon: Activity, tag: 'METRICS', title: 'Dynamic Risk Engine', desc: 'Calculates actionable 0-100 enterprise security scores based on financial exposure and tool destructiveness.', color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: Sparkles, tag: 'REPAIR', title: 'Autonomous Invariant Patches', desc: 'Automatically generates hardened system prompts, schema parameter constraints, and security diffs.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: RefreshCw, tag: 'ASSURANCE', title: 'Continuous Regression Testing', desc: 'Converts discovered vulnerabilities into permanent regression invariant test suites instantly.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { icon: GitPullRequest, tag: 'AUTOMATION', title: 'Native Git PR Integration', desc: '1-click pull request generation for GitHub Enterprise to patch vulnerabilities before production.', color: 'text-slate-900', bg: 'bg-slate-100' }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-[2rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-black/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 group card-soft-3d"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-[#F4F4F1] text-slate-700 border border-slate-200">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-black transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 group-hover:text-black transition-colors">
                  <span>CAPABILITY #{idx + 1}</span>
                  <span className="group-hover:translate-x-1 transition-transform">Explore →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            ARCHITECTURE SECURITY PIPELINE (HIGH-TECH 3D FLOW)
        ========================================== */}
        <section id="architecture" className="bg-[#111111] text-white rounded-[2.5rem] p-8 sm:p-14 shadow-2xl border border-slate-800 space-y-10 relative overflow-hidden">
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4FF00]/10 blur-[140px] pointer-events-none rounded-full"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[140px] pointer-events-none rounded-full"></div>

          <div className="text-center space-y-3 max-w-2xl mx-auto relative z-10">
            <span className="text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest bg-white/5 border border-[#D4FF00]/20 px-3.5 py-1 rounded-full">
              CONTINUOUS SECURITY ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              One Security Loop. Every Agent.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              From automated capability discovery to stateful fuzzing, causal DAG generation, and 1-click Git patches.
            </p>
          </div>

          {/* Interactive Flow Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            
            {/* Step 1: Agent AUT */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-[#D4FF00]/60 transition-all space-y-3 relative group">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#D4FF00] font-bold">01. INTAKE</span>
                <span className="text-slate-500">Live Socket</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Bot className="w-5 h-5 text-[#D4FF00]" />
              </div>
              <h4 className="text-sm font-black text-white">AI Agent (AUT)</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Connects LangChain, AutoGen, CrewAI, or LlamaIndex autonomous runtime.
              </p>
            </div>

            {/* Step 2: Agent DNA */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-[#D4FF00]/60 transition-all space-y-3 relative group">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-purple-400 font-bold">02. DISCOVERY</span>
                <span className="text-slate-500">Static Scan</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Dna className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white">Agent DNA Scanner</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Extracts OpenAPI schemas, destructive tool capabilities, and permissions.
              </p>
            </div>

            {/* Step 3: Digital Twin */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-[#D4FF00]/60 transition-all space-y-3 relative group">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-400 font-bold">03. ISOLATION</span>
                <span className="text-slate-500">Ephemeral</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white">Stateful Digital Twin</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Mocks ledgers, databases, and APIs with chaos fault injection capabilities.
              </p>
            </div>

            {/* Step 4: Semantic Fuzzer */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-[#D4FF00]/60 transition-all space-y-3 relative group">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-orange-400 font-bold">04. FUZZING</span>
                <span className="text-slate-500">Multi-Turn</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white">Semantic State Fuzzer</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Executes multi-step jailbreaks, boundary tampering, and parameter attacks.
              </p>
            </div>

            {/* Step 5: Execution Engine */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-[#D4FF00]/60 transition-all space-y-3 relative group">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-amber-400 font-bold">05. EXECUTION</span>
                <span className="text-slate-500">Trace Logs</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white">Execution Engine</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Captures end-to-end token latency, tool invocations, and state mutations.
              </p>
            </div>

            {/* Step 6: Dual Evaluation Layers (Wide) */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-[#D4FF00]/40 space-y-3 relative group md:col-span-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#D4FF00] font-bold">06. 3-TIER MUTUAL EVALUATION</span>
                <span className="text-emerald-400 font-bold">0-Bias Consensus</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1 font-mono text-[10px]">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-white font-bold block">1. Deterministic Rules</span>
                  <span className="text-slate-400 text-[10px]">Schema & Policy Invariants (0ms)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[#D4FF00] font-bold block">2. Multi-LLM Guard</span>
                  <span className="text-slate-400 text-[10px]">3-Judge Cross-Model Consensus</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                Combines millisecond invariant schemas with multi-model consensus to guarantee zero evaluator hallucination.
              </p>
            </div>

            {/* Step 7: Risk & DAG */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-[#D4FF00]/60 transition-all space-y-3 relative group">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-red-400 font-bold">07. CAUSAL GRAPH</span>
                <span className="text-slate-500">DAG Tree</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400">
                <GitBranch className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-white">Risk & Causal DAG</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Compiles multi-variable 0-100 risk score and visualizes breach reasoning graph.
              </p>
            </div>

            {/* Step 8: Auto-Remediation & Regression Loop */}
            <div className="bg-gradient-to-br from-black to-slate-900 rounded-2xl p-5 border-2 border-[#D4FF00] shadow-lg space-y-3 relative group lg:col-span-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D4FF00] flex items-center justify-center text-black flex-shrink-0 shadow-md">
                  <GitPullRequest className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#D4FF00] text-black">
                      08. CONTINUOUS CLOSING LOOP
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">Automated Self-Healing</span>
                  </div>
                  <h4 className="text-base font-black text-white mt-0.5">
                    Auto-Remediation GitHub PR + Invariant Regression Test
                  </h4>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    Dispatches hardened system prompts and schema validation patches directly to your GitHub repository.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/remediation')}
                className="bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-extrabold text-xs px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2 flex-shrink-0"
              >
                <span>View Remediation Diffs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>

        {/* ==========================================
            ENTERPRISE VALUE & DIFFERENTIATOR
        ========================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enterprise Sectors */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 shadow-sm card-soft-3d space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                ENTERPRISE VERTICALS
              </span>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                SOC 2 • HIPAA • PCI-DSS
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">Built for AI That Takes Autonomous Action</h3>
            
            <div className="grid grid-cols-2 gap-3 font-sans text-xs pt-2">
              <div className="p-3.5 rounded-2xl bg-[#F8F8F6] border border-slate-200 hover:border-black transition-colors">
                <strong className="text-slate-900 block text-sm">💳 Finance & Banking</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">Payment, wire & billing copilot invariant protections</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8F8F6] border border-slate-200 hover:border-black transition-colors">
                <strong className="text-slate-900 block text-sm">🏥 Healthcare & EHR</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">Clinical triage & HIPAA dosage exfiltration barriers</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8F8F6] border border-slate-200 hover:border-black transition-colors">
                <strong className="text-slate-900 block text-sm">☁️ DevOps & Cloud</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">Kubernetes shell & IAM privilege escalation bounds</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8F8F6] border border-slate-200 hover:border-black transition-colors">
                <strong className="text-slate-900 block text-sm">🎧 Customer Support</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">API token exfiltration & prompt injection immunity</p>
              </div>
            </div>
          </div>

          {/* Differentiator */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 shadow-sm card-soft-3d space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                KEY DIFFERENTIATOR
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Most AI Tools Test Responses. TrustForge Tests Decisions.
              </h3>
              
              <div className="space-y-2.5 text-xs font-mono pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Traditional Testing:</span>
                  <code>Prompt ⟶ Text Response ⟶ String Match</code>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#111111] text-white border border-slate-800 shadow-md">
                  <span className="text-[10px] text-[#D4FF00] font-bold uppercase block">TrustForge Autonomous Testing:</span>
                  <code>Prompt ⟶ Reasoning ⟶ Tool Invocation ⟶ State Mutation ⟶ Invariant Risk Check ⟶ Auto-Patch</code>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-emerald-200 text-xs font-bold text-emerald-900">
              "We don't just test what an agent says. We test what an agent can do."
            </div>
          </div>
        </section>

        {/* ==========================================
            FINAL CALL TO ACTION
        ========================================== */}
        <section className="bg-black text-white rounded-[2.5rem] p-10 sm:p-16 shadow-2xl text-center relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4FF00]/15 blur-[120px] pointer-events-none rounded-full"></div>

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-widest">
              FORGE TRUST BEFORE PRODUCTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Before You Trust Your AI Agent, Try to Break It.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Your AI agent is already making decisions. Your security team should know what happens when those decisions are manipulated.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 relative z-10">
            <button
              onClick={() => navigate('/agents')}
              className="bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-extrabold text-xs px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Start Your First Security Scan</span>
            </button>

            <button
              onClick={() => navigate('/soc')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-mono font-semibold text-xs px-8 py-4 rounded-full border border-slate-700 shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              <span>Explore Platform SOC →</span>
            </button>
          </div>
        </section>

        {/* ==========================================
            FOOTER
        ========================================== */}
        <footer className="py-8 px-6 bg-white rounded-3xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-sans shadow-sm">
          <div className="flex items-center gap-3">
            <Logo size="sm" showWordmark={true} />
            <span className="text-slate-400 ml-1 font-mono text-[11px] hidden sm:inline">• Forge Trust. Break Weaknesses. Secure AI.</span>
          </div>

          <div className="text-center sm:text-right font-mono text-[11px] text-slate-500">
            AI Agent Security • Red Teaming • Evaluation • Continuous Validation <br />
            © 2026 TrustForge. All rights reserved.
          </div>
        </footer>

      </div>
    </div>
  );
};
