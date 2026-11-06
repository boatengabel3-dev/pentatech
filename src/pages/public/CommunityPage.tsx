import React from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Users, Code, Wrench, GraduationCap, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface CommunityPageProps {
  onNavigate: (path: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  const chapters = [
    { city: 'Accra Chapter', country: 'Ghana', focus: 'Autonomous Systems & Drone Aerodynamics', members: '120+ Fellows' },
    { city: 'Nairobi Chapter', country: 'Kenya', focus: 'Edge Neural Computing & IoT Telemetry', members: '145+ Fellows' },
    { city: 'Lagos Chapter', country: 'Nigeria', focus: 'Sovereign Fintech & Cryptographic Protocols', members: '160+ Fellows' },
    { city: 'Kigali Chapter', country: 'Rwanda', focus: 'Clean Energy Microgrids & Hardware Firmware', members: '95+ Fellows' },
  ];

  const initiatives = [
    {
      title: 'Makerspace Open Lab Sessions',
      desc: 'Weekly community fabrication jams with access to precision CNC equipment, oscilloscope stations, and 3D printing farms.',
      icon: Wrench,
    },
    {
      title: 'Deeptech Residency Fellowships',
      desc: 'Three-month sponsored fellowships pairing high-aptitude African graduates with senior systems architects.',
      icon: GraduationCap,
    },
    {
      title: 'Open Source Hardware Repository',
      desc: 'Collaborative open-source CAD models, KiCAD PCB schematics, and C++ RTOS libraries maintained by our engineering working groups.',
      icon: Code,
    },
    {
      title: 'Pan-African Hackathons',
      desc: 'Intensive annual 48-hour hardware and AI prototyping challenges with direct project funding for winning prototypes.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#A5A5A5]">
      {/* Hero */}
      <section className="relative py-14 sm:py-24 border-b border-[#D99A28]/20 bg-[#090909] overflow-hidden">
        <div className="absolute inset-0 bg-triangular-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Collaborative Network"
            title="A Pan-African Collective of"
            highlight="Makers & Researchers"
            description="Connecting hundreds of hardware engineers, embedded developers, and deeptech researchers across university hubs and physical fabrication labs."
          />
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="py-12 sm:py-20 border-b border-[#D99A28]/15 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FFC857]">
              Regional Presence
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Active Innovation Chapters & Labs
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {chapters.map((ch) => (
              <div
                key={ch.city}
                className="p-5 sm:p-6 rounded-xl bg-[#111111] border border-[#D99A28]/25 hover:border-[#FFC857]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#FFC857] font-semibold mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{ch.country}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{ch.city}</h4>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed mb-4">
                    {ch.focus}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D99A28]/15 text-xs font-mono text-[#D99A28]">
                  {ch.members}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Programs */}
      <section className="py-12 sm:py-20 border-b border-[#D99A28]/15 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Programs"
            title="Accelerating Talent Through"
            highlight="Intensive Collaboration"
            description="We believe sovereign technology is built from hands-on creation, peer critique, and sustained mentorship."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {initiatives.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/25 flex flex-col sm:flex-row items-start gap-4 sm:gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#171717] border border-[#D99A28]/40 flex items-center justify-center text-[#FFC857] shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">{item.title}</h4>
                    <p className="text-xs text-[#A5A5A5] leading-relaxed mb-3">
                      {item.desc}
                    </p>
                    <button
                      onClick={() => onNavigate('/join')}
                      className="text-xs font-semibold text-[#FFC857] flex items-center gap-1 hover:underline"
                    >
                      Inquire About Participation <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lab Photo Feature */}
      <section className="py-12 sm:py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D99A28]/40 relative bg-[#111111]">
            <img
              src="/src/assets/images/community_innovation_lab_1793734786218.jpg"
              alt="Community In Action"
              className="w-full h-96 sm:h-96 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/95 via-black/80 to-transparent flex items-center p-5 sm:p-14">
              <div className="max-w-lg space-y-3 sm:space-y-4">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#FFC857]">
                  Community In Motion
                </span>
                <h3 className="text-xl sm:text-3xl font-display font-bold text-white">
                  Join a Community That Builds Real Hardware
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed">
                  No empty discussions. We build physical drones, fabricate power electronics, and benchmark firmware that solves practical African challenges.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('/join')}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#FFE09A] to-[#D99A28] hover:shadow-[0_0_25px_rgba(255,200,87,0.4)] transition-all inline-flex items-center justify-center gap-2"
                  >
                    <span>Apply for Fellowship</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
