import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SectionHeading } from '../../components/common/SectionHeading';
import {
  Binary,
  Code,
  Coins,
  Sprout,
  GraduationCap,
  Zap,
  Microscope,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface InnovationPageProps {
  onNavigate: (path: string) => void;
}

// Icon helper to dynamically map iconName strings from the CMS
const getCategoryIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Binary':
      return Binary;
    case 'Code':
      return Code;
    case 'Coins':
      return Coins;
    case 'Sprout':
      return Sprout;
    case 'GraduationCap':
      return GraduationCap;
    case 'Zap':
      return Zap;
    case 'Microscope':
      return Microscope;
    case 'Cpu':
    default:
      return Cpu;
  }
};

export const InnovationPage: React.FC<InnovationPageProps> = ({ onNavigate }) => {
  const { innovationCategories } = useCMS();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredCategories =
    selectedFilter === 'all'
      ? innovationCategories
      : innovationCategories.filter((c) => c.id === selectedFilter);

  return (
    <div className="min-h-screen bg-[#050505] text-[#A5A5A5]">
      {/* Hero Banner */}
      <section className="relative py-14 sm:py-24 border-b border-[#D99A28]/20 bg-[#090909] overflow-hidden">
        <div className="absolute inset-0 bg-triangular-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Innovation Architecture"
            title="Pioneering the Strategic Frontiers of"
            highlight="African Deeptech"
            description="Our multidisciplinary research teams drive breakthroughs across eight core engineering domains, building sovereign platforms for continental impact and global excellence."
          />

          {/* Interactive Filter Chips (Horizontal swipe on mobile, wrapped on desktop) */}
          <div className="flex items-center gap-2 mt-6 sm:mt-8 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center sm:overflow-visible">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedFilter === 'all'
                  ? 'bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black shadow-[0_0_20px_rgba(217,154,40,0.3)]'
                  : 'bg-[#111111] text-[#A5A5A5] hover:text-white border border-[#D99A28]/20'
              }`}
            >
              All Domains ({innovationCategories.length})
            </button>
            {innovationCategories.map((cat) => {
              const IconComp = getCategoryIcon(cat.iconName);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    selectedFilter === cat.id
                      ? 'bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black font-semibold shadow-[0_0_20px_rgba(217,154,40,0.3)]'
                      : 'bg-[#111111] text-[#A5A5A5] hover:text-white border border-[#D99A28]/20'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 text-[#D99A28]" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovation Categories Grid (Clean category cards with professional imagery, subtle hover, consistent hierarchy) */}
      <section className="py-12 sm:py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredCategories.map((category, idx) => {
              const IconComponent = getCategoryIcon(category.iconName);
              return (
                <div
                  key={category.id}
                  className="group relative bg-[#111111] border border-[#D99A28]/25 hover:border-[#FFC857]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_35px_-5px_rgba(217,154,40,0.2)] flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Imagery */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#090909]">
                      <img
                        src={category.imageUrl}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-transparent opacity-90" />

                      {/* Icon Badge */}
                      <div className="absolute top-3 left-3 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#090909]/90 border border-[#D99A28]/40 flex items-center justify-center text-[#FFC857] shadow-md backdrop-blur-md">
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>

                      {/* Domain Index */}
                      <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-[#FFC857] px-2 py-0.5 rounded bg-black/70 border border-[#D99A28]/30">
                        Pillar 0{category.order || idx + 1}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-6 pb-2">
                      <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-[#FFC857] transition-colors leading-snug mb-2">
                        {category.title}
                      </h3>
                      <p className="text-xs text-[#A5A5A5] leading-relaxed line-clamp-3 mb-3">
                        {category.description}
                      </p>

                      {/* Tags */}
                      {category.tags && category.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {category.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#171717] border border-[#D99A28]/20 text-[#A5A5A5]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-4 sm:p-6 pt-0">
                    <div className="pt-3 border-t border-[#D99A28]/15 flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-mono text-[#777]">
                        Active Lab
                      </span>
                      <button
                        onClick={() => onNavigate('/projects')}
                        className="text-xs font-semibold text-[#FFC857] group-hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>Related Projects</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom R&D Collaboration Prompt */}
          <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-[#090909] border border-[#D99A28]/25 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D99A28] font-semibold">
              Interdisciplinary Collaboration
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Interested in Joint Research or Technology Transfer?
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A5A5] max-w-xl mx-auto leading-relaxed">
              We partner with academic institutions, industrial groups, and government agencies to pilot emerging technologies across Africa.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('/partnerships')}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#FFE09A] to-[#D99A28] hover:shadow-[0_0_20px_rgba(217,154,40,0.3)] transition-all"
              >
                Inquire for Collaboration
              </button>
              <button
                onClick={() => onNavigate('/projects')}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#171717] hover:bg-[#222] border border-[#D99A28]/30 transition-all"
              >
                View Applied Deployments
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
