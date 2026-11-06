import React, { useState } from 'react';
import { PentatechLogo } from '../common/PentatechLogo';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight, CheckCircle2, Shield, Github, Linkedin, Twitter, Youtube } from 'lucide-react';

interface PublicFooterProps {
  onNavigate: (path: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  const { settings, addToast } = useCMS();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Subscribed', 'You have been added to the Pentatech technical dispatch list.');
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="relative bg-[#050505] border-t border-[#D99A28]/20 text-[#A5A5A5] pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#D99A28]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-3 sm:space-y-4">
            <PentatechLogo variant="full" size="lg" glow className="max-h-11 sm:max-h-14 w-auto" />
            <p className="text-sm text-[#FFC857] font-medium tracking-wide">
              {settings.tagline}
            </p>
            <p className="text-xs text-[#A5A5A5] max-w-sm leading-relaxed">
              An elite African technology and innovation community pioneering autonomous systems,
              sustainable infrastructure, and computational intelligence with international ambition.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socials.x}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#111111] border border-[#D99A28]/30 flex items-center justify-center text-[#A5A5A5] hover:text-[#FFC857] hover:border-[#FFC857] transition-all"
                aria-label="X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={settings.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#111111] border border-[#D99A28]/30 flex items-center justify-center text-[#A5A5A5] hover:text-[#FFC857] hover:border-[#FFC857] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#111111] border border-[#D99A28]/30 flex items-center justify-center text-[#A5A5A5] hover:text-[#FFC857] hover:border-[#FFC857] transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={settings.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#111111] border border-[#D99A28]/30 flex items-center justify-center text-[#A5A5A5] hover:text-[#FFC857] hover:border-[#FFC857] transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFC857] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'About', 'Innovation', 'Projects', 'Community', 'Achievements'].map((name) => {
                const path = name === 'Home' ? '/' : `/${name.toLowerCase()}`;
                return (
                  <li key={name}>
                    <button
                      onClick={() => {
                        onNavigate(path);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Research & Ecosystem */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFC857] mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/innovation')}
                  className="hover:text-white transition-colors"
                >
                  Robotics & Autonomy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/innovation')}
                  className="hover:text-white transition-colors"
                >
                  Clean Energy Grid
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/partnerships')}
                  className="hover:text-white transition-colors"
                >
                  Industry Partnerships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/join')}
                  className="hover:text-white transition-colors"
                >
                  Membership Admissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors"
                >
                  Regional Hubs
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Dispatch & Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFC857] mb-4">
              Technical Dispatch
            </h4>
            <p className="text-xs text-[#A5A5A5] mb-3 leading-relaxed">
              Curated architectural digests, project releases, and open engineering opportunities.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@domain.com"
                  className="w-full px-3.5 py-2.5 bg-[#111111] border border-[#D99A28]/30 rounded-lg text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#FFC857] transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-[#171717] hover:bg-[#D99A28] text-white hover:text-black border border-[#D99A28]/40 text-xs font-medium tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
                {subscribed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-[#D99A28]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777] text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span>© {new Date().getFullYear()} TEAM PENTATECH. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-[#A5A5A5]">{settings.tagline}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('/admin')}
              className="flex items-center gap-1 text-[#888] hover:text-[#FFC857] transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="text-[#888] hover:text-[#FFC857] transition-colors"
            >
              Contact Hub
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
