import React, { useState } from 'react';
import { PublicNavbar } from '../components/navigation/PublicNavbar';
import { PublicFooter } from '../components/navigation/PublicFooter';
import { MobileNavDrawer } from '../components/navigation/MobileNavDrawer';

interface PublicLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  currentPath,
  onNavigate,
  children,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#A5A5A5] selection:bg-[#D99A28]/30 selection:text-[#FFC857] relative">
      <PublicNavbar
        currentPath={currentPath}
        onNavigate={onNavigate}
        mobileMenuOpen={mobileDrawerOpen}
        onToggleMobileMenu={() => setMobileDrawerOpen((prev) => !prev)}
        onCloseMobileMenu={() => setMobileDrawerOpen(false)}
      />

      {/* Slide-out Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        currentPath={currentPath}
        onNavigate={onNavigate}
      />

      <main className="flex-1">{children}</main>
      <PublicFooter onNavigate={onNavigate} />
    </div>
  );
};
