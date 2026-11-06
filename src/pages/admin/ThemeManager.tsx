import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { PentatechLogo } from '../../components/common/PentatechLogo';
import { Monitor, Tablet, Smartphone, Palette, Check, Sparkles, Sliders } from 'lucide-react';

export const ThemeManager: React.FC = () => {
  const { settings, updateSettings, addToast } = useCMS();
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const goldOptions: Array<{ name: typeof settings.theme.goldAccent; hex: string; desc: string }> = [
    { name: 'Classic Gold', hex: '#D99A28', desc: 'Official Pentatech Metallic Architectural Gold' },
    { name: 'Bright Amber', hex: '#FFC857', desc: 'High-contrast luminescent amber for radiant displays' },
    { name: 'Deep Bronze', hex: '#9C571B', desc: 'Industrial aerospace bronze for subdued editorial tone' },
  ];

  const handleSelectGold = (name: typeof settings.theme.goldAccent) => {
    updateSettings({
      theme: { ...settings.theme, goldAccent: name },
    });
    addToast('Palette Updated', `Metallic tone set to ${name}.`);
  };

  const handleToggleParticle = () => {
    updateSettings({
      theme: {
        ...settings.theme,
        showParticleNetwork: !settings.theme.showParticleNetwork,
      },
    });
    addToast('Animation Setting', 'Particle network display toggled.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857]">
            Design System Governance
          </span>
          <h2 className="text-xl font-display font-bold text-white mt-0.5">
            Theme, Appearance & Device Viewport Previews
          </h2>
          <p className="text-xs text-[#A5A5A5] mt-1">
            Customize metallic gold gradient tones, button styles, and preview responsive rendering.
          </p>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#171717] border border-[#D99A28]/25">
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              previewDevice === 'desktop'
                ? 'bg-[#FFC857] text-black font-semibold'
                : 'text-[#A5A5A5] hover:text-white'
            }`}
            title="Desktop 1440px"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setPreviewDevice('tablet')}
            className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              previewDevice === 'tablet'
                ? 'bg-[#FFC857] text-black font-semibold'
                : 'text-[#A5A5A5] hover:text-white'
            }`}
            title="Tablet 768px"
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setPreviewDevice('mobile')}
            className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              previewDevice === 'mobile'
                ? 'bg-[#FFC857] text-black font-semibold'
                : 'text-[#A5A5A5] hover:text-white'
            }`}
            title="Mobile 375px"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Metallic Gold Accent System
            </h3>

            <div className="space-y-3">
              {goldOptions.map((opt) => {
                const isSelected = settings.theme.goldAccent === opt.name;
                return (
                  <div
                    key={opt.name}
                    onClick={() => handleSelectGold(opt.name)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#171717] border-[#FFC857] shadow-[0_0_20px_rgba(217,154,40,0.2)]'
                        : 'bg-[#111111] border-[#D99A28]/20 hover:border-[#D99A28]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full border border-black shadow-md shrink-0"
                        style={{ backgroundColor: opt.hex }}
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white">{opt.name}</h4>
                        <p className="text-[10px] text-[#777] font-mono">{opt.desc}</p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#FFC857]" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Animation & 3D Network
            </h3>
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#171717] border border-[#D99A28]/20">
              <div>
                <span className="text-xs font-semibold text-white block">
                  3D Particle Geometric Canvas
                </span>
                <span className="text-[10px] text-[#777] font-mono">
                  Floating interconnected golden nodes
                </span>
              </div>
              <button
                onClick={handleToggleParticle}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium ${
                  settings.theme.showParticleNetwork
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#222] text-[#666]'
                }`}
              >
                {settings.theme.showParticleNetwork ? 'Active' : 'Off'}
              </button>
            </div>
          </div>
        </div>

        {/* Viewport Preview Frame */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[#777] mb-2 px-2">
            <span>Live Interactive Viewport Preview</span>
            <span>
              Device: {previewDevice.toUpperCase()} (
              {previewDevice === 'desktop' ? '100% width' : previewDevice === 'tablet' ? '768px' : '375px'})
            </span>
          </div>

          <div
            className={`transition-all duration-300 rounded-3xl border-2 border-[#D99A28]/40 bg-[#050505] overflow-hidden shadow-2xl relative ${
              previewDevice === 'desktop'
                ? 'w-full h-[580px]'
                : previewDevice === 'tablet'
                ? 'w-[480px] h-[580px]'
                : 'w-[320px] h-[580px]'
            }`}
          >
            {/* Mock device browser bar */}
            <div className="h-8 bg-[#090909] border-b border-[#D99A28]/20 px-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-[10px] font-mono text-[#666]">
                pentatech.org / public
              </span>
              <span className="w-4" />
            </div>

            {/* Embedded Live Preview Canvas */}
            <div className="h-[calc(100%-2rem)] overflow-y-auto p-4 sm:p-6 space-y-6 text-center">
              <PentatechLogo variant="emblem" size="md" glow className="mx-auto" />
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-tight">
                {settings.homepageHero.headline}{' '}
                <span className="gold-gradient-text block">
                  {settings.homepageHero.highlightWord}
                </span>
              </h2>
              <p className="text-xs text-[#A5A5A5] line-clamp-3">
                {settings.homepageHero.subheadline}
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button className="px-4 py-2 rounded-lg text-xs font-semibold text-black bg-gradient-to-r from-[#FFE09A] to-[#D99A28] shadow-md">
                  {settings.homepageHero.primaryCtaText}
                </button>
                <button className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#111] border border-[#D99A28]/30">
                  {settings.homepageHero.secondaryCtaText}
                </button>
              </div>

              {/* Sample card preview */}
              <div className="p-4 rounded-xl bg-[#111111] border border-[#D99A28]/20 text-left space-y-2">
                <span className="text-[10px] font-mono text-[#FFC857]">Autonomous Systems</span>
                <h4 className="text-xs font-bold text-white">Autonomous Cargo Drone</h4>
                <p className="text-[11px] text-[#A5A5A5] line-clamp-2">
                  Sample project live preview showing typography rendering and metallic gold borders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
