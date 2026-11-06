import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MediaItem } from '../../types';
import { Search, Plus, Trash2, Copy, Check, ExternalLink, Image as ImageIcon, X } from 'lucide-react';

export const MediaLibrary: React.FC = () => {
  const { media, addMediaItem, deleteMediaItem, addToast } = useCMS();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newAsset, setNewAsset] = useState({
    name: '',
    url: '',
    category: 'Projects' as MediaItem['category'],
    dimensions: '1920 x 1080 px',
    fileSize: '750 KB',
  });

  const categories = ['All', 'Logos', 'Hero', 'Projects', 'Team', 'Events'];

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyPath = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    addToast('Asset Path Copied', item.url);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name || !newAsset.url) {
      addToast('Validation Error', 'Provide asset filename and valid URL.', 'error');
      return;
    }
    addMediaItem(newAsset);
    setUploadModalOpen(false);
    setNewAsset({
      name: '',
      url: '',
      category: 'Projects',
      dimensions: '1920 x 1080 px',
      fileSize: '750 KB',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/25">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857]">
            Digital Asset Management
          </span>
          <h2 className="text-xl font-display font-bold text-white mt-0.5">
            Media Library & Brand Assets
          </h2>
          <p className="text-xs text-[#A5A5A5] mt-1">
            Organize official Pentatech logos, high-resolution hardware photography, and project diagrams.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold hover:shadow-[0_0_20px_rgba(255,200,87,0.35)] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Register Media Asset</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#111111] border border-[#D99A28]/20">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search asset filenames..."
            className="w-full pl-9 pr-3 py-2 bg-[#171717] border border-[#D99A28]/25 rounded-lg text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#FFC857]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#FFC857] text-black font-semibold'
                  : 'bg-[#171717] text-[#A5A5A5] hover:text-white border border-[#D99A28]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group rounded-xl bg-[#111111] border border-[#D99A28]/25 hover:border-[#FFC857]/60 overflow-hidden flex flex-col justify-between transition-all"
          >
            {/* Visual Thumbnail */}
            <div className="relative aspect-video w-full bg-[#050505] overflow-hidden flex items-center justify-center p-2">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-[#FFC857] border border-[#D99A28]/30">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-white truncate group-hover:text-[#FFC857] transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#777] mt-1">
                  <span>{item.dimensions}</span>
                  <span>·</span>
                  <span>{item.fileSize}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#D99A28]/15 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleCopyPath(item)}
                  className="flex items-center gap-1 text-[#A5A5A5] hover:text-white transition-colors"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Path</span>
                    </>
                  )}
                </button>

                {item.id !== 'med-01' && (
                  <button
                    onClick={() => {
                      if (confirm(`Remove asset ${item.name}?`)) {
                        deleteMediaItem(item.id);
                      }
                    }}
                    className="p-1 rounded text-[#777] hover:text-red-400 transition-colors"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload/Register Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/40 shadow-2xl text-[#A5A5A5] space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#D99A28]/20 pb-3">
              <h3 className="text-base font-bold text-white">Register Media Asset</h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-1 rounded text-[#777] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Asset Filename *
                </label>
                <input
                  type="text"
                  required
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  placeholder="e.g. project_schematic_v2.png"
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                  Asset URL / Local Path *
                </label>
                <input
                  type="text"
                  required
                  value={newAsset.url}
                  onChange={(e) => setNewAsset({ ...newAsset, url: e.target.value })}
                  placeholder="/assets/pentatech-logo.png or image path"
                  className="w-full px-3.5 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                    Folder Category
                  </label>
                  <select
                    value={newAsset.category}
                    onChange={(e) =>
                      setNewAsset({
                        ...newAsset,
                        category: e.target.value as MediaItem['category'],
                      })
                    }
                    className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  >
                    <option value="Projects">Projects</option>
                    <option value="Hero">Hero</option>
                    <option value="Team">Team</option>
                    <option value="Events">Events</option>
                    <option value="Logos">Logos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={newAsset.dimensions}
                    onChange={(e) => setNewAsset({ ...newAsset, dimensions: e.target.value })}
                    className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-[#D99A28]/20">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs text-[#A5A5A5] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold"
                >
                  Register Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
