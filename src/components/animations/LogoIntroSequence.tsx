import React, { useEffect, useRef, useState } from 'react';
import { PentatechLogo } from '../common/PentatechLogo';
import { X, Play, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface LogoIntroSequenceProps {
  isOpen: boolean;
  onComplete: () => void;
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
  converging: boolean;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
}

interface RingNode {
  x: number;
  y: number;
  angle: number;
  color: string;
  glow: number;
}

export const LogoIntroSequence: React.FC<LogoIntroSequenceProps> = ({
  isOpen,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<'particles' | 'geometry' | 'reveal' | 'finished'>('particles');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    setPhase('particles');
    setProgress(0);

    const startTime = Date.now();
    const duration = 4600; // 4.6 seconds total cinematic sequence

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProg = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProg);

      if (elapsed > 1200 && elapsed <= 2600) {
        setPhase('geometry');
      } else if (elapsed > 2600 && elapsed <= 4200) {
        setPhase('reveal');
      } else if (elapsed > 4200) {
        setPhase('finished');
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 40);

    // Escape key listener to skip
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
  }, [isOpen, onComplete]);

  // High performance Canvas Particle & 3D Geometric Structure Animation
  useEffect(() => {
    if (!isOpen) return;

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
    const centerY = height / 2 - 20;

    // 5 Pentagonal Symmetry Centers (mirroring the 5 rings of Team Pentatech emblem)
    const pentagonRadius = Math.min(width, height) * 0.17;
    const pentagonNodes: RingNode[] = [];
    const colors = ['#D99A28', '#FFC857', '#FFE09A', '#B52B20', '#168BDA'];

    for (let i = 0; i < 5; i++) {
      // Start top and rotate 72 degrees each
      const angle = (i * (Math.PI * 2)) / 5 - Math.PI / 2;
      pentagonNodes.push({
        x: centerX + Math.cos(angle) * pentagonRadius,
        y: centerY + Math.sin(angle) * pentagonRadius,
        angle,
        color: i === 3 ? '#B52B20' : i === 4 ? '#168BDA' : '#FFC857',
        glow: 0,
      });
    }

    // Particles array
    const particlesCount = 180;
    const particles: Particle[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const nodeIndex = i % 5;
      const targetNode = pentagonNodes[nodeIndex];
      const isRedAccent = i % 18 === 0;
      const isBlueAccent = i % 14 === 0;

      let pColor = '#FFC857';
      if (isRedAccent) pColor = '#B52B20';
      else if (isBlueAccent) pColor = '#168BDA';
      else if (i % 3 === 0) pColor = '#D99A28';
      else if (i % 5 === 0) pColor = '#FFE09A';

      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (Math.max(width, height) * 0.6) + 150;

      particles.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        targetX: targetNode.x,
        targetY: targetNode.y,
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.8 + 0.2,
        color: pColor,
        converging: true,
        orbitAngle: angle,
        orbitRadius: Math.random() * 70 + 20,
        orbitSpeed: (Math.random() - 0.5) * 0.05,
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
        20,
        centerX,
        centerY,
        Math.max(width, height) * 0.7
      );
      radialGrad.addColorStop(0, 'rgba(217, 154, 40, 0.12)');
      radialGrad.addColorStop(0.5, 'rgba(9, 9, 9, 0.8)');
      radialGrad.addColorStop(1, 'rgba(5, 5, 5, 1)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Phase 1 & 2: Draw Interconnected Geometric Lines between nodes
      if (frame > 25) {
        const lineAlpha = Math.min((frame - 25) / 60, 0.65);
        ctx.lineWidth = 1.2;

        // Draw outer pentagonal ring
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const n1 = pentagonNodes[i];
          const n2 = pentagonNodes[(i + 1) % 5];
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
        }
        ctx.strokeStyle = `rgba(217, 154, 40, ${lineAlpha})`;
        ctx.stroke();

        // Draw inner triangular interconnections (emblem geometry)
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const n1 = pentagonNodes[i];
          const n2 = pentagonNodes[(i + 2) % 5];
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
        }
        ctx.strokeStyle = `rgba(255, 200, 87, ${lineAlpha * 0.75})`;
        ctx.stroke();

        // Radiating spokes to center
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const n = pentagonNodes[i];
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(n.x, n.y);
        }
        ctx.strokeStyle = `rgba(217, 154, 40, ${lineAlpha * 0.35})`;
        ctx.stroke();
      }

      // Draw 5 Isometric Hexagonal Node Rings
      if (frame > 40) {
        const hexSize = Math.min(width, height) * 0.055;
        const hexAlpha = Math.min((frame - 40) / 50, 0.85);

        for (let i = 0; i < 5; i++) {
          const node = pentagonNodes[i];
          ctx.save();
          ctx.translate(node.x, node.y);

          // Subtle pulse
          const pulse = Math.sin(frame * 0.05 + i) * 0.15 + 1;
          ctx.scale(pulse, pulse);

          // Draw isometric hexagon
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
          ctx.lineWidth = 2;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 15;
          ctx.stroke();

          // African-inspired triangular facets inside the hexagon
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

          // Colored decorative core
          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();

          ctx.restore();
        }
      }

      // Update and draw Converging & Orbiting Golden Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (frame < 80) {
          // Converge towards targets
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          p.x += dx * 0.045;
          p.y += dy * 0.045;
        } else {
          // Orbit gently around their respective nodes
          p.orbitAngle += p.orbitSpeed;
          p.x = p.targetX + Math.cos(p.orbitAngle) * p.orbitRadius;
          p.y = p.targetY + Math.sin(p.orbitAngle) * p.orbitRadius;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // Phase 3: Golden Shockwave Ring expansion
      if (frame > 95 && frame < 150) {
        const shockRadius = (frame - 95) * 8;
        const shockAlpha = Math.max(0, 1 - (frame - 95) / 55);
        ctx.beginPath();
        ctx.arc(centerX, centerY, shockRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 200, 87, ${shockAlpha * 0.7})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = '#FFC857';
        ctx.shadowBlur = 20;
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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#050505] transition-opacity duration-700 select-none ${
        phase === 'finished' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Dynamic Canvas Background with Geometric Particles & Nodes */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top Bar Controls */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between text-xs font-mono text-[#A5A5A5]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FFC857] animate-pulse" />
          <span className="uppercase tracking-[0.2em] text-[#FFC857]">
            Brand Identity Experience
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[11px] text-[#666] hidden sm:inline">
            Press [ESC] to bypass
          </span>
          <button
            onClick={onComplete}
            className="px-3.5 py-1.5 rounded-lg bg-[#111111]/80 hover:bg-[#1a1a1a] border border-[#D99A28]/35 text-[#FFC857] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md"
          >
            <span>Skip Intro</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Central Official Logo Manifestation Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 max-w-xl">
        {/* Animated Official Emblem */}
        <div
          className={`transform transition-all duration-1000 ${
            phase === 'particles'
              ? 'scale-50 opacity-0 blur-md'
              : phase === 'geometry'
              ? 'scale-90 opacity-60 blur-sm'
              : 'scale-100 opacity-100 blur-0 drop-shadow-[0_0_40px_rgba(217,154,40,0.6)]'
          }`}
        >
          <PentatechLogo variant="emblem" size="hero" glow />
        </div>

        {/* Wordmark and Tagline Reveal */}
        <div
          className={`mt-6 space-y-3 transform transition-all duration-700 delay-300 ${
            phase === 'reveal' || phase === 'finished'
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-[#D99A28]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#D99A28]">
              AFRICAN TECHNOLOGY COLLECTIVE
            </span>
            <span className="w-8 h-[1px] bg-[#D99A28]" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-widest text-white gold-gradient-text">
            TEAM PENTATECH
          </h1>

          <p className="text-sm sm:text-base font-display tracking-[0.25em] text-[#FFE09A] font-semibold uppercase">
            Building Tomorrow, Today.
          </p>
        </div>

        {/* Progress Timeline bar */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#171717] rounded-full overflow-hidden border border-[#D99A28]/30">
          <div
            className="h-full bg-gradient-to-r from-[#D99A28] via-[#FFC857] to-[#FFE09A] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Decorative Bottom Triangles */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between text-[10px] font-mono text-[#666]">
        <span>ACCRA · NAIROBI · LAGOS · KIGALI</span>
        <span className="text-[#FFC857]">SOVEREIGN R&D · HARDWARE · AI</span>
      </div>
    </div>
  );
};
