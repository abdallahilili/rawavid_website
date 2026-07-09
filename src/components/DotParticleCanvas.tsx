import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

interface Props {
  particleColor?: string;
  excludeId?: string;
}

export default function DotParticleCanvas({ particleColor = '255, 130, 92', excludeId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const createParticles = useCallback((x: number, y: number) => {
    const count = 20;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
      const speed = 1.5 + Math.random() * 5.5;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        alpha: 0.9 + Math.random() * 0.1,
        size: 2.5 + Math.random() * 4,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.02);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.vx *= 0.97;
        p.alpha *= 0.93;
        p.size *= 0.97;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(p.size, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
        ctx.fill();
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleClick = (e: MouseEvent) => {
      if (excludeId) {
        const excluded = document.getElementById(excludeId);
        if (excluded && excluded.contains(e.target as Node)) return;
      }
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        createParticles(x, y);
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [particleColor, createParticles, excludeId]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: excludeId ? 'fixed' : 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        zIndex: excludeId ? 9999 : 2,
      }}
    />
  );
}
