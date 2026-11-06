import React from 'react';
import { PentatechLogo } from '../common/PentatechLogo';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Globe,
  Home,
  Info,
  Lightbulb,
  Briefcase,
  Users2,
  Trophy,
  UserCheck,
  Calendar,
  Handshake,
  UserPlus,
  Image,
  Navigation,
  Palette,
  Search,
  Settings,
  ShieldAlert,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'overview'
  | 'homepage'
  | 'about'
  | 'innovation'
  | 'projects'
  | 'community'
  | 'achievements'
  | 'team'
  | 'events'
  | 'partnerships'
  | 'membership'
  | 'media'
  | 'navigation'
  | 'theme'
  | 'seo'
  | 'settings'
  | 'admin-users';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
  onViewLiveSite: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  onLogout,
  onViewLiveSite,
}) => {
  const { applications } = useCMS();
  const { user } = useAuth();

  const pendingApplicationsCount = applications.filter((a) => a.status === 'Pending').length;

  const menuSections = [
    {
      group: 'Core Management',
      items: [
        { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'overview' as AdminTab, label: 'Website Overview', icon: Globe },
      ],
    },
    {
      group: 'Content Managers',
      items: [
        { id: 'homepage' as AdminTab, label: 'Homepage Manager', icon: Home },
        { id: 'about' as AdminTab, label: 'About Page Manager', icon: Info },
        { id: 'innovation' as AdminTab, label: 'Innovation Manager', icon: Lightbulb },
        { id: 'projects' as AdminTab, label: 'Projects Manager', icon: Briefcase },
        { id: 'community' as AdminTab, label: 'Community Manager', icon: Users2 },
        { id: 'achievements' as AdminTab, label: 'Achievements Manager', icon: Trophy },
        { id: 'team' as AdminTab, label: 'Team Manager', icon: UserCheck },
        { id: 'events' as AdminTab, label: 'Events Manager', icon: Calendar },
        { id: 'partnerships' as AdminTab, label: 'Partnerships Manager', icon: Handshake },
      ],
    },
    {
      group: 'Operations & Assets',
      items: [
        {
          id: 'membership' as AdminTab,
          label: 'Membership Applications',
          icon: UserPlus,
          badge: pendingApplicationsCount > 0 ? pendingApplicationsCount : undefined,
        },
        { id: 'media' as AdminTab, label: 'Media Library', icon: Image },
        { id: 'navigation' as AdminTab, label: 'Navigation Manager', icon: Navigation },
      ],
    },
    {
      group: 'System Configuration',
      items: [
        { id: 'theme' as AdminTab, label: 'Theme & Appearance', icon: Palette },
        { id: 'seo' as AdminTab, label: 'SEO Settings', icon: Search },
        { id: 'settings' as AdminTab, label: 'General Settings', icon: Settings },
        { id: 'admin-users' as AdminTab, label: 'Admin Users', icon: ShieldAlert },
      ],
    },
  ];

  return (
    <aside
      className={`relative z-30 flex flex-col justify-between bg-[#090909] border-r border-[#D99A28]/20 transition-all duration-300 h-screen overflow-hidden ${
        collapsed ? 'w-20' : 'w-64 sm:w-72'
      }`}
    >
      {/* Top Brand area */}
      <div className="p-4 border-b border-[#D99A28]/15 flex items-center justify-between">
        <div
          onClick={onViewLiveSite}
          className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          title="Click to view Live Public Site"
        >
          <PentatechLogo variant="emblem" size="sm" glow />
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-display font-extrabold text-sm text-white group-hover:text-[#FFC857] transition-colors truncate">
                PENTATECH CMS
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#D99A28] uppercase">
                Enterprise Admin
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-[#A5A5A5] hover:text-white hover:bg-[#171717] transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List with custom scrollbar */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {menuSections.map((section) => (
          <div key={section.group} className="space-y-1">
            {!collapsed && (
              <span className="px-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#666] font-semibold block mb-2">
                {section.group}
              </span>
            )}

            {section.items.map((item) => {
              const IconComp = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D99A28]/20 to-[#171717] text-[#FFC857] border border-[#D99A28]/40 shadow-sm font-semibold'
                      : 'text-[#A5A5A5] hover:text-white hover:bg-[#111111]'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                >
                  <IconComp
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#FFC857]' : 'text-[#888]'
                    }`}
                  />
                  {!collapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#D99A28] text-black">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer User info & Logout (Item 19) */}
      <div className="p-3 border-t border-[#D99A28]/15 bg-[#050505] space-y-2">
        {!collapsed && user && (
          <div className="px-3 py-2 rounded-xl bg-[#111111] border border-[#D99A28]/20 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#171717] border border-[#D99A28]/40 flex items-center justify-center text-xs font-bold text-[#FFC857] shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-white truncate block">
                {user.name}
              </span>
              <span className="text-[10px] font-mono text-[#D99A28] truncate block">
                {user.role}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={onLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#B52B20] hover:bg-[#B52B20]/15 hover:text-white transition-all ${
            collapsed ? 'justify-center px-0' : ''
          }`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>19. Logout</span>}
        </button>
      </div>
    </aside>
  );
};
