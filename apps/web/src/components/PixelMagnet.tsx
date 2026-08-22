import React, { useEffect, useRef } from 'react';

interface PixelMagnetProps {
  pixelSize?: number;
  gap?: number;
  magnetRadius?: number;
  magnetStrength?: number;
  damping?: number;
  pixelColor?: string;
  activeColor?: string;
  className?: string;
  glow?: boolean;
}

export const PixelMagnet: React.FC<PixelMagnetProps> = ({
  pixelSize = 3.5,
  gap = 26,
  magnetRadius = 140,
  magnetStrength = 0.45,
  damping = 0.88,
  pixelColor = 'rgba(17, 17, 17, 0.12)',
  activeColor = '#D4FF00',
  className = '',
  glow = true
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

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let isHovering = false;

    interface Pixel {
      originX: number;
      originY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      targetAlpha: number;
    }

    let pixels: Pixel[] = [];

    const initPixels = () => {
      pixels = [];
      const cols = Math.floor(width / gap);
      const rows = Math.floor(height / gap);
      const offsetX = (width - cols * gap) / 2;
      const offsetY = (height - rows * gap) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * gap + gap / 2;
          const y = offsetY + j * gap + gap / 2;
          pixels.push({
            originX: x,
            originY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            size: pixelSize,
            alpha: 0.15,
            targetAlpha: 0.15
          });
        }
      }
    };

    initPixels();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initPixels();
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (isHovering) {
        mouseX += (targetMouseX - mouseX) * 0.18;
        mouseY += (targetMouseY - mouseY) * 0.18;
      } else {
        mouseX = -1000;
        mouseY = -1000;
      }

      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];

        // Calculate distance to cursor
        const dx = mouseX - p.originX;
        const dy = mouseY - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < magnetRadius && isHovering) {
          // Magnet attraction calculation
          const force = (1 - dist / magnetRadius) * magnetStrength;
          const targetX = p.originX + dx * force;
          const targetY = p.originY + dy * force;

          // Spring acceleration towards magnet pull
          p.vx += (targetX - p.x) * 0.22;
          p.vy += (targetY - p.y) * 0.22;
          p.targetAlpha = 0.95;
        } else {
          // Spring back to original grid position
          const returnForceX = (p.originX - p.x) * 0.12;
          const returnForceY = (p.originY - p.y) * 0.12;
          p.vx += returnForceX;
          p.vy += returnForceY;
          p.targetAlpha = 0.12;
        }

        // Apply damping
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;

        p.alpha += (p.targetAlpha - p.alpha) * 0.1;

        // Render Pixel Node
        const isMagnetized = dist < magnetRadius && isHovering;

        ctx.beginPath();
        const currentSize = isMagnetized ? p.size * 1.5 : p.size;
        
        // Draw round / square magnetic pixel
        ctx.arc(p.x, p.y, currentSize / 2, 0, Math.PI * 2);

        if (isMagnetized) {
          ctx.fillStyle = activeColor;
          ctx.globalAlpha = p.alpha;
          if (glow) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = activeColor;
          }
        } else {
          ctx.fillStyle = pixelColor;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pixelSize, gap, magnetRadius, magnetStrength, damping, pixelColor, activeColor, glow]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};
