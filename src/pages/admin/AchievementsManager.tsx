import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Achievement } from '../../types';
import {
  Trophy,
  Award,
  Medal,
  Plus,
  Edit3,
  Trash2,
  Star,
  Image as ImageIcon,
  ShieldCheck,
  CheckCircle,
  X,
  Calendar,
  Building2
} from 'lucide-react';

export const AchievementsManager: React.FC = () => {
  const {
    achievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    toggleAchievementFeatured,
  } = useCMS();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState<Omit<Achievement, 'id'>>({
    title: '',
    category: 'Venture & Engineering Award',
    year: '2026',
    date: 'February 2026',
    issuer: '',
    recognitionPosition: '1st Place',
    badgeTier: 'gold',
    description: '',
    certificateUrl: '/src/assets/images/award_trophy_recognition_1793741742036.jpg',
    isPublished: true,
    isFeatured: true,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState({
      title: '',
      category: 'Venture & Engineering Award',
      year: '2026',
      date: '2026',
      issuer: '',
      recognitionPosition: '1st Place',
      badgeTier: 'gold',
      description: '',
      certificateUrl: '/src/assets/images/award_trophy_recognition_1793741742036.jpg',
      isPublished: true,
      isFeatured: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (ach: Achievement) => {
    setEditingId(ach.id);
    setFormState({
      title: ach.title,
      category: ach.category,
      year: ach.year,
      date: ach.date || ach.year,
      issuer: ach.issuer,
      recognitionPosition: ach.recognitionPosition || 'Award',
      badgeTier: ach.badgeTier || 'gold',
      description: ach.description,
      certificateUrl: ach.certificateUrl || '/src/assets/images/award_trophy_recognition_1793741742036.jpg',
      isPublished: ach.isPublished ?? true,
      isFeatured: ach.isFeatured ?? false,
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.issuer.trim()) return;

    if (editingId) {
      updateAchievement(editingId, formState);
    } else {
      addAchievement(formState);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857]">
            Institutional Laurels Directorate
          </span>
          <h2 className="text-lg sm:text-xl font-display font-bold text-white mt-0.5">
            Achievements & Competition Laurels Manager
          </h2>
          <p className="text-xs text-[#A5A5A5] mt-1">
            Manage awards, hackathon recognitions, certificate images, and select which achievements appear prominently on the Homepage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold hover:shadow-[0_0_20px_rgba(255,200,87,0.35)] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Achievement</span>
        </button>
      </div>

      {/* Table of Achievements */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D99A28]/20 pb-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            All Recognitions & Accolades ({achievements.length})
          </span>
          <span className="text-[11px] font-mono text-[#888]">
            Click the star to toggle Homepage featuring
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D99A28]/20 text-[#666] font-mono uppercase text-[10px]">
                <th className="pb-3 font-semibold w-12">Position</th>
                <th className="pb-3 font-semibold">Award / Recognition Title</th>
                <th className="pb-3 font-semibold">Competition / Organisation</th>
                <th className="pb-3 font-semibold">Date / Year</th>
                <th className="pb-3 font-semibold">Badge Tier</th>
                <th className="pb-3 font-semibold text-center">Featured</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D99A28]/10 text-white">
              {achievements.map((ach) => (
                <tr key={ach.id} className="hover:bg-[#171717]/60 transition-colors">
                  <td className="py-3 font-mono font-bold text-[#FFC857]">
                    <span className="px-2 py-0.5 rounded bg-[#171717] border border-[#D99A28]/30 text-[10px]">
                      {ach.recognitionPosition || 'Award'}
                    </span>
                  </td>
                  <td className="py-3 font-semibold max-w-xs">
                    <span className="truncate block text-white">{ach.title}</span>
                    <span className="text-[10px] text-[#777] block font-mono">{ach.category}</span>
                  </td>
                  <td className="py-3 text-[#A5A5A5]">
                    <span className="text-white font-medium">{ach.issuer}</span>
                  </td>
                  <td className="py-3 font-mono text-[#888]">
                    {ach.date || ach.year}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                        ach.badgeTier === 'gold'
                          ? 'bg-[#FFC857]/20 text-[#FFC857] border border-[#D99A28]/40'
                          : ach.badgeTier === 'silver'
                          ? 'bg-zinc-800 text-zinc-300 border border-zinc-600'
                          : 'bg-sky-950/40 text-sky-400 border border-sky-500/30'
                      }`}
                    >
                      {ach.badgeTier || 'Standard'}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => toggleAchievementFeatured(ach.id)}
                      className={`p-1.5 rounded transition-colors ${
                        ach.isFeatured
                          ? 'text-[#FFC857] hover:text-[#FFE09A]'
                          : 'text-[#444] hover:text-[#777]'
                      }`}
                      title={ach.isFeatured ? 'Featured on Homepage (Click to disable)' : 'Not Featured (Click to enable)'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(ach)}
                        className="p-1.5 rounded-lg bg-[#171717] hover:bg-[#222] text-[#A5A5A5] hover:text-[#FFC857] border border-[#D99A28]/20 transition-colors"
                        title="Edit Achievement"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove achievement "${ach.title}"?`)) {
                            deleteAchievement(ach.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-[#171717] hover:bg-red-950/40 text-[#A5A5A5] hover:text-[#B52B20] border border-[#D99A28]/20 transition-colors"
                        title="Delete Achievement"
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
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/40 shadow-2xl text-[#A5A5A5] space-y-5 sm:space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#D99A28]/20 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit Achievement Record' : 'Register New Achievement'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded text-[#777] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Achievement Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. FIRST PLACE — ALX"
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                    Recognition Position *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.recognitionPosition}
                    onChange={(e) => setFormState({ ...formState, recognitionPosition: e.target.value })}
                    placeholder="e.g. 1st Place, 4th Place, Winner"
                    className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                    Competition / Organisation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.issuer}
                    onChange={(e) => setFormState({ ...formState, issuer: e.target.value })}
                    placeholder="e.g. ALX, PanAfrica AI & Innovation Challenge"
                    className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                    Date / Ceremony
                  </label>
                  <input
                    type="text"
                    value={formState.date}
                    onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                    placeholder="e.g. November 2025"
                    className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formState.year}
                    onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                    Badge Tier
                  </label>
                  <select
                    value={formState.badgeTier}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        badgeTier: e.target.value as 'gold' | 'silver' | 'bronze' | 'finalist',
                      })
                    }
                    className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  >
                    <option value="gold">Gold (1st Place)</option>
                    <option value="silver">Silver (2nd Place)</option>
                    <option value="bronze">Bronze (3rd Place)</option>
                    <option value="finalist">Finalist / 4th Place</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formState.category}
                  onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                  placeholder="e.g. Venture & Engineering Award, Continental Competition"
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Certificate Image Asset
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formState.certificateUrl}
                    onChange={(e) => setFormState({ ...formState, certificateUrl: e.target.value })}
                    placeholder="Certificate image URL or upload file"
                    className="flex-1 px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  />
                  <label className="px-3 py-2 bg-[#222] hover:bg-[#333] border border-[#D99A28]/30 rounded-xl text-xs text-[#FFC857] cursor-pointer shrink-0 flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            if (uploadEvent.target?.result) {
                              setFormState({
                                ...formState,
                                certificateUrl: uploadEvent.target.result as string,
                              });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Description / Citation *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Details of the competition verdict, scoring, or panel recognition..."
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formState.isFeatured}
                  onChange={(e) => setFormState({ ...formState, isFeatured: e.target.checked })}
                  className="rounded border-[#D99A28]/40 bg-[#171717] text-[#FFC857]"
                />
                <label htmlFor="featuredToggle" className="text-xs text-white cursor-pointer">
                  Feature prominently on the Homepage Achievements showcase
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#D99A28]/20">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs text-[#A5A5A5] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold cursor-pointer"
                >
                  {editingId ? 'Update Achievement' : 'Save Achievement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
