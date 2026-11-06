import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { AdminTab } from '../../components/navigation/AdminSidebar';
import {
  Globe,
  Briefcase,
  UserPlus,
  Calendar,
  Image,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  ArrowUpRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

interface AdminDashboardOverviewProps {
  onSelectTab: (tab: AdminTab) => void;
  onViewLiveSite: () => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  onSelectTab,
  onViewLiveSite,
}) => {
  const {
    projects,
    applications,
    events,
    media,
    teamMembers,
    achievements,
    updateApplicationStatus,
    addToast,
  } = useCMS();

  const pendingApps = applications.filter((a) => a.status === 'Pending');
  const approvedApps = applications.filter((a) => a.status === 'Approved');

  // KPI Statistics
  const stats = [
    {
      title: 'Total Website Pages',
      value: '8 Pages',
      note: 'All live and responsive',
      icon: Globe,
      color: 'text-[#FFC857]',
    },
    {
      title: 'Active Projects',
      value: `${projects.length} Fielded`,
      note: `${projects.filter((p) => p.isFeatured).length} Featured on Home`,
      icon: Briefcase,
      color: 'text-[#D99A28]',
      action: () => onSelectTab('projects'),
    },
    {
      title: 'Membership Applications',
      value: `${applications.length} Received`,
      note: `${pendingApps.length} awaiting review`,
      icon: UserPlus,
      color: pendingApps.length > 0 ? 'text-[#FFC857]' : 'text-emerald-400',
      action: () => onSelectTab('membership'),
    },
    {
      title: 'Upcoming Events',
      value: `${events.length} Scheduled`,
      note: 'Summits & hackathons',
      icon: Calendar,
      color: 'text-[#168BDA]',
      action: () => onSelectTab('events'),
    },
    {
      title: 'Media Assets Stored',
      value: `${media.length} Files`,
      note: 'High-resolution assets',
      icon: Image,
      color: 'text-[#A5A5A5]',
      action: () => onSelectTab('media'),
    },
    {
      title: 'Research Team Fellows',
      value: `${teamMembers.length} Leads`,
      note: 'All published profiles',
      icon: Layers,
      color: 'text-amber-400',
      action: () => onSelectTab('team'),
    },
  ];

  // Sample weekly activity data points for the SVG chart
  const activityData = [
    { day: 'Mon', views: 420, inquiries: 12 },
    { day: 'Tue', views: 680, inquiries: 18 },
    { day: 'Wed', views: 950, inquiries: 24 },
    { day: 'Thu', views: 1120, inquiries: 31 },
    { day: 'Fri', views: 1450, inquiries: 45 },
    { day: 'Sat', views: 890, inquiries: 22 },
    { day: 'Sun', views: 760, inquiries: 19 },
  ];

  const maxViews = Math.max(...activityData.map((d) => d.views));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner & Quick Actions Bar */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#171717] via-[#111111] to-[#090909] border border-[#D99A28]/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFC857] font-semibold">
              Operational Status: Nominal
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            Team Pentatech Content Command Center
          </h2>
          <p className="text-xs text-[#A5A5A5] max-w-xl">
            Manage public website sections, review incoming fellowship applications, and curate technical portfolio assets in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('homepage')}
            className="px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#222] border border-[#D99A28]/30 text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>Edit Homepage</span>
          </button>

          <button
            onClick={() => onSelectTab('projects')}
            className="px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#222] border border-[#D99A28]/30 text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>Add Project</span>
          </button>

          <button
            onClick={onViewLiveSite}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-bold hover:shadow-[0_0_20px_rgba(255,200,87,0.35)] transition-all flex items-center gap-1.5"
          >
            <span>Live Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => {
          const IconComp = s.icon;
          return (
            <div
              key={s.title}
              onClick={s.action}
              className={`p-4 rounded-xl bg-[#111111] border border-[#D99A28]/25 hover:border-[#FFC857]/50 transition-all flex flex-col justify-between ${
                s.action ? 'cursor-pointer group' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <IconComp className={`w-4 h-4 ${s.color}`} />
                {s.action && (
                  <ArrowUpRight className="w-3 h-3 text-[#555] group-hover:text-[#FFC857] transition-colors" />
                )}
              </div>
              <div>
                <span className="text-lg sm:text-xl font-display font-bold text-white tabular-nums block">
                  {s.value}
                </span>
                <span className="text-[11px] font-semibold text-[#A5A5A5] line-clamp-1 block mt-0.5">
                  {s.title}
                </span>
                <span className="text-[10px] text-[#777] font-mono line-clamp-1 block mt-0.5">
                  {s.note}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Website Traffic & Telemetry SVG Chart */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857]">
                Live Platform Engagement
              </span>
              <h3 className="text-base font-bold text-white">
                Website Activity & Application Traffic (Weekly Trend)
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-[#888]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFC857]" />
                Daily Views
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#168BDA]" />
                Inquiries
              </span>
            </div>
          </div>

          {/* Clean SVG Interactive Bar Chart */}
          <div className="h-56 w-full flex items-end gap-3 sm:gap-6 pt-4 border-b border-[#D99A28]/20 pb-2">
            {activityData.map((item) => {
              const heightPercent = (item.views / maxViews) * 100;
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[10px] font-mono text-[#FFC857] opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.views}
                  </div>
                  <div className="w-full max-w-[42px] bg-[#171717] rounded-t-md relative overflow-hidden flex items-end h-full">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-[#D99A28]/60 via-[#FFC857]/80 to-[#FFE09A] rounded-t-md transition-all duration-500 group-hover:brightness-125"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-[#777] group-hover:text-white transition-colors">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2 text-xs font-mono text-center">
            <div className="p-3 rounded-lg bg-[#171717] border border-[#D99A28]/15">
              <span className="text-[#777] block text-[10px]">Weekly Unique Reach</span>
              <span className="text-white font-bold text-sm tabular-nums">6,350+</span>
            </div>
            <div className="p-3 rounded-lg bg-[#171717] border border-[#D99A28]/15">
              <span className="text-[#777] block text-[10px]">Avg Session Dwell</span>
              <span className="text-white font-bold text-sm tabular-nums">4m 12s</span>
            </div>
            <div className="p-3 rounded-lg bg-[#171717] border border-[#D99A28]/15">
              <span className="text-[#777] block text-[10px]">Application Conversion</span>
              <span className="text-[#FFC857] font-bold text-sm tabular-nums">2.6%</span>
            </div>
          </div>
        </div>

        {/* Right: Content Publication Distribution */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857]">
              Content Distribution
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Managed Sections
            </h3>
            <p className="text-xs text-[#A5A5A5] mt-1">
              Distribution of published assets across categories:
            </p>

            <div className="space-y-3 mt-5">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-white">Active Projects</span>
                  <span className="text-[#FFC857] tabular-nums">{projects.length} Entries</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#171717] overflow-hidden">
                  <div className="h-full bg-[#D99A28] rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-white">Research Fellow Profiles</span>
                  <span className="text-[#FFC857] tabular-nums">{teamMembers.length} Profiles</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#171717] overflow-hidden">
                  <div className="h-full bg-[#FFC857] rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-white">Milestones & Honors</span>
                  <span className="text-[#FFC857] tabular-nums">{achievements.length} Honors</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#171717] overflow-hidden">
                  <div className="h-full bg-[#168BDA] rounded-full" style={{ width: '50%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-white">Events & Workshops</span>
                  <span className="text-[#FFC857] tabular-nums">{events.length} Events</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#171717] overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#171717] border border-[#D99A28]/20 space-y-2">
            <span className="text-[11px] font-mono text-[#FFC857] font-semibold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Direct Sync Active
            </span>
            <p className="text-xs text-[#A5A5A5] leading-relaxed">
              Edits made in any content manager are automatically rendered on the public website.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Membership Applications Queue */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857]">
              Admissions Intake
            </span>
            <h3 className="text-base font-bold text-white">
              Recent Membership Applications
            </h3>
          </div>
          <button
            onClick={() => onSelectTab('membership')}
            className="text-xs font-semibold text-[#FFC857] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All ({applications.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D99A28]/20 text-[#666] font-mono uppercase text-[10px]">
                <th className="pb-3 font-semibold">Applicant</th>
                <th className="pb-3 font-semibold">Track</th>
                <th className="pb-3 font-semibold">Location</th>
                <th className="pb-3 font-semibold">Submitted</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D99A28]/10 text-white">
              {applications.slice(0, 5).map((app) => (
                <tr key={app.id} className="hover:bg-[#171717]/50 transition-colors">
                  <td className="py-3 font-semibold">
                    <div>
                      <span>{app.fullName}</span>
                      <span className="text-[10px] text-[#777] block font-mono">{app.email}</span>
                    </div>
                  </td>
                  <td className="py-3 text-[#A5A5A5]">{app.primaryTrack}</td>
                  <td className="py-3 text-[#A5A5A5]">{app.location}</td>
                  <td className="py-3 font-mono text-[#777]">{app.submittedAt}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${
                        app.status === 'Approved'
                          ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20'
                          : app.status === 'Rejected'
                          ? 'text-[#B52B20] border-[#B52B20]/30 bg-red-950/20'
                          : 'text-[#FFC857] border-[#D99A28]/30 bg-[#D99A28]/10'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {app.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'Approved')}
                          className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600 hover:text-black transition-colors"
                          title="Approve Applicant"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                          className="p-1.5 rounded-lg bg-red-950/40 border border-[#B52B20]/40 text-[#B52B20] hover:bg-[#B52B20] hover:text-white transition-colors"
                          title="Reject Application"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[#666] font-mono text-[10px]">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
