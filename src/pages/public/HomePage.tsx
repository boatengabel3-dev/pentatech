import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { PentatechLogo } from '../../components/common/PentatechLogo';
import { HeroCanvas } from '../../components/common/HeroCanvas';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { ProjectDetailModal } from '../../components/cards/ProjectDetailModal';
import { PerspectiveScreenLayout } from '../../components/perspective/PerspectiveScreenLayout';
import { RevealSection } from '../../components/common/RevealSection';
import { Project } from '../../types';
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Zap,
  ShieldCheck,
  Binary,
  Compass,
  Calendar,
  MapPin,
  Trophy,
  Users,
  Award,
  ExternalLink,
  ChevronRight,
  Code,
  Coins,
  Sprout,
  GraduationCap,
  Microscope,
  Medal,
  Sparkles,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { settings, projects, innovationCategories, achievements, events, partners } = useCMS();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const hero = settings.homepageHero;
  const visibility = settings.sectionsVisibility;

  const featuredProjects = projects.filter((p) => p.isFeatured);
  const activeEvents = events.slice(0, 3);
  const activeAchievements = achievements.slice(0, 3);

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Binary': return Binary;
      case 'Code': return Code;
      case 'Coins': return Coins;
      case 'Sprout': return Sprout;
      case 'GraduationCap': return GraduationCap;
      case 'Zap': return Zap;
      case 'Microscope': return Microscope;
      case 'Cpu':
      default: return Cpu;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* =========================================================================
          HERO SECTION (Redesigned for seamless mobile and desktop experience)
          ========================================================================= */}
      <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#D99A28]/20 bg-[#050505]">
        {/* Dynamic Canvas Background */}
        <HeroCanvas />

        {/* Architectural Image Backdrop with rich scrim */}
        <div className="absolute inset-0 pointer-events-none opacity-20 sm:opacity-25 mix-blend-luminosity">
          <img
            src="/src/assets/images/hero_african_tech_hub_1793734785317.jpg"
            alt="Pentatech Campus"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-[#050505]" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 relative z-10 w-full text-center">
          <div className="space-y-5 sm:space-y-7 flex flex-col items-center">
            {/* Organization Beacon Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111111]/90 border border-[#D99A28]/40 backdrop-blur-md shadow-sm">
              <PentatechLogo variant="emblem" size="xs" />
              <span className="text-xs uppercase tracking-[0.22em] text-[#FFC857] font-semibold">
                Pan-African Deeptech Collective
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#168BDA] animate-pulse" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl text-balance">
              {hero.headline}{' '}
              <span className="gold-gradient-text block mt-1.5 sm:mt-2 drop-shadow-[0_4px_30px_rgba(217,154,40,0.35)]">
                {hero.highlightWord}
              </span>
            </h1>

            {/* Subheadline with high contrast */}
            <p className="text-base sm:text-xl text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed text-balance">
              {hero.subheadline}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate(hero.primaryCtaLink || '/projects')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase text-black bg-gradient-to-r from-[#FFE09A] via-[#FFC857] to-[#D99A28] hover:shadow-[0_0_35px_rgba(255,200,87,0.45)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{hero.primaryCtaText || 'Explore Projects'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/innovation')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase text-white bg-[#111111] hover:bg-[#1a1a1a] border border-[#D99A28]/40 hover:border-[#FFC857] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#FFC857]" />
                <span>Innovation Pillars</span>
              </button>
            </div>

            {/* Metrics Strip (§1.A Zero-Pill compliance) */}
            <div className="pt-6 sm:pt-10 border-t border-[#D99A28]/25 grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8 text-center font-mono w-full max-w-3xl">
              <div className="p-3 sm:p-0 rounded-xl bg-[#0e0e0e]/80 sm:bg-transparent border border-[#D99A28]/15 sm:border-0">
                <div className="text-[#FFC857] font-extrabold text-lg sm:text-2xl tabular-nums">1st Place</div>
                <div className="text-[10px] sm:text-xs text-[#94A3B8] uppercase tracking-wider mt-0.5">ALX Laurels</div>
              </div>
              <div className="p-3 sm:p-0 rounded-xl bg-[#0e0e0e]/80 sm:bg-transparent border border-[#D99A28]/15 sm:border-0">
                <div className="text-white font-extrabold text-lg sm:text-2xl tabular-nums">4+ Systems</div>
                <div className="text-[10px] sm:text-xs text-[#94A3B8] uppercase tracking-wider mt-0.5">Deployed</div>
              </div>
              <div className="p-3 sm:p-0 rounded-xl bg-[#0e0e0e]/80 sm:bg-transparent border border-[#D99A28]/15 sm:border-0">
                <div className="text-[#168BDA] font-extrabold text-lg sm:text-2xl tabular-nums">Pan-Africa</div>
                <div className="text-[10px] sm:text-xs text-[#94A3B8] uppercase tracking-wider mt-0.5">Connected Nodes</div>
              </div>
              <div className="hidden sm:block p-3 sm:p-0 rounded-xl bg-[#0e0e0e]/80 sm:bg-transparent border border-[#D99A28]/15 sm:border-0">
                <div className="text-emerald-400 font-extrabold text-lg sm:text-2xl tabular-nums">100%</div>
                <div className="text-[10px] sm:text-xs text-[#94A3B8] uppercase tracking-wider mt-0.5">Sovereign Core</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          1. INTRODUCTION SECTION
          ========================================================================= */}
      {visibility.introduction && (
        <RevealSection as="section" className="py-14 sm:py-24 bg-[#090909] border-b border-[#D99A28]/15 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-[#D99A28]/30 shadow-2xl">
                  <img
                    src="/src/assets/images/community_innovation_lab_1793734786218.jpg"
                    alt="Innovation Lab"
                    className="w-full h-64 sm:h-80 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl bg-black/85 backdrop-blur-md border border-[#D99A28]/30">
                    <p className="text-[10px] sm:text-xs font-mono text-[#FFC857] uppercase tracking-wider font-semibold">
                      Collaborative Fabrication Facility
                    </p>
                    <p className="text-xs text-white mt-1">
                      Makers and hardware engineers developing tomorrow's sovereign infrastructure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <SectionHeading
                  align="left"
                  badge="The Genesis"
                  title="African Technology with"
                  highlight="Global Ambition"
                  description="Team Pentatech was founded as an elite technological collective to unite Africa's foremost engineers, computational researchers, and hardware builders into an interconnected frontier of innovation."
                  className="mb-4 sm:mb-6"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
                  <div className="p-4 sm:p-5 rounded-xl bg-[#111111] border border-[#D99A28]/20">
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#FFC857]" />
                      Sovereign Engineering
                    </h4>
                    <p className="text-xs text-[#A5A5A5] leading-relaxed">
                      Building full-stack hardware and autonomous software tailored specifically for African resilience and global competitiveness.
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-[#111111] border border-[#D99A28]/20">
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#168BDA]" />
                      Borderless Fellowship
                    </h4>
                    <p className="text-xs text-[#A5A5A5] leading-relaxed">
                      Bridging universities, research laboratories, and industry titans across Ghana, Kenya, Nigeria, Rwanda, and the diaspora.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('/about')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#D99A28]/30 text-xs sm:text-sm font-semibold text-[#FFC857] hover:text-white transition-all cursor-pointer"
                  >
                    <span>Read Full Organizational Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      )}

      {/* =========================================================================
          2. OUR INNOVATION AREAS
          ========================================================================= */}
      {visibility.innovation && (
        <RevealSection as="section" className="py-14 sm:py-24 bg-[#050505] border-b border-[#D99A28]/15 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
              <SectionHeading
                align="left"
                badge="Frontier Domains"
                title="Our Strategic Pillars of"
                highlight="Technological Mastery"
                description="Our interdisciplinary research teams focus on high-impact deeptech domains that solve critical logistical, energetic, educational, and computational challenges."
                className="mb-0"
              />
              <button
                onClick={() => onNavigate('/innovation')}
                className="w-full md:w-auto justify-center px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#D99A28] text-white hover:text-black border border-[#D99A28]/30 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>View All Innovation Areas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {innovationCategories.slice(0, 8).map((cat, idx) => {
                const IconComponent = getCategoryIcon(cat.iconName);
                return (
                  <div
                    key={cat.id}
                    onClick={() => onNavigate('/innovation')}
                    className="group p-5 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25 hover:border-[#FFC857]/60 transition-all duration-300 hover:shadow-[0_10px_35px_-5px_rgba(217,154,40,0.2)] flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#171717] border border-[#D99A28]/35 flex items-center justify-center text-[#FFC857] group-hover:bg-[#D99A28] group-hover:text-black transition-all mb-4">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#D99A28] block mb-1">
                        Pillar 0{cat.order || idx + 1}
                      </span>
                      <h3 className="text-base font-display font-bold text-white group-hover:text-[#FFC857] transition-colors mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-[#A5A5A5] line-clamp-3 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#D99A28]/15 flex items-center justify-between text-xs text-[#FFC857]">
                      <span>Explore Research</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealSection>
      )}

      {/* =========================================================================
          3D PERSPECTIVE SCREEN & GLASSMORPHIC INPUT MATRIX
          ========================================================================= */}
      <RevealSection as="section" className="py-14 sm:py-24 bg-[#070707] border-b border-[#D99A28]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center sm:text-left">
          <SectionHeading
            badge="Interactive 3D Perspective Architecture"
            title="Sovereign Engineering &"
            highlight="Dispatch Terminal"
            description="Experience our high-fidelity, mouse-reactive 3D screen layout built with perspective-1500 and framer-motion. Configure telemetry parameters, allocate compute bandwidth, and dispatch project specifications directly."
          />
        </div>
        <PerspectiveScreenLayout onNavigate={onNavigate} />
      </RevealSection>

      {/* =========================================================================
          3. FEATURED PROJECTS
          ========================================================================= */}
      {visibility.projects && (
        <RevealSection as="section" className="py-14 sm:py-24 bg-[#090909] border-b border-[#D99A28]/15 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
              <SectionHeading
                align="left"
                badge="Featured Portfolio"
                title="Pioneering Flagship"
                highlight="Software & Hardware Deployments"
                description="Live platforms and advanced technologies designed, manufactured, and evaluated by Pentatech engineering units."
                className="mb-0"
              />

              <button
                onClick={() => onNavigate('/projects')}
                className="w-full md:w-auto justify-center px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#D99A28] text-white hover:text-black border border-[#D99A28]/30 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredProjects.slice(0, 4).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          </div>
        </RevealSection>
      )}

      {/* =========================================================================
          4. COMMUNITY SHOWCASE
          ========================================================================= */}
      {visibility.community && (
        <RevealSection as="section" className="py-14 sm:py-24 bg-[#050505] border-b border-[#D99A28]/15 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Collaborative Ecosystem"
              title="A Thriving Network of"
              highlight="Makers & Fellows"
              description="Empowering the next generation of African builders through hands-on hackathons, intensive hardware cohorts, and continuous peer mentorship."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-3 sm:space-y-4">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#FFC857] tabular-nums">
                  01
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">Maker Spaces & Hardware Hubs</h3>
                <p className="text-xs text-[#A5A5A5] leading-relaxed">
                  Physical prototyping labs equipped with PCB mills, 3D printers, laser cutters, and high-frequency RF testbenches accessible to active members.
                </p>
                <button
                  onClick={() => onNavigate('/community')}
                  className="text-xs font-semibold text-[#FFC857] flex items-center gap-1 hover:underline pt-2 cursor-pointer"
                >
                  Learn about lab access <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-3 sm:space-y-4">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#168BDA] tabular-nums">
                  02
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">Fellowship & Mentorship</h3>
                <p className="text-xs text-[#A5A5A5] leading-relaxed">
                  Structured technical mentorship pairing early-career fellows with senior staff engineers from global technology institutes and deeptech founders.
                </p>
                <button
                  onClick={() => onNavigate('/community')}
                  className="text-xs font-semibold text-[#168BDA] flex items-center gap-1 hover:underline pt-2 cursor-pointer"
                >
                  View mentorship pathways <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-3 sm:space-y-4">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#B52B20] tabular-nums">
                  03
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">Continental Sprints</h3>
                <p className="text-xs text-[#A5A5A5] leading-relaxed">
                  Fast-paced 72-hour engineering sprints tackling pressing regional problems in agricultural telemetry, renewable energy distribution, and logistics.
                </p>
                <button
                  onClick={() => onNavigate('/community')}
                  className="text-xs font-semibold text-[#B52B20] flex items-center gap-1 hover:underline pt-2 cursor-pointer"
                >
                  See upcoming hackathons <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </RevealSection>
      )}

      {/* =========================================================================
          5. ACHIEVEMENTS & RECOGNITION
          ========================================================================= */}
      {visibility.achievements && (
        <RevealSection as="section" className="py-14 sm:py-24 bg-[#090909] border-b border-[#D99A28]/15 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
              <SectionHeading
                align="left"
                badge="Competitive Accolades"
                title="Excellence Proven in the"
                highlight="Field & Global Arenas"
                description="Competitive victories and continental awards recognizing Team Pentatech for breakthroughs in sovereign artificial intelligence, software, and deeptech."
                className="mb-0"
              />

              <button
                onClick={() => onNavigate('/achievements')}
                className="w-full md:w-auto justify-center px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#D99A28] text-white hover:text-black border border-[#D99A28]/30 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>View Full Awards & Timeline</span>
                <Trophy className="w-4 h-4" />
              </button>
            </div>

            {/* Featured Competition Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* FIRST PLACE - ALX */}
              <div className="p-5 sm:p-10 rounded-2xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border-2 border-[#D99A28] shadow-[0_12px_45px_rgba(217,154,40,0.18)] flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFE09A] via-[#FFC857] to-[#D99A28] text-black font-bold text-xs uppercase tracking-wider">
                      <Trophy className="w-3.5 h-3.5" />
                      Gold 1st Place Badge
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FFC857] px-2 py-0.5 rounded bg-[#171717] border border-[#D99A28]/30">
                      ALX
                    </span>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-widest text-[#D99A28] block mb-1">
                    Recognition: 1st Place
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                    FIRST PLACE — ALX
                  </h3>
                  <div className="text-xs font-mono text-[#888] mb-4">
                    <span>Organisation: </span><strong className="text-white">ALX</strong>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed mb-6">
                    Awarded 1st Place in the prestigious ALX venture and engineering innovation showcase for outstanding technological execution and high-impact African product design.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D99A28]/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified 1st Place Winner
                  </span>
                  <button
                    onClick={() => onNavigate('/achievements')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Recognition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* FOURTH PLACE - PANAFRICA AI */}
              <div className="p-5 sm:p-10 rounded-2xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-[#168BDA]/50 hover:border-[#FFC857]/60 transition-all shadow-[0_12px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] border border-[#168BDA]/50 text-white font-bold text-xs uppercase tracking-wider">
                      <Medal className="w-3.5 h-3.5 text-[#168BDA]" />
                      Competition Finalist Badge
                    </span>
                    <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-[#171717] border border-[#168BDA]/30">
                      Year 2026
                    </span>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-widest text-[#168BDA] block mb-1">
                    Recognition: 4th Place
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                    FOURTH PLACE — PANAFRICA AI & INNOVATION CHALLENGE
                  </h3>
                  <div className="text-xs font-mono text-[#888] mb-4">
                    <span>Competition: </span><strong className="text-white">PanAfrica AI & Innovation Challenge</strong>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed mb-6">
                    Honored with 4th Place at the continental PanAfrica AI & Innovation Challenge 2026, recognized among elite technological initiatives across Africa for innovation in sovereign AI architectures.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#168BDA]/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Continental Finalist 2026
                  </span>
                  <button
                    onClick={() => onNavigate('/achievements')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#171717] hover:bg-[#D99A28] border border-[#D99A28]/40 hover:border-transparent text-white hover:text-black text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Recognition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      )}

      {/* =========================================================================
          6. UPCOMING EVENTS
          ========================================================================= */}
      {visibility.events && (
        <RevealSection as="section" className="py-14 sm:py-24 bg-[#050505] border-b border-[#D99A28]/15 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Calendar"
              title="Summits, Sprints &"
              highlight="Research Gatherings"
              description="Connect in person and digitally at our upcoming hackathons, technical symposiums, and engineering masterclasses."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              {activeEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="group rounded-2xl bg-[#111111] border border-[#D99A28]/25 overflow-hidden flex flex-col justify-between transition-all hover:border-[#FFC857]/50"
                >
                  <div className="relative aspect-[16/9] w-full bg-[#090909]">
                    <img
                      src={evt.bannerUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-[#FFC857] border border-[#D99A28]/30">
                      {evt.status}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#FFC857] mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{evt.date}</span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#FFC857] transition-colors mb-2">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-[#A5A5A5] line-clamp-2 leading-relaxed mb-4">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#D99A28]/15 flex items-center justify-between text-xs">
                      <span className="text-[#777] flex items-center gap-1 text-[11px] truncate max-w-[180px]">
                        <MapPin className="w-3 h-3 text-[#D99A28]" />
                        {evt.location}
                      </span>
                      <button
                        onClick={() => onNavigate('/join')}
                        className="text-[#FFC857] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        Register <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      )}

      {/* =========================================================================
          7. PARTNERSHIPS
          ========================================================================= */}
      {visibility.partnerships && (
        <RevealSection as="section" className="py-14 sm:py-20 bg-[#090909] border-b border-[#D99A28]/15 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FFC857] font-semibold">
                Collaborative Network
              </span>
              <h3 className="text-xl sm:text-3xl font-display font-bold text-white mt-2">
                Supported by Global Technology & Research Alliances
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="p-4 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/20 flex flex-col items-center justify-center text-center group hover:border-[#FFC857]/50 transition-all"
                >
                  <PentatechLogo variant="emblem" size="sm" className="mb-2 sm:mb-3 opacity-80 group-hover:opacity-100" />
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#FFC857] transition-colors">
                    {partner.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#D99A28] mt-1">
                    {partner.tier}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-10">
              <button
                onClick={() => onNavigate('/partnerships')}
                className="text-xs font-semibold text-[#A5A5A5] hover:text-[#FFC857] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Inquire About Strategic Institutional Partnerships</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </RevealSection>
      )}

      {/* =========================================================================
          8. MEMBERSHIP CTA BANNER
          ========================================================================= */}
      {visibility.ctaBanner && (
        <RevealSection as="section" className="py-14 sm:py-24 bg-[#050505] relative overflow-hidden">
          <div className="absolute inset-0 bg-triangular-pattern opacity-30 pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="p-6 sm:p-14 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#171717] to-[#111111] border border-[#D99A28]/40 text-center shadow-[0_20px_70px_rgba(217,154,40,0.15)] space-y-4 sm:space-y-6">
              <PentatechLogo variant="emblem" size="md" glow className="mx-auto" />

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-white text-balance leading-tight">
                Building Tomorrow,{' '}
                <span className="gold-gradient-text">Today.</span>
              </h2>

              <p className="text-xs sm:text-base text-[#A5A5A5] max-w-2xl mx-auto text-balance leading-relaxed">
                Join our continental collective of hardware creators, machine learning architects,
                and innovative researchers building the sovereign technological pillars of tomorrow.
              </p>

              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('/join')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase text-black bg-gradient-to-r from-[#FFE09A] via-[#FFC857] to-[#D99A28] hover:shadow-[0_0_30px_rgba(255,200,87,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Apply for Membership</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('/contact')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase text-white bg-[#111111] hover:bg-[#1a1a1a] border border-[#D99A28]/40 hover:border-[#FFC857] transition-all flex items-center justify-center cursor-pointer"
                >
                  <span>Contact Headquarters</span>
                </button>
              </div>
            </div>
          </div>
        </RevealSection>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
