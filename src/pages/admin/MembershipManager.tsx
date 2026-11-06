import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MembershipApplication } from '../../types';
import {
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  ExternalLink,
  Github,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  User
} from 'lucide-react';

export const MembershipManager: React.FC = () => {
  const { applications, updateApplicationStatus, deleteApplication, addToast } = useCMS();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [selectedApp, setSelectedApp] = useState<MembershipApplication | null>(null);

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.location.toLowerCase().includes(search.toLowerCase()) ||
      app.primaryTrack.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857]">
            Admissions Secretariat
          </span>
          <h2 className="text-xl font-display font-bold text-white mt-0.5">
            Membership & Fellowship Applications
          </h2>
          <p className="text-xs text-[#A5A5A5] mt-1">
            Review incoming applications submitted through the public website Admissions portal.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-[#171717] border border-[#D99A28]/30 text-xs font-mono text-[#FFC857]">
            Total: {applications.length} | Pending: {applications.filter((a) => a.status === 'Pending').length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#111111] border border-[#D99A28]/20">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applicant name, email, or track..."
            className="w-full pl-9 pr-3 py-2 bg-[#171717] border border-[#D99A28]/25 rounded-lg text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#FFC857]"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === status
                  ? 'bg-[#FFC857] text-black font-semibold'
                  : 'bg-[#171717] text-[#A5A5A5] hover:text-white border border-[#D99A28]/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-4">
        {filteredApps.length === 0 ? (
          <p className="text-xs text-[#777] text-center py-8">
            No membership applications match your current filters.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#D99A28]/20 text-[#666] font-mono uppercase text-[10px]">
                  <th className="pb-3 font-semibold">Applicant</th>
                  <th className="pb-3 font-semibold">Track</th>
                  <th className="pb-3 font-semibold">Location</th>
                  <th className="pb-3 font-semibold">Experience</th>
                  <th className="pb-3 font-semibold">Submitted</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D99A28]/10 text-white">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-[#171717]/60 transition-colors">
                    <td className="py-3 font-semibold">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-left hover:text-[#FFC857] transition-colors"
                      >
                        <div className="text-white font-medium hover:underline">{app.fullName}</div>
                        <div className="text-[10px] text-[#777] font-mono">{app.email}</div>
                      </button>
                    </td>
                    <td className="py-3 text-[#A5A5A5]">{app.primaryTrack}</td>
                    <td className="py-3 text-[#A5A5A5]">{app.location}</td>
                    <td className="py-3 font-mono text-[#888]">{app.yearsOfExperience}</td>
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
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-2.5 py-1 rounded bg-[#171717] hover:bg-[#222] text-[#FFC857] border border-[#D99A28]/30 transition-colors"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'Approved')}
                          className="p-1 rounded bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                          className="p-1 rounded bg-red-950/30 text-[#B52B20] hover:bg-[#B52B20] hover:text-white transition-colors"
                          title="Reject"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete application for ${app.fullName}?`)) {
                              deleteApplication(app.id);
                            }
                          }}
                          className="p-1 rounded text-[#777] hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Applicant Details Modal / Review Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className="w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/40 shadow-2xl text-[#A5A5A5] space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#D99A28]/20 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#171717] border border-[#D99A28]/40 flex items-center justify-center text-sm font-bold text-[#FFC857]">
                  {selectedApp.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedApp.fullName}</h3>
                  <span className="text-[10px] font-mono text-[#D99A28]">{selectedApp.primaryTrack}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded text-[#777] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[#666] block text-[10px]">Email</span>
                <span className="text-white flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 text-[#D99A28]" />
                  {selectedApp.email}
                </span>
              </div>
              <div>
                <span className="text-[#666] block text-[10px]">Phone</span>
                <span className="text-white flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-[#D99A28]" />
                  {selectedApp.phone}
                </span>
              </div>
              <div>
                <span className="text-[#666] block text-[10px]">Location</span>
                <span className="text-white flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#D99A28]" />
                  {selectedApp.location}
                </span>
              </div>
              <div>
                <span className="text-[#666] block text-[10px]">Experience Level</span>
                <span className="text-white mt-0.5 block">{selectedApp.yearsOfExperience}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#666]">
                Portfolio & Repositories
              </span>
              <div className="flex flex-wrap gap-3 text-xs">
                {selectedApp.portfolioUrl && (
                  <a
                    href={selectedApp.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FFC857] hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Portfolio Link</span>
                  </a>
                )}
                {selectedApp.githubUrl && (
                  <a
                    href={selectedApp.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:underline flex items-center gap-1"
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub Profile</span>
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-[#171717] border border-[#D99A28]/20">
              <span className="text-[10px] font-mono uppercase text-[#FFC857] block">
                Applicant Motivation & Profile Statement
              </span>
              <p className="text-xs text-white/90 leading-relaxed">
                {selectedApp.motivation}
              </p>
            </div>

            <div className="pt-4 border-t border-[#D99A28]/20 flex items-center justify-between">
              <span className="text-xs font-mono">
                Current Status:{' '}
                <strong
                  className={
                    selectedApp.status === 'Approved'
                      ? 'text-emerald-400'
                      : selectedApp.status === 'Rejected'
                      ? 'text-red-400'
                      : 'text-[#FFC857]'
                  }
                >
                  {selectedApp.status}
                </strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    updateApplicationStatus(selectedApp.id, 'Rejected');
                    setSelectedApp({ ...selectedApp, status: 'Rejected' });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-[#B52B20]/40 text-[#B52B20] text-xs font-semibold hover:bg-[#B52B20] hover:text-white transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    updateApplicationStatus(selectedApp.id, 'Approved');
                    setSelectedApp({ ...selectedApp, status: 'Approved' });
                  }}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-bold hover:shadow-[0_0_15px_rgba(255,200,87,0.3)] transition-all"
                >
                  Approve Fellowship
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
