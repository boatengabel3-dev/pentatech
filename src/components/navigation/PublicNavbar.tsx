import React, { useState, useEffect, useRef } from 'react';
import { PentatechLogo } from '../common/PentatechLogo';
import { ThemeToggle } from '../common/ThemeToggle';
import { useCMS } from '../../context/CMSContext';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { MobileNavDrawer } from './MobileNavDrawer';

interface PublicNavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  mobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
  onCloseMobileMenu?: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentPath,
  onNavigate,
  mobileMenuOpen: controlledOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
}) => {
  const { navigation } = useCMS();
  const [internalOpen, setInternalOpen] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const isDrawerOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const toggleDrawer = () => {
    if (onToggleMobileMenu) {
      onToggleMobileMenu();
    } else {
      setInternalOpen((prev) => !prev);
    }
  };

  const closeDrawer = () => {
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    } else {
      setInternalOpen(false);
    }
  };

  const activeNavItems = navigation.filter((item) => item.isEnabled);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    closeDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-scroll the active tab into view on mobile header
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeEl = tabsContainerRef.current.querySelector<HTMLElement>('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentPath]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-[#D99A28]/20 transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-8">
          {/* Zone 1: Brand Zone (Single official emblem, no duplicate) */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer focus:outline-none shrink-0"
          >
            <PentatechLogo variant="emblem" size="sm" glow className="w-8 h-8 sm:w-11 sm:h-11" />
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-wider text-base sm:text-xl text-white group-hover:text-[#FFC857] transition-colors whitespace-nowrap">
                PENTATECH
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.22em] text-[#D99A28] uppercase font-mono font-medium -mt-0.5 sm:-mt-1">
                BUILDING TOMORROW
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#A5A5A5]">
            {activeNavItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                    isActive ? 'text-[#FFC857] font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D99A28] to-[#FFC857] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Theme Toggle + Admin shortcut */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Theme Mode Toggle Switch */}
            <ThemeToggle />

            <button
              onClick={() => handleNavClick('/admin')}
              title="Admin CMS Portal"
              className="hidden sm:inline-flex items-center justify-center p-2 rounded-lg text-[#A5A5A5] hover:text-[#FFC857] hover:bg-[#171717] transition-colors border border-transparent hover:border-[#D99A28]/30"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNavClick('/join')}
              className="relative group overflow-hidden px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-[#FFE09A] via-[#FFC857] to-[#D99A28] hover:shadow-[0_0_25px_rgba(255,200,87,0.4)] transition-all duration-300 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer active:scale-95"
            >
              <span>Join Us</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Hamburger Drawer Toggle Button */}
            <button
              onClick={toggleDrawer}
              className="lg:hidden min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] p-2 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#D99A28]/30 hover:border-[#FFC857] text-[#A5A5A5] hover:text-[#FFC857] flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label={isDrawerOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isDrawerOpen}
            >
              {isDrawerOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC857]" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Header Tabs Strip */}
      <div className="lg:hidden border-t border-[#D99A28]/20 bg-[#070707]/95 relative shadow-inner">
        <div
          ref={tabsContainerRef}
          className="px-2.5 py-1.5 overflow-x-auto scrollbar-none flex items-center gap-1.5 scroll-smooth"
        >
          {activeNavItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.id}
                data-active={isActive ? 'true' : 'false'}
                onClick={() => handleNavClick(item.path)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 min-h-[34px] ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D99A28]/30 to-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/50 font-semibold shadow-sm'
                    : 'text-[#8e8e8e] hover:text-white hover:bg-[#141414] border border-transparent'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC857] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Standalone slide-out drawer if not handled by layout */}
      {controlledOpen === undefined && (
        <MobileNavDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />
      )}
    </header>
  );
};
