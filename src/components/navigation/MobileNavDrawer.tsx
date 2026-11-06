import React, { useEffect, useRef } from 'react';
import { PentatechLogo } from '../common/PentatechLogo';
import { ThemeToggle } from '../common/ThemeToggle';
import { useCMS } from '../../context/CMSContext';
import {
  X,
  ArrowUpRight,
  Shield,
  Layers,
  Sparkles,
  Trophy,
  Users,
  Handshake,
  Compass,
  PhoneCall,
  UserPlus,
} from 'lucide-react';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  currentPath,
  onNavigate,
}) => {
  const { navigation } = useCMS();
  const drawerRef = useRef<HTMLDivElement>(null);

  const activeNavItems = navigation.filter((item) => item.isEnabled);

  // Icon mapping for navigation links for richer visual cues
  const getNavIcon = (path: string) => {
    switch (path) {
      case '/':
        return Compass;
      case '/projects':
        return Layers;
      case '/innovation':
        return Sparkles;
      case '/achievements':
        return Trophy;
      case '/about':
        return Compass;
      case '/community':
        return Users;
      case '/partnerships':
        return Handshake;
      case '/contact':
        return PhoneCall;
      case '/join':
        return UserPlus;
      default:
        return ArrowUpRight;
    }
  };

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close when screen resizes to desktop width (lg >= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-visibility duration-300 ${
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Mobile Navigation Menu"
    >
      {/* Dimmed backdrop with smooth fade */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Slide-out Drawer Panel */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 w-full max-w-[320px] sm:max-w-[360px] bg-black border-l border-white/20 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between transform transition-transform duration-300 ease-out z-10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/20 flex items-center justify-between bg-black">
          <div className="flex items-center gap-2.5">
            <PentatechLogo variant="emblem" size="sm" glow />
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-wider text-base text-white">
                PENTATECH
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-white/70 uppercase font-semibold">
                BUILDING TOMORROW
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-black hover:bg-neutral-900 border border-white/20 hover:border-white text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label="Close Navigation Drawer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-1.5 scrollbar-thin scrollbar-thumb-white/30">
          <div className="flex items-center justify-between px-2 pt-1 pb-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white font-semibold">
              Exploration Directory
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              {activeNavItems.length} Sections
            </span>
          </div>

          {activeNavItems.map((item, index) => {
            const isActive = currentPath === item.path;
            const IconComp = getNavIcon(item.path);

            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.path)}
                className={`w-full group flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all cursor-pointer min-h-[52px] ${
                  isActive
                    ? 'bg-white text-black font-bold border border-white shadow-sm'
                    : 'text-neutral-200 hover:text-white hover:bg-neutral-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-black text-white border border-white/20'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {String(index + 1).padStart(2, '0')} // Section
                    </span>
                  </div>
                </div>

                <ArrowUpRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isActive ? 'text-black opacity-100' : 'text-neutral-400 opacity-60'
                  }`}
                />
              </button>
            );
          })}

          {/* Quick Action Cards in Drawer */}
          <div className="pt-4 mt-3 border-t border-white/20 space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 px-2 block font-semibold">
              Action Gateways
            </span>

            {/* Theme Toggle in Mobile Drawer */}
            <div className="pt-1">
              <ThemeToggle variant="drawer" />
            </div>

            {/* Join Us CTA */}
            <button
              onClick={() => handleLinkClick('/join')}
              className="w-full min-h-[48px] px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 border border-white transition-all flex items-center justify-between cursor-pointer active:scale-[0.98] shadow-sm"
            >
              <div className="flex items-center gap-2 font-bold">
                <UserPlus className="w-4 h-4" />
                <span>Apply for Fellowship</span>
              </div>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Footer Branding */}
        <div className="p-4 sm:p-5 border-t border-white/20 bg-black text-center space-y-1.5">
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-white tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Pan-African Innovation Network</span>
          </div>
          <p className="text-[11px] text-neutral-400">
            Building Tomorrow, Today.
          </p>
        </div>
      </div>
    </div>
  );
};
