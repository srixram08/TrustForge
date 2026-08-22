import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { Agents } from './pages/Agents';
import { AgentDNA } from './pages/AgentDNA';
import { DigitalTwins } from './pages/DigitalTwins';
import { AttackLab } from './pages/AttackLab';
import { TestSuites } from './pages/TestSuites';
import { Executions } from './pages/Executions';
import { FailureGraph } from './pages/FailureGraph';
import { Evaluations } from './pages/Evaluations';
import { Remediation } from './pages/Remediation';
import { Integrations } from './pages/Integrations';
import { Settings } from './pages/Settings';
import { GlitterWarp } from './components/GlitterWarp';
import { PixelMagnet } from './components/PixelMagnet';
import { CyberCursor } from './components/CyberCursor';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isLogin = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-[#E8E7E3] text-slate-900 selection:bg-[#D4FF00] selection:text-black relative overflow-x-hidden">
      {/* 1. Global Interactive Cybernetic Precision Cursor Trail */}
      <CyberCursor />

      {/* 2. Global Starfield Glitter Warp Tunnel */}
      <GlitterWarp 
        particleCount={550} 
        speed={0.9} 
        warpIntensity={1.4} 
        particleColor="#D4FF00" 
        glitterColors={['#D4FF00', '#111111', '#00F0FF', '#FFFFFF', '#A3E635']}
        className="opacity-45"
      />

      {/* 3. Global Interactive Pixel Magnet Grid (attracts to cursor anywhere) */}
      <PixelMagnet 
        pixelSize={3.5}
        gap={28}
        magnetRadius={150}
        magnetStrength={0.5}
        pixelColor="rgba(17, 17, 17, 0.09)"
        activeColor="#D4FF00"
        className="z-0"
      />

      {/* 4. Page Layout Structure */}
      {isLanding ? (
        <div className="relative z-10">
          <LandingPage />
        </div>
      ) : isLogin ? (
        <div className="relative z-10">
          <LoginPage />
        </div>
      ) : (
        <div className="flex min-h-screen relative z-10">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-transparent">
            <Routes>
              <Route path="/soc" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/dna" element={<AgentDNA />} />
              <Route path="/twins" element={<DigitalTwins />} />
              <Route path="/attack-lab" element={<AttackLab />} />
              <Route path="/test-suites" element={<TestSuites />} />
              <Route path="/executions" element={<Executions />} />
              <Route path="/graph" element={<FailureGraph />} />
              <Route path="/evaluations" element={<Evaluations />} />
              <Route path="/remediation" element={<Remediation />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
