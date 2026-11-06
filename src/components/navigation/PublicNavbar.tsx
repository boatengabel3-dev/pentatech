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
    <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-xl border-b border-white/20 transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-8">
          {/* Zone 1: Brand Zone (Single official emblem, no duplicate) */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer focus:outline-none shrink-0"
          >
            <PentatechLogo variant="emblem" size="sm" glow className="w-8 h-8 sm:w-11 sm:h-11" />
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-wider text-base sm:text-xl text-white group-hover:text-white transition-colors whitespace-nowrap">
                PENTATECH
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.22em] text-white/70 uppercase font-mono font-medium -mt-0.5 sm:-mt-1">
                BUILDING TOMORROW
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-white/80">
            {activeNavItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                    isActive ? 'text-white font-bold' : 'text-neutral-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Theme Mode Toggle Switch */}
            <ThemeToggle />

            <button
              onClick={() => handleNavClick('/join')}
              className="relative group overflow-hidden px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-bold tracking-wider uppercase text-black bg-white hover:bg-neutral-200 border border-white transition-all duration-200 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer active:scale-95 shadow-sm"
            >
              <span>Join Us</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Hamburger Drawer Toggle Button */}
            <button
              onClick={toggleDrawer}
              className="lg:hidden min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] p-2 rounded-xl bg-black hover:bg-neutral-900 border border-white/20 hover:border-white text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label={isDrawerOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isDrawerOpen}
            >
              {isDrawerOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Header Tabs Strip */}
      <div className="lg:hidden border-t border-white/20 bg-black relative shadow-inner">
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
                    ? 'bg-white text-black border border-white font-bold shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900 border border-transparent'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
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
