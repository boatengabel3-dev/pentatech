import React, { useEffect, useRef, useState } from 'react';
import { PentatechLogo } from '../common/PentatechLogo';
import { X, Play, RotateCcw, Sparkles } from 'lucide-react';

export interface LogoAnimationProps {
  isPlaying: boolean;
  onComplete: () => void;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
  alpha: number;
  color: string;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
}

interface RingNode {
  x: number;
  y: number;
  angle: number;
  color: string;
}

export const LogoAnimation: React.FC<LogoAnimationProps> = ({
  isPlaying,
  onComplete,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<'particles' | 'geometry' | 'reveal' | 'finished'>('particles');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      setPhase('finished');
      return;
    }

    setPhase('particles');
    setProgress(0);

    const startTime = Date.now();
    const duration = 4400; // 4.4 seconds total sequence

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProg = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProg);

      if (elapsed > 1100 && elapsed <= 2500) {
        setPhase('geometry');
      } else if (elapsed > 2500 && elapsed <= 4000) {
        setPhase('reveal');
      } else if (elapsed > 4000) {
        setPhase('finished');
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 350);
      }
    }, 35);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, onComplete]);

  // High performance Canvas Particle & 3D Geometric Structure Animation
  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2 - 25;

    // 5 Pentagonal Symmetry Centers representing the official Pentatech logo geometry
    const pentagonRadius = Math.min(width, height) * 0.165;
    const pentagonNodes: RingNode[] = [];

    for (let i = 0; i < 5; i++) {
      const angle = (i * (Math.PI * 2)) / 5 - Math.PI / 2;
      pentagonNodes.push({
        x: centerX + Math.cos(angle) * pentagonRadius,
        y: centerY + Math.sin(angle) * pentagonRadius,
        angle,
        color: i === 3 ? '#B52B20' : i === 4 ? '#168BDA' : '#FFC857',
      });
    }

    // 160 Converging and Orbiting Golden Particles
    const particlesCount = 160;
    const particles: Particle[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const nodeIndex = i % 5;
      const targetNode = pentagonNodes[nodeIndex];
      const isRedAccent = i % 17 === 0;
      const isBlueAccent = i % 13 === 0;

      let pColor = '#FFC857';
      if (isRedAccent) pColor = '#B52B20';
      else if (isBlueAccent) pColor = '#168BDA';
      else if (i % 3 === 0) pColor = '#D99A28';
      else if (i % 5 === 0) pColor = '#FFE09A';

      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (Math.max(width, height) * 0.55) + 140;

      particles.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        targetX: targetNode.x,
        targetY: targetNode.y,
        radius: Math.random() * 2.4 + 1,
        alpha: Math.random() * 0.8 + 0.2,
        color: pColor,
        orbitAngle: angle,
        orbitRadius: Math.random() * 65 + 15,
        orbitSpeed: (Math.random() - 0.5) * 0.045,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Deep obsidian void with soft golden center glow
      const radialGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        15,
        centerX,
        centerY,
        Math.max(width, height) * 0.65
      );
      radialGrad.addColorStop(0, 'rgba(217, 154, 40, 0.14)');
      radialGrad.addColorStop(0.5, 'rgba(9, 9, 9, 0.85)');
      radialGrad.addColorStop(1, 'rgba(5, 5, 5, 0.98)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Phase 1 & 2: Draw Interconnected Geometric Lines between nodes
      if (frame > 20) {
        const lineAlpha = Math.min((frame - 20) / 50, 0.65);
        ctx.lineWidth = 1.2;

        // Outer pentagonal perimeter
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const n1 = pentagonNodes[i];
          const n2 = pentagonNodes[(i + 1) % 5];
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
        }
        ctx.strokeStyle = `rgba(217, 154, 40, ${lineAlpha})`;
        ctx.stroke();

        // Inner triangular cross-connections (African geometric lattice)
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const n1 = pentagonNodes[i];
          const n2 = pentagonNodes[(i + 2) % 5];
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
        }
        ctx.strokeStyle = `rgba(255, 200, 87, ${lineAlpha * 0.75})`;
        ctx.stroke();

        // Radial hub spokes
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const n = pentagonNodes[i];
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(n.x, n.y);
        }
        ctx.strokeStyle = `rgba(217, 154, 40, ${lineAlpha * 0.35})`;
        ctx.stroke();
      }

      // Draw 5 Isometric Hexagonal Node Structures with African Triangular Facets
      if (frame > 35) {
        const hexSize = Math.min(width, height) * 0.052;
        const hexAlpha = Math.min((frame - 35) / 45, 0.85);

        for (let i = 0; i < 5; i++) {
          const node = pentagonNodes[i];
          ctx.save();
          ctx.translate(node.x, node.y);

          // Subtle organic pulse
          const pulse = Math.sin(frame * 0.05 + i) * 0.12 + 1;
          ctx.scale(pulse, pulse);

          // Isometric Hexagon
          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const hAngle = (s * Math.PI) / 3;
            const hx = Math.cos(hAngle) * hexSize;
            const hy = Math.sin(hAngle) * hexSize;
            if (s === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(255, 200, 87, ${hexAlpha})`;
          ctx.lineWidth = 1.8;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 12;
          ctx.stroke();

          // Internal triangular facets
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(0) * hexSize, Math.sin(0) * hexSize);
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos((2 * Math.PI) / 3) * hexSize, Math.sin((2 * Math.PI) / 3) * hexSize);
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos((4 * Math.PI) / 3) * hexSize, Math.sin((4 * Math.PI) / 3) * hexSize);
          ctx.strokeStyle = `rgba(217, 154, 40, ${hexAlpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Accent Node Core
          ctx.beginPath();
          ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();

          ctx.restore();
        }
      }

      // Golden Particles Convergence & Orbit
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (frame < 75) {
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          p.x += dx * 0.05;
          p.y += dy * 0.05;
        } else {
          p.orbitAngle += p.orbitSpeed;
          p.x = p.targetX + Math.cos(p.orbitAngle) * p.orbitRadius;
          p.y = p.targetY + Math.sin(p.orbitAngle) * p.orbitRadius;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // Expanding Shockwave Wavefront
      if (frame > 90 && frame < 145) {
        const shockRadius = (frame - 90) * 8.5;
        const shockAlpha = Math.max(0, 1 - (frame - 90) / 55);
        ctx.beginPath();
        ctx.arc(centerX, centerY, shockRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 200, 87, ${shockAlpha * 0.75})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#FFC857';
        ctx.shadowBlur = 18;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  if (!isPlaying && phase === 'finished') {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#050505] transition-opacity duration-700 select-none ${
        phase === 'finished' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${className}`}
    >
      {/* 3D Canvas Background with particles and geometric structures */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top Bar Controls */}
      <div className="absolute top-3 sm:top-6 left-3 sm:left-6 right-3 sm:right-6 z-20 flex items-center justify-between text-xs font-mono text-[#A5A5A5]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FFC857] animate-pulse shrink-0" />
          <span className="uppercase tracking-[0.18em] text-[#FFC857] text-[10px] sm:text-xs truncate max-w-[200px] sm:max-w-none">
            Brand Sequence
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[11px] text-[#666] hidden md:inline">
            Press [ESC] to bypass
          </span>
          <button
            onClick={onComplete}
            className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-[#111111]/85 hover:bg-[#1a1a1a] border border-[#D99A28]/35 text-[#FFC857] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md text-[11px] sm:text-xs"
          >
            <span>Skip Intro</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Central Official Logo Manifestation Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 sm:p-6 max-w-xl w-full">
        <div
          className={`transform transition-all duration-1000 ${
            phase === 'particles'
              ? 'scale-50 opacity-0 blur-md'
              : phase === 'geometry'
              ? 'scale-90 opacity-60 blur-sm'
              : 'scale-100 opacity-100 blur-0 drop-shadow-[0_0_40px_rgba(217,154,40,0.65)]'
          }`}
        >
          <PentatechLogo variant="emblem" size="xl" glow className="sm:hidden" />
          <PentatechLogo variant="emblem" size="hero" glow className="hidden sm:inline-flex" />
        </div>

        {/* Wordmark and Tagline Reveal */}
        <div
          className={`mt-4 sm:mt-6 space-y-2 transform transition-all duration-700 delay-200 ${
            phase === 'reveal' || phase === 'finished'
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="w-5 sm:w-8 h-[1px] bg-[#D99A28]" />
            <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#D99A28]">
              AFRICAN TECHNOLOGY COLLECTIVE
            </span>
            <span className="w-5 sm:w-8 h-[1px] bg-[#D99A28]" />
          </div>

          <h1 className="text-2xl sm:text-5xl font-display font-black tracking-wider sm:tracking-widest text-white gold-gradient-text">
            TEAM PENTATECH
          </h1>

          <p className="text-xs sm:text-base font-display tracking-[0.2em] sm:tracking-[0.25em] text-[#FFE09A] font-semibold uppercase">
            Building Tomorrow, Today.
          </p>
        </div>

        {/* Progress Timeline bar */}
        <div className="absolute -bottom-10 sm:-bottom-16 left-1/2 -translate-x-1/2 w-36 sm:w-48 h-1 bg-[#171717] rounded-full overflow-hidden border border-[#D99A28]/30">
          <div
            className="h-full bg-gradient-to-r from-[#D99A28] via-[#FFC857] to-[#FFE09A] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 z-20 flex flex-col sm:flex-row items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#666] gap-1 text-center">
        <span>ACCRA · NAIROBI · LAGOS · KIGALI</span>
        <span className="text-[#FFC857]">SOVEREIGN R&D · HARDWARE · AI</span>
      </div>
    </div>
  );
};
