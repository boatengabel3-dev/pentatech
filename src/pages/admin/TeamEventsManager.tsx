import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeamMember, Achievement, EventItem, Partner } from '../../types';
import {
  Users,
  Trophy,
  Calendar,
  Handshake,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  EyeOff,
  X
} from 'lucide-react';

interface TeamEventsManagerProps {
  initialSubTab?: 'team' | 'achievements' | 'events' | 'partnerships';
}

export const TeamEventsManager: React.FC<TeamEventsManagerProps> = ({
  initialSubTab = 'team',
}) => {
  const {
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    achievements,
    addAchievement,
    deleteAchievement,
    events,
    addEvent,
    deleteEvent,
    partners,
    addPartner,
    deletePartner,
    addToast,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<'team' | 'achievements' | 'events' | 'partnerships'>(
    initialSubTab
  );

  // Modals
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [achModalOpen, setAchModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  // Team Form
  const [teamForm, setTeamForm] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    role: '',
    department: 'Robotics & Hardware',
    bio: '',
    avatarUrl: '/src/assets/images/community_innovation_lab_1793734786218.jpg',
    isPublished: true,
    socials: { linkedin: '#' },
  });

  // Achievement Form
  const [achForm, setAchForm] = useState<Omit<Achievement, 'id'>>({
    title: '',
    category: 'International Award',
    year: '2026',
    issuer: '',
    description: '',
    isPublished: true,
    isFeatured: false,
  });

  // Event Form
  const [eventForm, setEventForm] = useState<Omit<EventItem, 'id'>>({
    title: '',
    category: 'Technical Summit',
    date: 'NOV 2026',
    location: 'Campus Auditorium',
    description: '',
    status: 'Upcoming',
    bannerUrl: '/src/assets/images/hero_african_tech_hub_1793734785317.jpg',
  });

  // Partner Form
  const [partnerForm, setPartnerForm] = useState<Omit<Partner, 'id'>>({
    name: '',
    tier: 'Strategic Partner',
    logoUrl: '/assets/pentatech-logo.png',
    website: 'https://example.org',
    description: '',
  });

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name) return;
    addTeamMember(teamForm);
    setTeamModalOpen(false);
    setTeamForm({
      name: '',
      role: '',
      department: 'Robotics & Hardware',
      bio: '',
      avatarUrl: '/src/assets/images/community_innovation_lab_1793734786218.jpg',
      isPublished: true,
      socials: { linkedin: '#' },
    });
  };

  const handleAddAch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achForm.title) return;
    addAchievement(achForm);
    setAchModalOpen(false);
    setAchForm({
      title: '',
      category: 'International Award',
      year: '2026',
      issuer: '',
      description: '',
      isPublished: true,
      isFeatured: false,
    });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title) return;
    addEvent(eventForm);
    setEventModalOpen(false);
  };

  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name) return;
    addPartner(partnerForm);
    setPartnerModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Subtab Selector */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#111111] border border-[#D99A28]/25 w-full sm:w-fit overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('team')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
            activeTab === 'team'
              ? 'bg-[#FFC857] text-black shadow-sm'
              : 'text-[#A5A5A5] hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Team Manager ({teamMembers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
            activeTab === 'achievements'
              ? 'bg-[#FFC857] text-black shadow-sm'
              : 'text-[#A5A5A5] hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Achievements ({achievements.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
            activeTab === 'events'
              ? 'bg-[#FFC857] text-black shadow-sm'
              : 'text-[#A5A5A5] hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Events Manager ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('partnerships')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
            activeTab === 'partnerships'
              ? 'bg-[#FFC857] text-black shadow-sm'
              : 'text-[#A5A5A5] hover:text-white'
          }`}
        >
          <Handshake className="w-3.5 h-3.5" />
          <span>Partnerships ({partners.length})</span>
        </button>
      </div>

      {/* =========================================
          TAB 1: TEAM MEMBERS
          ========================================= */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Research Leads & Fellow Profiles</h3>
            <button
              onClick={() => setTeamModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Team Fellow</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-5 rounded-xl bg-[#111111] border border-[#D99A28]/20 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-[#D99A28]/40 mb-3 mx-auto">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-white text-center">{member.name}</h4>
                  <p className="text-xs text-[#FFC857] text-center mt-0.5">{member.role}</p>
                  <span className="text-[10px] font-mono text-[#777] block text-center mt-1">
                    {member.department}
                  </span>
                  <p className="text-xs text-[#A5A5A5] mt-3 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#D99A28]/15 flex items-center justify-between">
                  <button
                    onClick={() =>
                      updateTeamMember(member.id, { isPublished: !member.isPublished })
                    }
                    className={`text-[10px] font-mono flex items-center gap-1 ${
                      member.isPublished ? 'text-emerald-400' : 'text-[#666]'
                    }`}
                  >
                    {member.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{member.isPublished ? 'Published' : 'Draft'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove ${member.name}?`)) deleteTeamMember(member.id);
                    }}
                    className="p-1 rounded text-[#777] hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================
          TAB 2: ACHIEVEMENTS
          ========================================= */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Honors, Grants & Registered Patents</h3>
            <button
              onClick={() => setAchModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Achievement</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-6 rounded-xl bg-[#111111] border border-[#D99A28]/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#D99A28] mb-2">
                    <span>{ach.category}</span>
                    <span className="text-white font-bold">{ach.year}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">{ach.title}</h4>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed mb-3">
                    {ach.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D99A28]/15 flex items-center justify-between text-xs font-mono text-[#777]">
                  <span>Issuer: {ach.issuer}</span>
                  <button
                    onClick={() => {
                      if (confirm(`Delete achievement "${ach.title}"?`)) deleteAchievement(ach.id);
                    }}
                    className="p-1 text-[#777] hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================
          TAB 3: EVENTS
          ========================================= */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Symposiums, Sprints & Masterclasses</h3>
            <button
              onClick={() => setEventModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="rounded-xl bg-[#111111] border border-[#D99A28]/20 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full bg-black">
                  <img
                    src={evt.bannerUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-[#FFC857] border border-[#D99A28]/30">
                    {evt.status}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-xs font-mono text-[#D99A28] block">{evt.date}</span>
                  <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                  <p className="text-xs text-[#A5A5A5] line-clamp-2">{evt.description}</p>
                </div>
                <div className="p-4 pt-2 border-t border-[#D99A28]/15 flex items-center justify-between text-xs">
                  <span className="text-[#666] font-mono text-[10px]">{evt.location}</span>
                  <button
                    onClick={() => {
                      if (confirm(`Remove event "${evt.title}"?`)) deleteEvent(evt.id);
                    }}
                    className="p-1 text-[#777] hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================
          TAB 4: PARTNERSHIPS
          ========================================= */}
      {activeTab === 'partnerships' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Alliance Partners & Institutional Sponsors</h3>
            <button
              onClick={() => setPartnerModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Partner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((ptn) => (
              <div
                key={ptn.id}
                className="p-5 rounded-xl bg-[#111111] border border-[#D99A28]/20 flex flex-col justify-between text-center"
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{ptn.name}</h4>
                  <span className="text-xs font-mono text-[#D99A28] block mt-0.5">{ptn.tier}</span>
                  <p className="text-xs text-[#A5A5A5] mt-2 line-clamp-2 leading-relaxed">
                    {ptn.description}
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-[#D99A28]/15 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#666]">Active Link</span>
                  <button
                    onClick={() => {
                      if (confirm(`Delete partner ${ptn.name}?`)) deletePartner(ptn.id);
                    }}
                    className="p-1 text-[#777] hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Modal */}
      {teamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/40 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white">Register Research Fellow</h3>
            <form onSubmit={handleAddTeam} className="space-y-3">
              <div>
                <label className="block text-[#A5A5A5] mb-1 font-mono uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  placeholder="e.g. Dr. Kwame Mensah"
                  className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-[#A5A5A5] mb-1 font-mono uppercase">Title / Role *</label>
                <input
                  type="text"
                  required
                  value={teamForm.role}
                  onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                  placeholder="Principal Robotics Architect"
                  className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-[#A5A5A5] mb-1 font-mono uppercase">Department</label>
                <select
                  value={teamForm.department}
                  onChange={(e) =>
                    setTeamForm({
                      ...teamForm,
                      department: e.target.value as TeamMember['department'],
                    })
                  }
                  className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-white"
                >
                  <option value="Robotics & Hardware">Robotics & Hardware</option>
                  <option value="AI & Computational Systems">AI & Computational Systems</option>
                  <option value="Energy & Infrastructure">Energy & Infrastructure</option>
                  <option value="Operations & Ecosystem">Operations & Ecosystem</option>
                  <option value="Executive Leadership">Executive Leadership</option>
                </select>
              </div>
              <div>
                <label className="block text-[#A5A5A5] mb-1 font-mono uppercase">Bio Summary</label>
                <textarea
                  rows={2}
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  placeholder="Research focus and engineering background..."
                  className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTeamModalOpen(false)}
                  className="px-3 py-1.5 text-[#A5A5A5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#D99A28] text-black font-semibold"
                >
                  Save Fellow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Achievement Modal */}
      {achModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/40 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white">Record Milestone / Honor</h3>
            <form onSubmit={handleAddAch} className="space-y-3">
              <div>
                <label className="block text-[#A5A5A5] mb-1 font-mono uppercase">Milestone Title *</label>
                <input
                  type="text"
                  required
                  value={achForm.title}
                  onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                  placeholder="e.g. Continental Robotics Championship"
                  className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A5A5A5] mb-1 font-mono uppercase">Category</label>
                  <select
                    value={achForm.category}
                    onChange={(e) =>
                      setAchForm({
                        ...achForm,
                        category: e.target.value as Achievement['category'],
                      })
                    }
                    className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-white"
                  >
                    <option value="International Award">International Award</option>
                    <option value="Hackathon Victory">Hackathon Victory</option>
                    <option value="Patent Granted">Patent Granted</option>
                    <option value="Grant & Funding">Grant & Funding</option>
                    <option value="Research Paper">Research Paper</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#A5A5A5] mb-1 font-mono uppercase">Year</label>
                  <input
                    type="text"
                    value={achForm.year}
                    onChange={(e) => setAchForm({ ...achForm, year: e.target.value })}
                    className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#A5A5A5] mb-1 font-mono uppercase">Conferred By / Issuer</label>
                <input
                  type="text"
                  value={achForm.issuer}
                  onChange={(e) => setAchForm({ ...achForm, issuer: e.target.value })}
                  placeholder="e.g. African Mechatronics Consortium"
                  className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAchModalOpen(false)}
                  className="px-3 py-1.5 text-[#A5A5A5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#D99A28] text-black font-semibold"
                >
                  Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
