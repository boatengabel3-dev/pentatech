import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Achievement } from '../../types';
import {
  Trophy,
  Award,
  Medal,
  Calendar,
  Building2,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface AchievementsPageProps {
  onNavigate: (path: string) => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ onNavigate }) => {
  const { achievements } = useCMS();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [timelineExpanded, setTimelineExpanded] = useState<boolean>(true);
  const [selectedTimelineCategory, setSelectedTimelineCategory] = useState<string>('all');

  // Key primary competition recognitions specified by the user
  const alxAward = achievements.find((a) =>
    a.title.toLowerCase().includes('alx') || a.issuer.toLowerCase().includes('alx')
  ) || achievements[0];

  const panAfricaAward = achievements.find((a) =>
    a.title.toLowerCase().includes('panafrica') || a.issuer.toLowerCase().includes('panafrica')
  ) || achievements[1];

  const primaryAwards = [alxAward, panAfricaAward].filter(Boolean);

  // Remaining achievements for the timeline
  const timelineAchievements = achievements.filter((a) => {
    if (selectedTimelineCategory === 'all') return true;
    return a.category.toLowerCase().includes(selectedTimelineCategory.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#A5A5A5]">
      {/* Hero Section */}
      <section className="relative py-14 sm:py-24 border-b border-[#D99A28]/20 bg-[#090909] overflow-hidden">
        <div className="absolute inset-0 bg-triangular-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Honours & Competitive Accolades"
            title="Recognized on Continental &"
            highlight="Global Stages"
            description="Celebrating competitive victories, institutional recognitions, and peer accolades won by Team Pentatech across elite technology challenges and innovation programs."
          />

          {/* KPI Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-12">
            <div className="p-3.5 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/30 text-center">
              <span className="text-2xl sm:text-4xl font-display font-extrabold text-[#FFC857] tabular-nums block">
                1st
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white mt-1 block">
                ALX Winner
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#777] font-mono mt-0.5 block">
                Venture Showcase
              </span>
            </div>

            <div className="p-3.5 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/30 text-center">
              <span className="text-2xl sm:text-4xl font-display font-extrabold text-[#168BDA] tabular-nums block">
                4th
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white mt-1 block">
                PanAfrica AI
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#777] font-mono mt-0.5 block">
                Challenge 2026
              </span>
            </div>

            <div className="p-3.5 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/30 text-center">
              <span className="text-2xl sm:text-4xl font-display font-extrabold text-white tabular-nums block">
                100%
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white mt-1 block">
                Verified Credentials
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#777] font-mono mt-0.5 block">
                Institutional Audit
              </span>
            </div>

            <div className="p-3.5 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/30 text-center">
              <span className="text-2xl sm:text-4xl font-display font-extrabold text-[#FFE09A] tabular-nums block">
                04+
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white mt-1 block">
                Major Honors
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#777] font-mono mt-0.5 block">
                Continuous Record
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Primary Awards: ALX 1st Place & PanAfrica AI 4th Place */}
      <section className="py-12 sm:py-20 bg-[#050505] border-b border-[#D99A28]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FFC857] font-semibold">
              Premier Competition Laurels
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Featured Competition Recognitions
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A5A5] mt-2">
              Highlighting landmark competitive finishes evaluated by panels of industry experts and continental tech leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* 1. FIRST PLACE — ALX */}
            <div className="relative p-5 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border-2 border-[#D99A28] shadow-[0_15px_50px_rgba(217,154,40,0.2)] flex flex-col justify-between overflow-hidden group">
              {/* Gold Ambient Flare */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#D99A28]/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFE09A] via-[#FFC857] to-[#D99A28] text-black font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md">
                    <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Gold 1st Place Badge</span>
                  </div>

                  <span className="text-[10px] sm:text-xs font-mono font-bold text-[#FFC857] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#171717] border border-[#D99A28]/40">
                    ALX Official
                  </span>
                </div>

                {/* Competition & Recognition */}
                <span className="text-xs font-mono uppercase tracking-widest text-[#D99A28] block mb-1">
                  Recognition: 1st Place
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-2 group-hover:text-[#FFC857] transition-colors">
                  FIRST PLACE — ALX
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#888] mb-4">
                  <span className="flex items-center gap-1.5 text-white">
                    <Building2 className="w-3.5 h-3.5 text-[#D99A28]" />
                    Organisation: <strong>ALX</strong>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 text-white">
                    <Calendar className="w-3.5 h-3.5 text-[#D99A28]" />
                    Date: <strong>{alxAward?.date || 'November 2025'}</strong>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed mb-6">
                  {alxAward?.description ||
                    'Awarded 1st Place in the prestigious ALX venture and engineering innovation showcase for outstanding technological execution and high-impact African product design.'}
                </p>

                {/* Certificate Preview Placeholder */}
                <div
                  onClick={() => setSelectedAchievement(alxAward)}
                  className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/60 border border-[#D99A28]/40 mb-6 cursor-pointer group/cert"
                >
                  <img
                    src={alxAward?.certificateUrl || '/src/assets/images/award_trophy_recognition_1793741742036.jpg'}
                    alt="ALX First Place Certificate Placeholder"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/cert:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="text-[#FFC857] font-mono flex items-center gap-1.5 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Certificate Image Placeholder
                    </span>
                    <span className="text-white/80 group-hover/cert:text-white flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-[#FFC857]" />
                      Preview
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#D99A28]/25 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Winner
                </span>
                <button
                  onClick={() => setSelectedAchievement(alxAward)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black font-semibold text-xs flex items-center gap-1.5 hover:shadow-[0_0_20px_rgba(255,200,87,0.4)] transition-all cursor-pointer"
                >
                  <span>View Recognition</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. FOURTH PLACE — PANAFRICA AI & INNOVATION CHALLENGE */}
            <div className="relative p-5 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-[#168BDA]/40 hover:border-[#FFC857]/60 shadow-[0_15px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden group transition-all">
              {/* Electric Blue Flare */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#168BDA]/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#168BDA]/60 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md">
                    <Medal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#168BDA]" />
                    <span>Competition Finalist Badge</span>
                  </div>

                  <span className="text-[10px] sm:text-xs font-mono font-bold text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#171717] border border-[#168BDA]/40">
                    Year 2026
                  </span>
                </div>

                {/* Competition & Recognition */}
                <span className="text-xs font-mono uppercase tracking-widest text-[#168BDA] block mb-1">
                  Recognition: 4th Place
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white mb-2 group-hover:text-[#FFC857] transition-colors">
                  FOURTH PLACE — PANAFRICA AI & INNOVATION CHALLENGE
                </h3>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-[#888] mb-4">
                  <span className="flex items-center gap-1.5 text-white">
                    <Building2 className="w-3.5 h-3.5 text-[#168BDA]" />
                    Competition: <strong>PanAfrica AI Challenge</strong>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 text-white">
                    <Calendar className="w-3.5 h-3.5 text-[#168BDA]" />
                    Year: <strong>2026</strong>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed mb-6">
                  {panAfricaAward?.description ||
                    'Honored with 4th Place at the continental PanAfrica AI & Innovation Challenge 2026, recognized among elite technological initiatives across Africa for innovation in sovereign AI architectures.'}
                </p>

                {/* Certificate Preview Placeholder */}
                <div
                  onClick={() => setSelectedAchievement(panAfricaAward)}
                  className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/60 border border-[#168BDA]/40 mb-6 cursor-pointer group/cert"
                >
                  <img
                    src={panAfricaAward?.certificateUrl || '/src/assets/images/award_trophy_recognition_1793741742036.jpg'}
                    alt="PanAfrica AI & Innovation Challenge Certificate Placeholder"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/cert:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-[11px] sm:text-xs">
                    <span className="text-[#168BDA] font-mono flex items-center gap-1.5 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Certificate Preview
                    </span>
                    <span className="text-white/80 group-hover/cert:text-white flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-[#FFC857]" />
                      Preview
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#168BDA]/25 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Official 2026 Honor
                </span>
                <button
                  onClick={() => setSelectedAchievement(panAfricaAward)}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#171717] hover:bg-[#D99A28] border border-[#D99A28]/40 hover:border-transparent text-white hover:text-black font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>View Recognition</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expandable Achievement Timeline for Future Awards, Competitions, Hackathons & Recognitions */}
      <section className="py-14 sm:py-20 bg-[#090909]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D99A28]/20 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FFC857] font-semibold">
                Historical & Future Registry
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                Achievement & Competition Timeline
              </h3>
              <p className="text-xs text-[#A5A5A5] mt-1">
                Chronological archive of awards, hackathons, and institutional recognitions with modular expansion for future entries.
              </p>
            </div>

            <button
              onClick={() => setTimelineExpanded(!timelineExpanded)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#171717] hover:bg-[#222] border border-[#D99A28]/30 text-xs font-mono font-semibold text-[#FFC857] transition-all cursor-pointer self-start sm:self-auto"
            >
              <span>{timelineExpanded ? 'Collapse Timeline' : 'Expand Timeline'}</span>
              {timelineExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {timelineExpanded && (
            <div className="relative ml-2 sm:ml-4 pl-5 sm:pl-8 border-l-2 border-[#D99A28]/30 space-y-6 sm:space-y-10 pt-4">
              {timelineAchievements.map((item, idx) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Node Icon */}
                  <div className="absolute -left-[31px] sm:-left-[43px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#111111] border-2 border-[#D99A28] flex items-center justify-center text-[#FFC857] shadow-md group-hover:scale-110 group-hover:border-[#FFC857] transition-all">
                    {item.badgeTier === 'gold' ? (
                      <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    ) : item.badgeTier === 'silver' ? (
                      <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-300" />
                    ) : (
                      <Medal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#168BDA]" />
                    )}
                  </div>

                  {/* Timeline Entry Card */}
                  <div className="p-4 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/20 hover:border-[#FFC857]/50 transition-all space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-[#171717] border border-[#D99A28]/30 text-[#FFC857] font-semibold">
                          {item.recognitionPosition || 'Recognized'}
                        </span>
                        <span className="text-[10px] sm:text-xs font-mono text-[#888]">
                          {item.category}
                        </span>
                      </div>

                      <span className="text-[11px] sm:text-xs font-mono font-bold text-white tabular-nums bg-black/40 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded">
                        {item.date || item.year}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFC857] transition-colors leading-snug">
                      {item.title}
                    </h4>

                    <div className="text-[11px] sm:text-xs text-[#777] font-mono">
                      <span>Conferring Authority: </span>
                      <strong className="text-white">{item.issuer}</strong>
                    </div>

                    <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-3 border-t border-[#D99A28]/15 flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Record
                      </span>

                      <button
                        onClick={() => setSelectedAchievement(item)}
                        className="text-xs font-semibold text-[#FFC857] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail / Certificate Modal */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111111] border border-[#D99A28]/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-[#A5A5A5]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#D99A28]/20 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#D99A28] text-black">
                    {selectedAchievement.recognitionPosition || 'Award'}
                  </span>
                  <span className="text-xs font-mono text-[#D99A28]">
                    {selectedAchievement.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {selectedAchievement.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedAchievement(null)}
                className="p-1.5 rounded-lg bg-[#171717] hover:bg-[#222] text-[#777] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Artwork Placeholder */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black border border-[#D99A28]/40 shadow-inner">
              <img
                src={selectedAchievement.certificateUrl || '/src/assets/images/award_trophy_recognition_1793741742036.jpg'}
                alt={selectedAchievement.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="text-[#FFC857]">Conferred: {selectedAchievement.issuer}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Official Certified
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs font-mono p-4 rounded-xl bg-[#171717] border border-[#D99A28]/15">
                <div>
                  <span className="text-[#666] block">Organising Body</span>
                  <strong className="text-white text-sm">{selectedAchievement.issuer}</strong>
                </div>
                <div>
                  <span className="text-[#666] block">Conferral Date / Year</span>
                  <strong className="text-white text-sm">{selectedAchievement.date || selectedAchievement.year}</strong>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-[#FFC857] mb-1">
                  Citation & Recognition Context
                </h5>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  {selectedAchievement.description}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#D99A28]/20 flex justify-end">
              <button
                onClick={() => setSelectedAchievement(null)}
                className="px-5 py-2 rounded-lg bg-[#171717] hover:bg-[#222] border border-[#D99A28]/30 text-white text-xs font-semibold"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
