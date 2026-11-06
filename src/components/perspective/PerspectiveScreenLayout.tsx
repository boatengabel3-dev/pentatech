import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PentatechLogo } from '../common/PentatechLogo';
import { useCMS } from '../../context/CMSContext';
import confetti from 'canvas-confetti';
import {
  Cpu,
  Layers,
  Sparkles,
  Send,
  CheckCircle2,
  Shield,
  Binary,
  Radio,
  Sliders,
  Terminal,
  Activity,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface PerspectiveScreenLayoutProps {
  onNavigate?: (path: string) => void;
  standalone?: boolean;
}

export const PerspectiveScreenLayout: React.FC<PerspectiveScreenLayoutProps> = ({
  onNavigate,
  standalone = false,
}) => {
  const { addToast, submitApplication } = useCMS();

  // Mouse tracking state for 3D Perspective container
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid perspective rotation
  const springConfig = { damping: 25, stiffness: 140 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Rotation ranges in degrees for perspective-1500
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  // Dynamic light glare gradient
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle 380px at ${gx} ${gy}, rgba(255, 200, 87, 0.16), transparent 70%)`
  );

  // Interactive Form State
  const [activeTrack, setActiveTrack] = useState('Artificial Intelligence & Edge ML');
  const [projectName, setProjectName] = useState('');
  const [architectName, setArchitectName] = useState('');
  const [nodeRegion, setNodeRegion] = useState('West Africa Node (Accra / Lagos)');
  const [computeQuota, setComputeQuota] = useState(75);
  const [projectAbstract, setProjectAbstract] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentSuccess, setDeploymentSuccess] = useState(false);

  const tracks = [
    { id: 'ai', label: 'AI & Edge ML', icon: Binary },
    { id: 'robotics', label: 'Autonomous Robotics', icon: Cpu },
    { id: 'energy', label: 'Clean Energy Grid', icon: Activity },
    { id: 'fintech', label: 'FinTech Protocol', icon: Shield },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !architectName.trim()) {
      addToast('Input Required', 'Please provide a Project Name and Lead Architect name.', 'error');
      return;
    }

    setIsDeploying(true);

    setTimeout(() => {
      setIsDeploying(false);
      setDeploymentSuccess(true);

      submitApplication({
        fullName: architectName,
        email: `${architectName.toLowerCase().replace(/\s+/g, '.')}@pentatech-fellows.org`,
        phone: '+233 20 000 0000',
        location: nodeRegion,
        primaryTrack: 'Software & AI Systems',
        yearsOfExperience: '3-5 Years',
        portfolioUrl: 'https://pentatech.org',
        motivation: `[3D Perspective Terminal Submission] Project: ${projectName} | Track: ${activeTrack} | Compute: ${computeQuota}TFLOPS | Abstract: ${projectAbstract}`,
      });

      addToast(
        'Terminal Dispatch Confirmed',
        `Project "${projectName}" registered to ${nodeRegion}.`
      );

      // Gold & electric blue celebratory confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFE09A', '#FFC857', '#D99A28', '#168BDA'],
      });
    }, 900);
  };

  const resetForm = () => {
    setDeploymentSuccess(false);
    setProjectName('');
    setProjectAbstract('');
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full ${
        standalone ? 'min-h-[85vh] py-12 sm:py-20' : 'py-10 sm:py-16'
      } flex items-center justify-center overflow-hidden perspective-1500`}
      style={{ perspective: 1500 }}
    >
      {/* Background Holographic Depth Elements */}
      <div className="absolute inset-0 bg-triangular-pattern opacity-25 pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-[#D99A28]/10 blur-[120px] pointer-events-none" />
      <div className="absolute right-10 bottom-10 w-72 h-72 rounded-full bg-[#168BDA]/10 blur-[100px] pointer-events-none" />

      {/* Main 3D Perspective Screen Wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 140 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Terminal Header Bar */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-[#090909]/80 backdrop-blur-xl border border-[#D99A28]/30 flex flex-wrap items-center justify-between gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center gap-3">
            <PentatechLogo variant="emblem" size="xs" glow />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-display font-bold text-white tracking-wide">
                  PENTATECH 3D PERSPECTIVE TERMINAL
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#D99A28]/20 text-[#FFC857] border border-[#FFC857]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#168BDA] animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-[10px] text-[#888] font-mono">
                Interactive mouse-reactive glassmorphic telemetry & project dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-[#888]">
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#FFC857]" />
              <span>PERSPECTIVE: 1500px</span>
            </span>
            <span className="px-2 py-1 rounded-lg bg-[#141414] border border-[#D99A28]/20 text-white font-semibold">
              3D MATRIX v4.2
            </span>
          </div>
        </div>

        {/* 3D Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Card 1: Track Selector & Node Telemetry (Left Column) */}
          <motion.div
            style={{
              transform: 'translateZ(45px)',
            }}
            className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#141414]/85 via-[#0e0e0e]/90 to-[#070707]/95 backdrop-blur-2xl border border-[#D99A28]/35 p-5 sm:p-7 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Dynamic Glare Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-3xl opacity-60"
              style={{ background: glareBackground }}
            />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between border-b border-[#D99A28]/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#D99A28]/20 text-[#FFC857]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Research Node Cluster
                    </h3>
                    <span className="text-[10px] font-mono text-[#888]">
                      Stage 01: Select Domain
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#FFC857]">01 / 03</span>
              </div>

              {/* Research Tracks */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#A5A5A5] block">
                  Select Engineering Pillar
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tracks.map((track) => {
                    const isSelected = activeTrack === track.label;
                    const IconComponent = track.icon;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => setActiveTrack(track.label)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#FFC857] text-black font-semibold border-[#FFE09A] shadow-[0_0_20px_rgba(255,200,87,0.3)]'
                            : 'bg-[#141414]/90 text-[#B0B0B0] hover:text-white hover:bg-[#1c1c1c] border-[#D99A28]/20'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 shrink-0" />
                        <span className="text-xs">{track.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Compute Allocation Slider */}
              <div className="space-y-2 pt-2 border-t border-[#D99A28]/15">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A5A5A5]">Compute Bandwidth</span>
                  <span className="text-[#FFC857] font-bold">{computeQuota} TFLOPS</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="200"
                  value={computeQuota}
                  onChange={(e) => setComputeQuota(Number(e.target.value))}
                  className="w-full accent-[#FFC857] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#666]">
                  <span>25 TFLOPS (Edge)</span>
                  <span>100 TFLOPS</span>
                  <span>200 TFLOPS (Cluster)</span>
                </div>
              </div>

              {/* Cluster Region Select */}
              <div className="space-y-1.5 pt-2 border-t border-[#D99A28]/15">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#A5A5A5] block">
                  Routing Cluster Node
                </label>
                <select
                  value={nodeRegion}
                  onChange={(e) => setNodeRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#D99A28]/30 text-xs text-white focus:outline-none focus:border-[#FFC857]"
                >
                  <option value="West Africa Node (Accra / Lagos)">
                    West Africa Node (Accra / Lagos)
                  </option>
                  <option value="East Africa Node (Nairobi / Kigali)">
                    East Africa Node (Nairobi / Kigali)
                  </option>
                  <option value="Southern Africa Node (Johannesburg / Cape Town)">
                    Southern Africa Node (Johannesburg / Cape Town)
                  </option>
                  <option value="North Africa Node (Cairo / Casablanca)">
                    North Africa Node (Cairo / Casablanca)
                  </option>
                </select>
              </div>

              {/* Telemetry Metric Tile */}
              <div className="p-3 rounded-xl bg-[#090909]/90 border border-[#D99A28]/25 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#888] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#168BDA]" />
                  <span>Sovereign Protocol:</span>
                </span>
                <span className="text-[#FFC857] font-bold">PT-SEC-2026 // OK</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Interactive Glassmorphic Input & Dispatch Card (Right Column) */}
          <motion.div
            style={{
              transform: 'translateZ(60px)',
            }}
            className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-[#141414]/90 via-[#0e0e0e]/95 to-[#070707]/95 backdrop-blur-2xl border border-[#D99A28]/40 p-5 sm:p-7 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
          >
            {/* Dynamic Specular Glare */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-3xl opacity-60"
              style={{ background: glareBackground }}
            />

            <div className="relative z-10">
              {deploymentSuccess ? (
                <div className="py-8 sm:py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-r from-[#D99A28] to-[#FFC857] p-0.5 flex items-center justify-center">
                    <div className="w-full h-full bg-[#090909] rounded-2xl flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-[#FFC857]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Proposal Successfully Teleported
                  </h3>
                  <p className="text-xs text-[#B0B0B0] max-w-md mx-auto leading-relaxed">
                    Your architecture package <span className="text-[#FFC857] font-semibold">"{projectName}"</span> has been encrypted and submitted to the Pentatech Engineering Registry for review.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#090909] border border-[#D99A28]/30 max-w-sm mx-auto text-left font-mono text-[11px] space-y-1.5">
                    <div className="flex justify-between text-[#888]">
                      <span>Architect:</span>
                      <span className="text-white font-semibold">{architectName}</span>
                    </div>
                    <div className="flex justify-between text-[#888]">
                      <span>Pillar:</span>
                      <span className="text-[#FFC857]">{activeTrack}</span>
                    </div>
                    <div className="flex justify-between text-[#888]">
                      <span>Node Cluster:</span>
                      <span className="text-white">{nodeRegion.split(' ')[0]}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={resetForm}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#FFC857] hover:bg-[#FFE09A] transition-all cursor-pointer"
                    >
                      Submit Another Prototype
                    </button>
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('/projects')}
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#141414] border border-[#D99A28]/30 hover:border-[#FFC857] transition-all cursor-pointer"
                      >
                        View Projects Archive
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDeploy} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#D99A28]/20 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-[#168BDA]/20 text-[#168BDA]">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                          Project Specification & Blueprint
                        </h3>
                        <span className="text-[10px] font-mono text-[#888]">
                          Stage 02: Blueprint Parameters
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#FFC857]">02 / 03</span>
                  </div>

                  {/* Input 1: Project Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#A5A5A5] flex items-center justify-between">
                      <span>Project / Prototype Name *</span>
                      <span className="text-[10px] text-[#FFC857]">Required</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="e.g. Afriversity AI, AgriTrust, or SolarEdge..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414]/90 border border-[#D99A28]/30 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#FFC857] focus:ring-1 focus:ring-[#FFC857] transition-all"
                    />
                  </div>

                  {/* Input 2: Architect Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#A5A5A5] flex items-center justify-between">
                      <span>Lead Architect / Innovator *</span>
                      <span className="text-[10px] text-[#FFC857]">Required</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={architectName}
                      onChange={(e) => setArchitectName(e.target.value)}
                      placeholder="e.g. Kwame Mensah, Amara Okafor..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414]/90 border border-[#D99A28]/30 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#FFC857] focus:ring-1 focus:ring-[#FFC857] transition-all"
                    />
                  </div>

                  {/* Input 3: Abstract */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#A5A5A5] flex items-center justify-between">
                      <span>Architecture Abstract & Target Impact</span>
                      <span className="text-[10px] text-[#888] font-mono">Optional</span>
                    </label>
                    <textarea
                      rows={3}
                      value={projectAbstract}
                      onChange={(e) => setProjectAbstract(e.target.value)}
                      placeholder="Describe hardware schematic, neural architecture, or socioeconomic target..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414]/90 border border-[#D99A28]/30 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#FFC857] focus:ring-1 focus:ring-[#FFC857] transition-all resize-none"
                    />
                  </div>

                  {/* Interactive Submit Button with 3D elevation */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isDeploying}
                      className="w-full min-h-[48px] py-3.5 px-6 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#FFE09A] via-[#FFC857] to-[#D99A28] hover:shadow-[0_0_30px_rgba(255,200,87,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50"
                    >
                      {isDeploying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Routing Quantum Telemetry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Architecture to Pentatech Registry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
