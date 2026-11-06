import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCMS } from '../../context/CMSContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { AdminTab } from './AdminSidebar';
import {
  Search,
  Bell,
  ExternalLink,
  Plus,
  Check,
  Moon,
  Sun,
  Menu,
  Shield,
  RotateCcw
} from 'lucide-react';

interface AdminTopbarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onToggleMobileSidebar: () => void;
  onViewLiveSite: () => void;
  searchFilter: string;
  onSearchChange: (q: string) => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({
  currentTab,
  onSelectTab,
  onToggleMobileSidebar,
  onViewLiveSite,
  searchFilter,
  onSearchChange,
}) => {
  const { user } = useAuth();
  const { resetAllToDefault, addToast, applications } = useCMS();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);

  const tabLabels: Record<AdminTab, string> = {
    dashboard: 'Dashboard Overview',
    overview: 'Website Statistics',
    homepage: 'Homepage Manager',
    about: 'About Page Manager',
    innovation: 'Innovation Manager',
    projects: 'Projects Manager',
    community: 'Community Manager',
    achievements: 'Achievements Manager',
    team: 'Team Manager',
    events: 'Events Manager',
    partnerships: 'Partnerships Manager',
    membership: 'Membership Applications',
    media: 'Media Library',
    navigation: 'Navigation Manager',
    theme: 'Theme & Appearance',
    seo: 'SEO Settings',
    settings: 'General Settings',
    'admin-users': 'Admin Users & Roles',
  };

  const pendingApps = applications.filter((a) => a.status === 'Pending');

  return (
    <header className="sticky top-0 z-20 h-16 bg-black/95 backdrop-blur-md border-b border-white/20 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-neutral-300 hover:text-white"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono min-w-0">
          <span className="text-neutral-500 hidden sm:inline">CMS</span>
          <span className="text-neutral-500 hidden sm:inline">/</span>
          <span className="text-white font-bold truncate max-w-[140px] sm:max-w-none">
            {tabLabels[currentTab]}
          </span>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Filter records in ${tabLabels[currentTab]}...`}
            className="w-full pl-9 pr-3 py-1.5 bg-black border border-white/25 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
          />
        </div>
      </div>

      {/* Right: Quick actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Reset Demo Data button */}
        <button
          onClick={resetAllToDefault}
          title="Reset CMS to sample placeholder data"
          className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-neutral-300 hover:text-white bg-black hover:bg-neutral-900 border border-white/20 transition-colors"
        >
          <RotateCcw className="w-3 h-3 text-white" />
          <span>Reset Demo</span>
        </button>

        {/* View Live Website Button */}
        <button
          onClick={onViewLiveSite}
          className="px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-white hover:bg-neutral-200 border border-white transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {/* Theme Toggle in Admin Topbar */}
        <ThemeToggle />

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg text-[#A5A5A5] hover:text-white bg-[#111111] border border-[#D99A28]/20 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {pendingApps.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D99A28]" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 p-4 rounded-2xl bg-[#111111] border border-[#D99A28]/40 shadow-2xl z-50 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#D99A28]/20 mb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Notifications & Submissions
                </span>
                <span className="text-[10px] font-mono text-[#FFC857]">
                  {pendingApps.length} Pending
                </span>
              </div>

              {pendingApps.length === 0 ? (
                <p className="text-xs text-[#777] text-center py-4">No pending alerts</p>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {pendingApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => {
                        onSelectTab('membership');
                        setNotificationsOpen(false);
                      }}
                      className="p-2.5 rounded-lg bg-[#171717] hover:bg-[#222] border border-[#D99A28]/20 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-white">
                        <span>{app.fullName}</span>
                        <span className="text-[10px] text-[#D99A28] font-mono">{app.submittedAt}</span>
                      </div>
                      <p className="text-[11px] text-[#A5A5A5] mt-0.5">
                        Applied for {app.primaryTrack}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile Avatar Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#D99A28]/20">
          <div className="w-8 h-8 rounded-full bg-[#171717] border border-[#D99A28]/40 flex items-center justify-center text-xs font-bold text-[#FFC857]">
            {user ? user.name.charAt(0) : 'A'}
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-white leading-tight">
              {user ? user.name : 'Administrator'}
            </span>
            <span className="text-[9px] font-mono text-[#D99A28]">
              {user ? user.role : 'Super Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
