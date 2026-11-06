import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { Save, Shield, UserCheck, Plus, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

interface SettingsManagerProps {
  initialSection?: 'seo' | 'settings' | 'admin-users';
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  initialSection = 'settings',
}) => {
  const { settings, updateSettings, addToast } = useCMS();
  const { user } = useAuth();

  const [activeSection, setActiveSection] = useState<'seo' | 'settings' | 'admin-users'>(
    initialSection
  );

  const [seoForm, setSeoForm] = useState({
    metaTitle: settings.seo.metaTitle,
    metaDescription: settings.seo.metaDescription,
    keywords: settings.seo.keywords,
  });

  const [generalForm, setGeneralForm] = useState({
    orgName: settings.orgName,
    tagline: settings.tagline,
    contactEmail: settings.contactEmail,
    phone: settings.phone,
    address: settings.address,
  });

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ seo: seoForm });
    addToast('SEO Saved', 'Meta title, description, and keywords updated.');
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(generalForm);
    addToast('General Settings Saved', 'Organization details and contact info published.');
  };

  const adminUsersList = [
    {
      id: 'usr-1',
      name: user ? user.name : 'Chief Administrator',
      email: user ? user.email : 'admin@pentatech.org',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: 'Today at 11:30 AM',
    },
    {
      id: 'usr-2',
      name: 'Admissions Lead',
      email: 'admissions@pentatech.org',
      role: 'Lead Editor',
      status: 'Active',
      lastLogin: 'Yesterday at 4:15 PM',
    },
    {
      id: 'usr-3',
      name: 'Research Director',
      email: 'director@pentatech.org',
      role: 'Operations Manager',
      status: 'Active',
      lastLogin: '3 days ago',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Sub-navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#111111] border border-[#D99A28]/25 w-fit">
        <button
          onClick={() => setActiveSection('settings')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSection === 'settings'
              ? 'bg-[#FFC857] text-black shadow-sm'
              : 'text-[#A5A5A5] hover:text-white'
          }`}
        >
          General Organization Settings
        </button>
        <button
          onClick={() => setActiveSection('seo')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSection === 'seo'
              ? 'bg-[#FFC857] text-black shadow-sm'
              : 'text-[#A5A5A5] hover:text-white'
          }`}
        >
          SEO & Meta Tags
        </button>
        <button
          onClick={() => setActiveSection('admin-users')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSection === 'admin-users'
              ? 'bg-[#FFC857] text-black shadow-sm'
              : 'text-[#A5A5A5] hover:text-white'
          }`}
        >
          Admin Users & Roles ({adminUsersList.length})
        </button>
      </div>

      {/* =========================================
          SECTION 1: GENERAL SETTINGS
          ========================================= */}
      {activeSection === 'settings' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-6 max-w-3xl">
          <div className="border-b border-[#D99A28]/20 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Organization Identity & Contact Settings
            </h3>
            <p className="text-xs text-[#777] mt-0.5">
              Updates here will be reflected across public footers, contact hubs, and email notifications.
            </p>
          </div>

          <form onSubmit={handleSaveGeneral} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Organization Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={generalForm.orgName}
                  onChange={(e) => setGeneralForm({ ...generalForm, orgName: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  required
                  value={generalForm.tagline}
                  onChange={(e) => setGeneralForm({ ...generalForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-[#FFC857] font-semibold focus:outline-none focus:border-[#FFC857]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Public Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={generalForm.contactEmail}
                  onChange={(e) =>
                    setGeneralForm({ ...generalForm, contactEmail: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Secretariat Phone
                </label>
                <input
                  type="text"
                  value={generalForm.phone}
                  onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                Headquarters Campus Address
              </label>
              <textarea
                rows={2}
                value={generalForm.address}
                onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold hover:shadow-[0_0_20px_rgba(255,200,87,0.35)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save General Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================
          SECTION 2: SEO & METADATA
          ========================================= */}
      {activeSection === 'seo' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-6 max-w-3xl">
          <div className="border-b border-[#D99A28]/20 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Search Engine Optimization & Social Graph
            </h3>
            <p className="text-xs text-[#777] mt-0.5">
              Configure page titles, OpenGraph description cards, and indexer keywords.
            </p>
          </div>

          <form onSubmit={handleSaveSeo} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                Meta Title
              </label>
              <input
                type="text"
                required
                value={seoForm.metaTitle}
                onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                Meta Description (Search Snippet)
              </label>
              <textarea
                rows={3}
                required
                value={seoForm.metaDescription}
                onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={seoForm.keywords}
                onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold hover:shadow-[0_0_20px_rgba(255,200,87,0.35)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save SEO Configuration</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================
          SECTION 3: ADMIN USERS & RBAC
          ========================================= */}
      {activeSection === 'admin-users' && (
        <div className="p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-5">
          <div className="flex items-center justify-between border-b border-[#D99A28]/20 pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Authorized Administrative Users
              </h3>
              <p className="text-xs text-[#777] mt-0.5">
                Manage roles and permissions for Team Pentatech CMS editors and operators.
              </p>
            </div>

            <button
              onClick={() =>
                addToast('Invite Initiated', 'Invitation dispatch interface prepared.')
              }
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Invite Admin</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#D99A28]/20 text-[#666] font-mono uppercase text-[10px]">
                  <th className="pb-3 font-semibold">Administrator</th>
                  <th className="pb-3 font-semibold">Assigned Role</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Last Activity</th>
                  <th className="pb-3 font-semibold text-right">Access Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D99A28]/10 text-white">
                {adminUsersList.map((adm) => (
                  <tr key={adm.id} className="hover:bg-[#171717]/50 transition-colors">
                    <td className="py-3 font-semibold">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#171717] border border-[#D99A28]/30 flex items-center justify-center text-xs font-bold text-[#FFC857]">
                          {adm.name.charAt(0)}
                        </div>
                        <div>
                          <span>{adm.name}</span>
                          <span className="text-[10px] text-[#777] block font-mono">
                            {adm.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-[#D99A28]">{adm.role}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/30 text-emerald-400 border border-emerald-500/30">
                        {adm.status}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-[#777]">{adm.lastLogin}</td>
                    <td className="py-3 text-right">
                      <span className="text-[#888] font-mono text-[10px]">RBAC Enforced</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
