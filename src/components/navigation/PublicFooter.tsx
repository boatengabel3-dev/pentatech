import React, { useState } from 'react';
import { PentatechLogo } from '../common/PentatechLogo';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, CheckCircle2, Shield, Github, Linkedin, Twitter, Youtube, Lock, Key, X } from 'lucide-react';

interface PublicFooterProps {
  onNavigate: (path: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  const { settings, addToast } = useCMS();
  const { loginWithPasscode } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

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

  const handleSecretSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === '12341234') {
      loginWithPasscode('12341234');
      addToast('Clearance Granted', 'Administrative access unlocked successfully.');
      setShowSecretModal(false);
      setPasscode('');
      setPasscodeError('');
      onNavigate('/admin');
    } else {
      setPasscodeError('Invalid authorization passcode. Access denied.');
    }
  };

  return (
    <footer className="relative bg-black border-t border-white/20 text-neutral-300 pt-16 pb-12 overflow-hidden">
      {/* Subtle white ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-white/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-3 sm:space-y-4">
            <PentatechLogo variant="full" size="lg" glow className="max-h-11 sm:max-h-14 w-auto" />
            <p className="text-sm text-white font-semibold tracking-wide">
              {settings.tagline}
            </p>
            <p className="text-xs text-neutral-300 max-w-sm leading-relaxed">
              An elite African technology and innovation community pioneering autonomous systems,
              sustainable infrastructure, and computational intelligence with international ambition.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socials.x}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all"
                aria-label="X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={settings.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={settings.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
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
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
              Technical Dispatch
            </h4>
            <p className="text-xs text-neutral-300 mb-3 leading-relaxed">
              Curated architectural digests, project releases, and open engineering opportunities.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@domain.com"
                  className="w-full px-3.5 py-2.5 bg-black border border-white/30 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-neutral-200 text-black border border-white text-xs font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
                {subscribed ? <CheckCircle2 className="w-3.5 h-3.5 text-black" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar with discreet secret admin access */}
        <div className="pt-6 sm:pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span>© {new Date().getFullYear()} TEAM PENTATECH. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-neutral-300">{settings.tagline}</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => {
                onNavigate('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Contact Hub
            </button>

            {/* Secret Admin Trigger - subtle and blended into the footer */}
            <button
              type="button"
              onClick={() => {
                setShowSecretModal(true);
                setPasscode('');
                setPasscodeError('');
              }}
              title="System node clearance"
              aria-label="System Node"
              className="opacity-25 hover:opacity-100 transition-opacity p-1 text-neutral-400 hover:text-[#FFC857] flex items-center gap-1 cursor-pointer focus:outline-none"
            >
              <Lock className="w-3 h-3" />
              <span className="text-[10px] font-mono tracking-widest uppercase">Secured</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secret Passcode Entry Modal */}
      {showSecretModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm p-6 sm:p-7 rounded-2xl bg-black border border-[#D99A28]/50 shadow-[0_0_50px_rgba(217,154,40,0.25)] space-y-5 relative">
            <button
              type="button"
              onClick={() => setShowSecretModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black border border-[#D99A28] flex items-center justify-center text-[#FFC857] shadow-[0_0_15px_rgba(217,154,40,0.3)]">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-display font-bold text-white">
                  Restricted Gateway
                </h3>
                <p className="text-xs text-neutral-400">
                  Enter authorization passcode to proceed
                </p>
              </div>
            </div>

            <form onSubmit={handleSecretSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#FFC857] mb-1.5 font-semibold">
                  Access Passcode
                </label>
                <div className="relative">
                  <input
                    type="password"
                    autoFocus
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setPasscodeError('');
                    }}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm font-mono tracking-widest text-center text-white placeholder-neutral-600 focus:outline-none focus:border-[#FFC857] focus:ring-1 focus:ring-[#FFC857] transition-all"
                  />
                </div>
                {passcodeError && (
                  <p className="text-xs text-rose-400 mt-1.5 font-medium flex items-center gap-1">
                    <span>⚠</span> {passcodeError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowSecretModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#FFE09A] via-[#FFC857] to-[#D99A28] hover:shadow-[0_0_25px_rgba(255,200,87,0.4)] transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  Unlock Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};
