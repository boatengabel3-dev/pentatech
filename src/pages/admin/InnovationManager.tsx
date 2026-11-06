import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { InnovationCategory } from '../../types';
import {
  Plus,
  Edit3,
  Trash2,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Binary,
  Code,
  Coins,
  Sprout,
  GraduationCap,
  Zap,
  Microscope,
  Cpu,
  X,
  Check
} from 'lucide-react';

const availableIcons = [
  { name: 'Binary', label: 'Binary / AI', Icon: Binary },
  { name: 'Code', label: 'Code / Software', Icon: Code },
  { name: 'Coins', label: 'Coins / FinTech', Icon: Coins },
  { name: 'Sprout', label: 'Sprout / AgriTech', Icon: Sprout },
  { name: 'GraduationCap', label: 'Cap / EdTech', Icon: GraduationCap },
  { name: 'Zap', label: 'Zap / Energy', Icon: Zap },
  { name: 'Microscope', label: 'Microscope / R&D', Icon: Microscope },
  { name: 'Cpu', label: 'Cpu / Hardware', Icon: Cpu },
];

export const InnovationManager: React.FC = () => {
  const {
    innovationCategories,
    addInnovationCategory,
    updateInnovationCategory,
    deleteInnovationCategory,
    reorderInnovationCategories,
  } = useCMS();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState<Omit<InnovationCategory, 'id' | 'order'>>({
    title: '',
    description: '',
    imageUrl: '/src/assets/images/community_innovation_lab_1793734786218.jpg',
    iconName: 'Binary',
    tags: ['Applied Deeptech'],
  });

  const [tagInput, setTagInput] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState({
      title: '',
      description: '',
      imageUrl: '/src/assets/images/community_innovation_lab_1793734786218.jpg',
      iconName: 'Cpu',
      tags: ['Innovation'],
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: InnovationCategory) => {
    setEditingId(cat.id);
    setFormState({
      title: cat.title,
      description: cat.description,
      imageUrl: cat.imageUrl,
      iconName: cat.iconName || 'Cpu',
      tags: cat.tags || [],
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    if (editingId) {
      updateInnovationCategory(editingId, formState);
    } else {
      addInnovationCategory(formState);
    }
    setModalOpen(false);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const reordered = [...innovationCategories];
    const temp = reordered[index - 1];
    reordered[index - 1] = reordered[index];
    reordered[index] = temp;
    reorderInnovationCategories(reordered);
  };

  const handleMoveDown = (index: number) => {
    if (index === innovationCategories.length - 1) return;
    const reordered = [...innovationCategories];
    const temp = reordered[index + 1];
    reordered[index + 1] = reordered[index];
    reordered[index] = temp;
    reorderInnovationCategories(reordered);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formState.tags?.includes(tagInput.trim())) {
      setFormState({ ...formState, tags: [...(formState.tags || []), tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormState({ ...formState, tags: formState.tags?.filter((t) => t !== tag) || [] });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857]">
            Research & Innovation Directorate
          </span>
          <h2 className="text-lg sm:text-xl font-display font-bold text-white mt-0.5">
            Innovation Categories Manager
          </h2>
          <p className="text-xs text-[#A5A5A5] mt-1">
            Manage the core technological pillars, descriptions, images, tags, and display order across the website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold hover:shadow-[0_0_20px_rgba(255,200,87,0.35)] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Innovation Category</span>
        </button>
      </div>

      {/* Categories Listing */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D99A28]/20 pb-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Active Innovation Domains ({innovationCategories.length})
          </span>
          <span className="text-[11px] font-mono text-[#888]">
            Use arrows to reorder hierarchy
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D99A28]/20 text-[#666] font-mono uppercase text-[10px]">
                <th className="pb-3 font-semibold w-16">Order</th>
                <th className="pb-3 font-semibold w-16">Visual</th>
                <th className="pb-3 font-semibold">Domain Title</th>
                <th className="pb-3 font-semibold">Description</th>
                <th className="pb-3 font-semibold">Icon</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D99A28]/10 text-white">
              {innovationCategories.map((cat, idx) => {
                const IconItem = availableIcons.find((i) => i.name === cat.iconName) || availableIcons[7];
                const IconComponent = IconItem.Icon;

                return (
                  <tr key={cat.id} className="hover:bg-[#171717]/60 transition-colors">
                    <td className="py-3 font-mono font-bold text-[#FFC857]">
                      <div className="flex items-center gap-1">
                        <span>#{idx + 1}</span>
                        <div className="flex flex-col">
                          <button
                            onClick={() => handleMoveUp(idx)}
                            disabled={idx === 0}
                            className={`p-0.5 rounded hover:bg-[#222] ${idx === 0 ? 'opacity-30 cursor-not-allowed' : 'text-[#A5A5A5] hover:text-white'}`}
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleMoveDown(idx)}
                            disabled={idx === innovationCategories.length - 1}
                            className={`p-0.5 rounded hover:bg-[#222] ${idx === innovationCategories.length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-[#A5A5A5] hover:text-white'}`}
                            title="Move Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="w-12 h-9 rounded bg-[#171717] overflow-hidden border border-[#D99A28]/20">
                        <img
                          src={cat.imageUrl}
                          alt={cat.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>
                    <td className="py-3 font-semibold max-w-xs">
                      <span className="truncate block text-white">{cat.title}</span>
                      {cat.tags && cat.tags.length > 0 && (
                        <span className="text-[10px] text-[#777] block font-mono truncate">
                          {cat.tags.join(', ')}
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-[#A5A5A5] max-w-md">
                      <p className="line-clamp-2 text-xs leading-relaxed">{cat.description}</p>
                    </td>
                    <td className="py-3">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#171717] border border-[#D99A28]/30 text-[#FFC857]">
                        <IconComponent className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono">{cat.iconName || 'Cpu'}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          className="p-1.5 rounded-lg bg-[#171717] hover:bg-[#222] text-[#A5A5A5] hover:text-[#FFC857] border border-[#D99A28]/20 transition-colors"
                          title="Edit Category"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove innovation category "${cat.title}"?`)) {
                              deleteInnovationCategory(cat.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-[#171717] hover:bg-red-950/40 text-[#A5A5A5] hover:text-[#B52B20] border border-[#D99A28]/20 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
                {editingId ? 'Edit Innovation Category' : 'Add New Innovation Domain'}
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
                  Category Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Artificial Intelligence & Machine Learning"
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Outline the research scope, applied systems, and technical focus..."
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                    Image Asset URL or Upload
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formState.imageUrl}
                      onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
                      placeholder="Image URL"
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
                    Category Icon
                  </label>
                  <select
                    value={formState.iconName}
                    onChange={(e) => setFormState({ ...formState, iconName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  >
                    {availableIcons.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Technical Tags
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
                    placeholder="e.g. Neural Models, Edge Inference"
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
                  {formState.tags?.map((tag) => (
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
                  {editingId ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
