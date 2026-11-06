import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminSidebar, AdminTab } from '../components/navigation/AdminSidebar';
import { AdminTopbar } from '../components/navigation/AdminTopbar';
import { AdminDashboardOverview } from '../pages/admin/AdminDashboardOverview';
import { HomepageManager } from '../pages/admin/HomepageManager';
import { ProjectsManager } from '../pages/admin/ProjectsManager';
import { InnovationManager } from '../pages/admin/InnovationManager';
import { AchievementsManager } from '../pages/admin/AchievementsManager';
import { MembershipManager } from '../pages/admin/MembershipManager';
import { MediaLibrary } from '../pages/admin/MediaLibrary';
import { TeamEventsManager } from '../pages/admin/TeamEventsManager';
import { NavigationManager } from '../pages/admin/NavigationManager';
import { ThemeManager } from '../pages/admin/ThemeManager';
import { SettingsManager } from '../pages/admin/SettingsManager';

interface AdminLayoutProps {
  onViewLiveSite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onViewLiveSite }) => {
  const { logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setSearchFilter('');
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onLogout={handleLogout}
          onViewLiveSite={onViewLiveSite}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 h-full bg-black border-r border-white/20">
            <AdminSidebar
              currentTab={currentTab}
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                setSearchFilter('');
                setMobileSidebarOpen(false);
              }}
              collapsed={false}
              onToggleCollapse={() => setMobileSidebarOpen(false)}
              onLogout={handleLogout}
              onViewLiveSite={onViewLiveSite}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <AdminTopbar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setSearchFilter('');
          }}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onViewLiveSite={onViewLiveSite}
          searchFilter={searchFilter}
          onSearchChange={setSearchFilter}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-black">
          <div className="max-w-7xl mx-auto">
            {currentTab === 'dashboard' && (
              <AdminDashboardOverview
                onSelectTab={setCurrentTab}
                onViewLiveSite={onViewLiveSite}
              />
            )}
            {currentTab === 'overview' && (
              <AdminDashboardOverview
                onSelectTab={setCurrentTab}
                onViewLiveSite={onViewLiveSite}
              />
            )}
            {currentTab === 'homepage' && (
              <HomepageManager onViewLiveSite={onViewLiveSite} />
            )}
            {currentTab === 'about' && (
              <SettingsManager initialSection="settings" />
            )}
            {currentTab === 'innovation' && (
              <InnovationManager />
            )}
            {currentTab === 'projects' && (
              <ProjectsManager />
            )}
            {currentTab === 'community' && (
              <TeamEventsManager initialSubTab="team" />
            )}
            {currentTab === 'achievements' && (
              <AchievementsManager />
            )}
            {currentTab === 'team' && (
              <TeamEventsManager initialSubTab="team" />
            )}
            {currentTab === 'events' && (
              <TeamEventsManager initialSubTab="events" />
            )}
            {currentTab === 'partnerships' && (
              <TeamEventsManager initialSubTab="partnerships" />
            )}
            {currentTab === 'membership' && (
              <MembershipManager />
            )}
            {currentTab === 'media' && (
              <MediaLibrary />
            )}
            {currentTab === 'navigation' && (
              <NavigationManager />
            )}
            {currentTab === 'theme' && (
              <ThemeManager />
            )}
            {currentTab === 'seo' && (
              <SettingsManager initialSection="seo" />
            )}
            {currentTab === 'settings' && (
              <SettingsManager initialSection="settings" />
            )}
            {currentTab === 'admin-users' && (
              <SettingsManager initialSection="admin-users" />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
