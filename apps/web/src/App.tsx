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

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isLogin = location.pathname === '/login';

  if (isLanding) {
    return <LandingPage />;
  }

  if (isLogin) {
    return <LoginPage />;
  }

  return (
    <div className="flex min-h-screen bg-[#E8E7E3] text-slate-900 selection:bg-[#D4FF00] selection:text-black relative overflow-x-hidden">
      {/* Global Background Effects: Glitter Warp + Pixel Magnet Cursor Trail */}
      <GlitterWarp 
        particleCount={450} 
        speed={0.8} 
        warpIntensity={1.3} 
        particleColor="#D4FF00" 
        glitterColors={['#D4FF00', '#111111', '#00F0FF', '#FFFFFF', '#A3E635']}
        className="opacity-40"
      />

      <PixelMagnet 
        pixelSize={3.5}
        gap={28}
        magnetRadius={150}
        magnetStrength={0.5}
        pixelColor="rgba(17, 17, 17, 0.08)"
        activeColor="#D4FF00"
        className="z-0"
      />

      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative z-10">
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
