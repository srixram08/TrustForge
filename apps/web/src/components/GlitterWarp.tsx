import React, { useEffect, useRef } from 'react';

interface GlitterWarpProps {
  particleCount?: number;
  speed?: number;
  warpIntensity?: number;
  glitterRate?: number;
  particleColor?: string;
  glitterColors?: string[];
  className?: string;
  interactive?: boolean;
}

export const GlitterWarp: React.FC<GlitterWarpProps> = ({
  particleCount = 550,
  speed = 1.2,
  warpIntensity = 1.8,
  glitterRate = 0.05,
  particleColor = '#D4FF00',
  glitterColors = ['#D4FF00', '#FFFFFF', '#00F0FF', '#FFDF00', '#A3E635'],
  className = '',
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      targetMouseX = (e.clientX - width / 2) * 0.0008;
      targetMouseY = (e.clientY - height / 2) * 0.0008;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize 3D Warp Stars & Glitter Particles
    interface Star {
      x: number;
      y: number;
      z: number;
      prevZ: number;
      size: number;
      color: string;
      glitter: boolean;
      glitterPhase: number;
      glitterSpeed: number;
      sparkleIntensity: number;
    }

    const stars: Star[] = [];
    const depth = 1600;

    for (let i = 0; i < particleCount; i++) {
      const isGlitter = Math.random() < 0.35;
      stars.push({
        x: (Math.random() - 0.5) * width * 3,
        y: (Math.random() - 0.5) * height * 3,
        z: Math.random() * depth,
        prevZ: depth,
        size: Math.random() * 2.2 + 0.6,
        color: isGlitter ? glitterColors[Math.floor(Math.random() * glitterColors.length)] : particleColor,
        glitter: isGlitter,
        glitterPhase: Math.random() * Math.PI * 2,
        glitterSpeed: Math.random() * 0.08 + 0.04,
        sparkleIntensity: Math.random() * 0.8 + 0.2
      });
    }

    const render = () => {
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Deep spatial fade trail
      ctx.fillStyle = 'rgba(232, 231, 227, 0.28)'; // Soft luxury background matching #E8E7E3
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.prevZ = star.z;
        star.z -= speed * 4.5 * warpIntensity;

        // Reset star when it flies past camera
        if (star.z <= 1) {
          star.z = depth;
          star.prevZ = depth;
          star.x = (Math.random() - 0.5) * width * 3;
          star.y = (Math.random() - 0.5) * height * 3;
        }

        // 3D Perspective Projection
        const k = 320 / star.z;
        const px = star.x * k + cx + mouseX * star.z * 0.2;
        const py = star.y * k + cy + mouseY * star.z * 0.2;

        const prevK = 320 / star.prevZ;
        const prevPx = star.x * prevK + cx + mouseX * star.prevZ * 0.2;
        const prevPy = star.y * prevK + cy + mouseY * star.prevZ * 0.2;

        // Skip if outside canvas
        if (px < -100 || px > width + 100 || py < -100 || py > height + 100) continue;

        // Glitter sparkle calculation
        star.glitterPhase += star.glitterSpeed;
        const sparkle = star.glitter ? (Math.sin(star.glitterPhase) * 0.5 + 0.5) * star.sparkleIntensity : 0.4;
        const alpha = Math.min(1, Math.max(0.1, (1 - star.z / depth) * (0.8 + sparkle * 0.6)));
        const starSize = Math.max(0.6, (1 - star.z / depth) * star.size * (1 + sparkle * 0.8));

        // 1. Warp Streak Line (Starfield Tunnel Trail)
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = star.color;
        ctx.globalAlpha = alpha * 0.75;
        ctx.lineWidth = starSize * 0.9;
        ctx.lineCap = 'round';
        ctx.stroke();

        // 2. Glittering Diamond Sparkle Core
        ctx.beginPath();
        ctx.arc(px, py, starSize, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // 3. Extra Cross Sparkle Flare for Glitter Star Burst
        if (star.glitter && sparkle > 0.65 && star.z < depth * 0.5) {
          const flareLen = starSize * 3.2;
          ctx.beginPath();
          ctx.moveTo(px - flareLen, py);
          ctx.lineTo(px + flareLen, py);
          ctx.moveTo(px, py - flareLen);
          ctx.lineTo(px, py + flareLen);
          ctx.strokeStyle = '#FFFFFF';
          ctx.globalAlpha = alpha * 0.85;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, speed, warpIntensity, glitterRate, particleColor, glitterColors, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
};
