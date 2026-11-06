import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Project, ProjectStatus } from '../../types';
import { Plus, Edit3, Trash2, Star, ExternalLink, Image as ImageIcon, X } from 'lucide-react';

export const ProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useCMS();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState<Omit<Project, 'id'>>({
    title: '',
    category: 'Autonomous Systems',
    status: 'Active R&D',
    summary: '',
    description: '',
    imageUrl: '/src/assets/images/project_autonomous_drone_1793734784583.jpg',
    leadArchitect: 'Pentatech Engineering Lab [Placeholder]',
    completionYear: '2026',
    tags: ['Robotics', 'Telemetry'],
    isFeatured: true,
    demoUrl: '',
    githubUrl: '',
  });

  const [tagInput, setTagInput] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState({
      title: '',
      category: 'Autonomous Systems',
      status: 'Active R&D',
      summary: '',
      description: '',
      imageUrl: '/src/assets/images/project_autonomous_drone_1793734784583.jpg',
      leadArchitect: 'Pentatech Engineering Lab [Placeholder]',
      completionYear: '2026',
      tags: ['Hardware', 'Deeptech'],
      isFeatured: true,
      demoUrl: '',
      githubUrl: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingId(project.id);
    setFormState({
      title: project.title,
      category: project.category,
      status: project.status,
      summary: project.summary,
      description: project.description,
      imageUrl: project.imageUrl,
      leadArchitect: project.leadArchitect,
      completionYear: project.completionYear,
      tags: project.tags || [],
      isFeatured: project.isFeatured,
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    if (editingId) {
      updateProject(editingId, formState);
    } else {
      addProject(formState);
    }
    setModalOpen(false);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formState.tags.includes(tagInput.trim())) {
      setFormState({ ...formState, tags: [...formState.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormState({ ...formState, tags: formState.tags.filter((t) => t !== tag) });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857]">
            Portfolio Directorate
          </span>
          <h2 className="text-lg sm:text-xl font-display font-bold text-white mt-0.5">
            Projects & Field Systems Manager
          </h2>
          <p className="text-xs text-[#A5A5A5] mt-1">
            Publish new hardware and software prototypes, manage readiness statuses, and feature highlights.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold hover:shadow-[0_0_20px_rgba(255,200,87,0.35)] transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table & Management Cards */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D99A28]/20 pb-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            All Fielded Projects ({projects.length})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D99A28]/20 text-[#666] font-mono uppercase text-[10px]">
                <th className="pb-3 font-semibold">Visual</th>
                <th className="pb-3 font-semibold">Project Title</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Featured</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D99A28]/10 text-white">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#171717]/60 transition-colors">
                  <td className="py-3 w-16">
                    <div className="w-12 h-9 rounded bg-[#171717] overflow-hidden border border-[#D99A28]/20">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </td>
                  <td className="py-3 font-semibold max-w-xs">
                    <span className="truncate block">{proj.title}</span>
                    <span className="text-[10px] text-[#777] block font-mono">{proj.leadArchitect}</span>
                  </td>
                  <td className="py-3 text-[#A5A5A5]">{proj.category}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#171717] border border-[#D99A28]/30 text-[#FFC857]">
                      {proj.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => updateProject(proj.id, { isFeatured: !proj.isFeatured })}
                      className={`p-1 rounded transition-colors ${
                        proj.isFeatured ? 'text-[#FFC857]' : 'text-[#444] hover:text-[#777]'
                      }`}
                      title={proj.isFeatured ? 'Featured on Homepage' : 'Not Featured'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg bg-[#171717] hover:bg-[#222] text-[#A5A5A5] hover:text-[#FFC857] border border-[#D99A28]/20 transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove project "${proj.title}"?`)) {
                            deleteProject(proj.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-[#171717] hover:bg-red-950/40 text-[#A5A5A5] hover:text-[#B52B20] border border-[#D99A28]/20 transition-colors"
                        title="Delete Project"
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
                {editingId ? 'Edit Project Specification' : 'Register New Project'}
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
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Autonomous Logistics Drone System"
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    list="category-suggestions"
                    required
                    value={formState.category}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        category: e.target.value,
                      })
                    }
                    placeholder="e.g. EdTech / Artificial Intelligence"
                    className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  />
                  <datalist id="category-suggestions">
                    <option value="EdTech / Artificial Intelligence" />
                    <option value="Inclusive Education / AI" />
                    <option value="AgriTech / FinTech" />
                    <option value="FinTech" />
                    <option value="Autonomous Systems" />
                    <option value="Clean Energy" />
                    <option value="Cybersecurity" />
                    <option value="AI & Quantum" />
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                    Readiness / Development Status
                  </label>
                  <select
                    value={formState.status}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        status: e.target.value as ProjectStatus,
                      })
                    }
                    className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  >
                    <option value="In Development">In Development</option>
                    <option value="Active R&D">Active R&D</option>
                    <option value="Prototype">Prototype</option>
                    <option value="Field Testing">Field Testing</option>
                    <option value="Production">Production</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Card Summary
                </label>
                <textarea
                  rows={2}
                  value={formState.summary}
                  onChange={(e) => setFormState({ ...formState, summary: e.target.value })}
                  placeholder="One or two sentences explaining the core capability..."
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Full Technical Specification / Description Placeholder
                </label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Detailed specifications, telemetry, and payload parameters..."
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                    Project Image Asset
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formState.imageUrl}
                      onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
                      placeholder="Image URL or upload file"
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
                                  imageUrl: uploadEvent.target.result as string,
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
                    Lead Architect / Division
                  </label>
                  <input
                    type="text"
                    value={formState.leadArchitect}
                    onChange={(e) => setFormState({ ...formState, leadArchitect: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Tags (Add keyword & click +)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="e.g. Telemetry, Robotics"
                    className="flex-1 px-3 py-1.5 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-1.5 rounded-lg bg-[#222] border border-[#D99A28]/30 text-white text-xs hover:bg-[#333]"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formState.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#171717] border border-[#D99A28]/30 text-xs text-[#FFC857] flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
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
                  Feature this project on the Homepage showcase
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
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold"
                >
                  {editingId ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
