import React, { useEffect, useRef, useState } from 'react';

export const CyberCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
        setIsHovered(!!isInteractive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const animateRing = () => {
      // Smooth lerp for outer magnetic halo ring
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(animateRing);
    };

    animId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Precision Center Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00] transition-opacity duration-150 ${
          isClicking ? 'scale-150 bg-white' : ''
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Fluid Magnetic Halo Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 rounded-full border border-[#D4FF00]/60 transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 bg-[#D4FF00]/15 border-[#D4FF00] shadow-[0_0_20px_rgba(212,255,0,0.4)] scale-110'
            : isClicking
            ? 'w-8 h-8 -ml-4 -mt-4 bg-[#D4FF00]/30 border-white scale-90'
            : 'w-10 h-10 shadow-[0_0_10px_rgba(212,255,0,0.2)]'
        }`}
        style={{ willChange: 'transform' }}
      >
        {isHovered && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-ping"></div>
        )}
      </div>
    </div>
  );
};
