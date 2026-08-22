import React from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  className?: string;
  glow?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
  glow = true
}) => {
  const sizeMap = {
    xs: { icon: 'w-6 h-6', text: 'text-sm' },
    sm: { icon: 'w-8 h-8', text: 'text-base' },
    md: { icon: 'w-10 h-10', text: 'text-lg' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl' },
    xl: { icon: 'w-20 h-20', text: 'text-4xl' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Cybernetic AI Neural Profile Emblem */}
      <div className={`relative ${currentSize.icon} rounded-2xl bg-[#111111] p-1 flex items-center justify-center border border-[#D4FF00]/40 shadow-sm overflow-hidden flex-shrink-0 ${glow ? 'shadow-[0_0_15px_rgba(212,255,0,0.25)]' : ''}`}>
        <img
          src="/trustforge_logo.png"
          alt="TrustForge Cybernetic AI Logo"
          className="w-full h-full object-contain rounded-xl"
        />
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight text-slate-900 font-sans ${currentSize.text}`}>
              TRUSTFORGE.
            </span>
            <span className="bg-[#D4FF00] text-black text-[8px] font-mono px-1 py-0.5 rounded font-black tracking-widest uppercase">
              AI
            </span>
          </div>
          {size !== 'xs' && (
            <span className="text-[9px] font-mono text-slate-400 font-bold tracking-widest uppercase mt-0.5">
              SINCE 2026
            </span>
          )}
        </div>
      )}
    </div>
  );
};
