import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { NavigationItem } from '../../types';
import { ArrowUp, ArrowDown, Eye, EyeOff, Plus, Trash2, Edit2, Save, X } from 'lucide-react';

export const NavigationManager: React.FC = () => {
  const { navigation, updateNavigation, addToast } = useCMS();
  const [items, setItems] = useState<NavigationItem[]>(navigation);
  const [newItemModal, setNewItemModal] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newPath, setNewPath] = useState('');

  const moveUp = (index: number) => {
    if (index === 0) return;
    const reordered = [...items];
    const temp = reordered[index - 1];
    reordered[index - 1] = reordered[index];
    reordered[index] = temp;
    setItems(reordered);
    updateNavigation(reordered);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const reordered = [...items];
    const temp = reordered[index + 1];
    reordered[index + 1] = reordered[index];
    reordered[index] = temp;
    setItems(reordered);
    updateNavigation(reordered);
  };

  const toggleItem = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, isEnabled: !item.isEnabled } : item
    );
    setItems(updated);
    updateNavigation(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newPath) return;
    const newItem: NavigationItem = {
      id: `nav-${Date.now()}`,
      label: newLabel,
      path: newPath.startsWith('/') ? newPath : `/${newPath}`,
      isEnabled: true,
    };
    const updated = [...items, newItem];
    setItems(updated);
    updateNavigation(updated);
    setNewItemModal(false);
    setNewLabel('');
    setNewPath('');
    addToast('Nav Link Added', `${newLabel} is now in public menu.`);
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    updateNavigation(updated);
    addToast('Item Removed', 'Navigation link deleted.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857]">
            Site Architecture
          </span>
          <h2 className="text-xl font-display font-bold text-white mt-0.5">
            Navigation Menu & Link Hierarchy
          </h2>
          <p className="text-xs text-[#A5A5A5] mt-1">
            Reorder primary header links, rename menu titles, and toggle public route accessibility.
          </p>
        </div>

        <button
          onClick={() => setNewItemModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold hover:shadow-[0_0_20px_rgba(255,200,87,0.35)] transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Menu Item</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D99A28]/20 pb-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Public Navbar Menu Sequence
          </span>
          <span className="text-[11px] font-mono text-[#777]">
            Use arrows to reorder display sequence
          </span>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#171717] border border-[#D99A28]/20 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#FFC857] w-6 tabular-nums">
                  {idx + 1}.
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.label}</h4>
                  <span className="text-[11px] font-mono text-[#777]">{item.path}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="p-1.5 rounded bg-[#222] text-[#A5A5A5] hover:text-white disabled:opacity-30 disabled:hover:text-[#A5A5A5]"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={idx === items.length - 1}
                  className="p-1.5 rounded bg-[#222] text-[#A5A5A5] hover:text-white disabled:opacity-30 disabled:hover:text-[#A5A5A5]"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1 border ${
                    item.isEnabled
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                      : 'bg-[#222] text-[#777] border-[#333]'
                  }`}
                >
                  {item.isEnabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{item.isEnabled ? 'Active' : 'Disabled'}</span>
                </button>

                {items.length > 3 && (
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded text-[#777] hover:text-red-400"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {newItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/40 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white">Add Navigation Item</h3>
            <form onSubmit={handleAddItem} className="space-y-3">
              <div>
                <label className="block text-[#A5A5A5] mb-1 font-mono uppercase">Label *</label>
                <input
                  type="text"
                  required
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. Research Hub"
                  className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-[#A5A5A5] mb-1 font-mono uppercase">URL Path *</label>
                <input
                  type="text"
                  required
                  value={newPath}
                  onChange={(e) => setNewPath(e.target.value)}
                  placeholder="/research or /hub"
                  className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewItemModal(false)}
                  className="px-3 py-1.5 text-[#A5A5A5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#D99A28] text-black font-semibold"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
