import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Save, Eye, Check, Sliders, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';

interface HomepageManagerProps {
  onViewLiveSite: () => void;
}

export const HomepageManager: React.FC<HomepageManagerProps> = ({ onViewLiveSite }) => {
  const { settings, updateHeroSettings, toggleSectionVisibility, addToast } = useCMS();

  const [heroForm, setHeroForm] = useState({
    headline: settings.homepageHero.headline,
    highlightWord: settings.homepageHero.highlightWord,
    subheadline: settings.homepageHero.subheadline,
    primaryCtaText: settings.homepageHero.primaryCtaText,
    primaryCtaLink: settings.homepageHero.primaryCtaLink,
    secondaryCtaText: settings.homepageHero.secondaryCtaText,
    secondaryCtaLink: settings.homepageHero.secondaryCtaLink,
  });

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroSettings(heroForm);
    addToast('Hero Saved & Published', 'Homepage Hero modifications are now live on the public site.');
  };

  const sectionsList: Array<{ key: keyof typeof settings.sectionsVisibility; label: string; desc: string }> = [
    { key: 'introduction', label: '1. Genesis & Introduction Section', desc: 'Organizational background and laboratory fabrication narrative' },
    { key: 'innovation', label: '2. Innovation Strategic Pillars', desc: 'Four deeptech categories and research division showcase' },
    { key: 'projects', label: '3. Featured Projects Portfolio', desc: 'Display of fielded autonomous hardware and clean energy systems' },
    { key: 'community', label: '4. Collaborative Community Showcase', desc: 'Maker spaces, fellowship programs, and hackathon sprints' },
    { key: 'achievements', label: '5. Milestone Counters & Awards', desc: 'Key metrics, patents, and continental honors' },
    { key: 'events', label: '6. Upcoming Tech Summits & Events', desc: 'Scheduled symposiums, workshops, and registrations' },
    { key: 'partnerships', label: '7. Global Research Alliances', desc: 'Strategic partners and collaborative logos' },
    { key: 'ctaBanner', label: '8. Membership Admissions Call to Action', desc: 'Closing recruitment banner leading to admissions' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857]">
            Content Management
          </span>
          <h2 className="text-xl font-display font-bold text-white mt-0.5">
            Homepage Content & Section Orchestrator
          </h2>
          <p className="text-xs text-[#A5A5A5] mt-1">
            Configure the cinematic hero banner, call-to-actions, and section visibility states.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onViewLiveSite}
            className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#222] border border-[#D99A28]/30 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>Preview Homepage</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Hero Editor Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-6">
          <div className="border-b border-[#D99A28]/20 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Cinematic Hero Configuration
            </h3>
            <p className="text-xs text-[#777] mt-0.5">
              Edit the primary value proposition text and action destinations.
            </p>
          </div>

          <form onSubmit={handleHeroSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                Primary Hero Headline
              </label>
              <input
                type="text"
                required
                value={heroForm.headline}
                onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                Highlight Word (Rendered in Gold Gradient)
              </label>
              <input
                type="text"
                required
                value={heroForm.highlightWord}
                onChange={(e) => setHeroForm({ ...heroForm, highlightWord: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-[#FFC857] font-semibold focus:outline-none focus:border-[#FFC857]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                Hero Supporting Subheadline
              </label>
              <textarea
                rows={3}
                required
                value={heroForm.subheadline}
                onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={heroForm.primaryCtaText}
                  onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                  className="w-full px-4 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                  Primary CTA Target Path
                </label>
                <input
                  type="text"
                  value={heroForm.primaryCtaLink}
                  onChange={(e) => setHeroForm({ ...heroForm, primaryCtaLink: e.target.value })}
                  className="w-full px-4 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                  Secondary CTA Label
                </label>
                <input
                  type="text"
                  value={heroForm.secondaryCtaText}
                  onChange={(e) =>
                    setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                  Secondary CTA Target Path
                </label>
                <input
                  type="text"
                  value={heroForm.secondaryCtaLink}
                  onChange={(e) =>
                    setHeroForm({ ...heroForm, secondaryCtaLink: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-[#FFE09A] to-[#D99A28] hover:shadow-[0_0_20px_rgba(255,200,87,0.35)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save & Publish Hero</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Section Visibility & Ordering */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-6">
          <div className="border-b border-[#D99A28]/20 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Homepage Section Visibility
            </h3>
            <p className="text-xs text-[#777] mt-0.5">
              Toggle specific modules on or off without altering code.
            </p>
          </div>

          <div className="space-y-3">
            {sectionsList.map((sec) => {
              const isVisible = settings.sectionsVisibility[sec.key];
              return (
                <div
                  key={sec.key}
                  className="p-3.5 rounded-xl bg-[#171717] border border-[#D99A28]/20 flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">{sec.label}</h4>
                    <p className="text-[11px] text-[#777] line-clamp-1">{sec.desc}</p>
                  </div>

                  <button
                    onClick={() => toggleSectionVisibility(sec.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      isVisible
                        ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
                        : 'bg-[#222] text-[#666] border border-[#333]'
                    }`}
                  >
                    {isVisible ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
