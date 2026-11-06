import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { SectionHeading } from '../../components/common/SectionHeading';
import { PentatechLogo } from '../../components/common/PentatechLogo';
import { Shield, Target, Compass, Award, Users, Cpu, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { teamMembers, settings } = useCMS();

  const values = [
    {
      title: 'African Ingenuity',
      desc: 'Grounding high-tech innovation in real local constraints to build radically resilient systems that outperform conventional technology.',
      icon: Compass,
    },
    {
      title: 'Engineering Rigor',
      desc: 'Adhering to world-class aerospace, electrical, and computational standards across all prototyping and production lines.',
      icon: Cpu,
    },
    {
      title: 'Radical Collaboration',
      desc: 'Breaking geographical borders across the African continent to share open-source telemetry, schematics, and discoveries.',
      icon: Users,
    },
    {
      title: 'Technological Sovereignty',
      desc: 'Creating indigenous capacity in silicon prototyping, robotics, and energy storage so our continent commands its own technological destiny.',
      icon: Shield,
    },
  ];

  const milestones = [
    {
      year: '2023 [Placeholder]',
      title: 'Genesis of Pentatech Collective',
      desc: 'Founded by five robotics and computer engineering fellows seeking a unified African technology research institute.',
    },
    {
      year: '2024 [Placeholder]',
      title: 'First Field Autonomous Flights',
      desc: 'Deployed initial long-range humanitarian cargo delivery drone prototypes across rural regional corridors.',
    },
    {
      year: '2025 [Placeholder]',
      title: 'Decentralized Microgrid Commissioning',
      desc: 'Successfully launched off-grid smart inverter architectures for clean industrial energy distribution.',
    },
    {
      year: '2026 [Placeholder]',
      title: 'Continental Hub Network & Global Alliances',
      desc: 'Expanded to 18 active fabrication nodes uniting hundreds of research fellows and international engineering partners.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#A5A5A5]">
      {/* Hero Banner */}
      <section className="relative py-14 sm:py-24 border-b border-[#D99A28]/20 overflow-hidden bg-[#090909]">
        <div className="absolute inset-0 bg-triangular-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="About Organization"
            title="Building Tomorrow's"
            highlight="African Technological Horizon"
            description="Team Pentatech is an elite engineering and innovation collective dedicated to sovereign deeptech development across Africa and beyond."
          />
        </div>
      </section>

      {/* Narrative & Image Composition */}
      <section className="py-12 sm:py-20 border-b border-[#D99A28]/15 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FFC857]">
                Organizational Profile
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                An Interdisciplinary Force for Technological Advancement
              </h2>
              <p className="text-sm text-[#A5A5A5] leading-relaxed">
                Operating at the confluence of autonomous robotics, smart energy systems, and high-performance computing, Team Pentatech operates as a hybrid research laboratory and innovation launchpad.
              </p>
              <p className="text-sm text-[#A5A5A5] leading-relaxed">
                Every project is designed to bridge the gap between academic exploration and tangible, scalable deployment. Through open collaboration and relentless prototyping, our fellows create systems that address critical infrastructure needs across Africa while establishing benchmarks of international standard.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('/join')}
                  className="px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#FFE09A] to-[#D99A28] hover:shadow-[0_0_25px_rgba(255,200,87,0.4)] transition-all flex items-center gap-2"
                >
                  <span>Join Our Collective</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#D99A28]/35 shadow-2xl">
                <img
                  src="/src/assets/images/hero_african_tech_hub_1793734785317.jpg"
                  alt="Pentatech Research Hub"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#111111]/90 border border-[#D99A28]/30 backdrop-blur-md">
                  <span className="text-xs font-mono text-[#D99A28] uppercase tracking-wider block">
                    Pan-African Headquarters & Research Labs
                  </span>
                  <span className="text-sm font-semibold text-white mt-1 block">
                    {settings.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-20 border-b border-[#D99A28]/15 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#111111] border border-[#D99A28]/30 space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#171717] border border-[#D99A28]/40 flex items-center justify-center text-[#FFC857]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">Our Mission</h3>
              <p className="text-sm text-[#A5A5A5] leading-relaxed">
                To pioneer, build, and deploy world-class sovereign hardware and software systems that solve pressing societal and industrial bottlenecks across Africa, positioning our innovators at the forefront of the global deeptech economy.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-2xl bg-[#111111] border border-[#D99A28]/30 space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#171717] border border-[#D99A28]/40 flex items-center justify-center text-[#168BDA]">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">Our Vision</h3>
              <p className="text-sm text-[#A5A5A5] leading-relaxed">
                A connected, technologically self-reliant continent where African institutions engineer the frontier technologies—from autonomous skies to clean intelligent grids—that shape humanity's sustainable future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-20 border-b border-[#D99A28]/15 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Ethos"
            title="Core Values Driving Our"
            highlight="Engineering Culture"
            description="The foundational principles that guide every prototype we mill, every line of firmware we verify, and every fellowship we award."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const IconComp = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-6 rounded-xl bg-[#111111] border border-[#D99A28]/25 space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#D99A28]/30 flex items-center justify-center text-[#FFC857]">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{v.title}</h4>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Evolutionary Timeline */}
      <section className="py-20 border-b border-[#D99A28]/15 bg-[#090909]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Chronology"
            title="The Path of"
            highlight="Continuous Breakthroughs"
            description="Sample timeline documenting key historical milestones in the emergence of Team Pentatech."
          />

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-[1px] before:bg-[#D99A28]/30">
            {milestones.map((m, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={m.year}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-8`}
                >
                  <div className="flex-1 w-full pl-10 md:pl-0">
                    <div className="p-6 rounded-xl bg-[#111111] border border-[#D99A28]/25 hover:border-[#FFC857]/50 transition-all">
                      <span className="text-xs font-mono text-[#FFC857] font-bold block mb-1">
                        {m.year}
                      </span>
                      <h4 className="text-base font-bold text-white mb-2">{m.title}</h4>
                      <p className="text-xs text-[#A5A5A5] leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  {/* Marker Node */}
                  <div className="absolute left-2.5 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D99A28] border-2 border-black z-10 shadow-[0_0_15px_rgba(255,200,87,0.6)]" />

                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Fellows & Leads"
            title="The Architects Behind the"
            highlight="Frontier Systems"
            description="Meet the interdisciplinary leaders guiding Team Pentatech hardware laboratories, computational groups, and educational initiatives."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group p-6 rounded-xl bg-[#111111] border border-[#D99A28]/25 hover:border-[#FFC857]/60 transition-all text-center flex flex-col items-center justify-between"
              >
                <div>
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#D99A28]/40 mb-4 mx-auto group-hover:border-[#FFC857] transition-all">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#FFC857] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs text-[#FFC857] font-medium mt-0.5">{member.role}</p>
                  <span className="text-[10px] font-mono text-[#777] block mt-1 uppercase">
                    {member.department}
                  </span>
                  <p className="text-xs text-[#A5A5A5] mt-3 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#D99A28]/15 w-full text-xs text-[#888] font-mono">
                  <span>Verified Research Fellow</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
