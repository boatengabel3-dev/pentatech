import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { ProjectDetailModal } from '../../components/cards/ProjectDetailModal';
import { Project } from '../../types';
import { Search, LayoutGrid, List, SlidersHorizontal, ArrowUpRight, Cpu } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamically derive categories from all active projects
  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category))).filter(Boolean);
  const categories = ['All', ...uniqueCategories];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.leadArchitect.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#A5A5A5]">
      {/* Hero */}
      <section className="relative py-14 sm:py-24 border-b border-[#D99A28]/20 bg-[#090909] overflow-hidden">
        <div className="absolute inset-0 bg-triangular-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Engineering Archive"
            title="Projects & Field"
            highlight="Deployments"
            description="Comprehensive portfolio of hardware prototypes, clean energy architectures, and sovereign AI software developed across Pentatech research nodes."
          />

          {/* Search & Filter Bar */}
          <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-2xl bg-[#111111] border border-[#D99A28]/30">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#A5A5A5] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, leads, or engineering tags..."
                className="w-full pl-10 pr-4 py-2 bg-[#171717] border border-[#D99A28]/20 rounded-xl text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#FFC857]"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between w-full md:w-auto gap-2">
              <span className="text-[11px] font-mono text-[#777] md:hidden">
                {filteredProjects.length} Projects
              </span>
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#D99A28] text-black'
                      : 'text-[#A5A5A5] hover:text-white bg-[#171717]'
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#D99A28] text-black'
                      : 'text-[#A5A5A5] hover:text-white bg-[#171717]'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Chips (Horizontally swipeable on mobile, wrapping on desktop) */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:overflow-visible">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FFC857] text-black font-semibold shadow-sm'
                    : 'bg-[#111111] text-[#A5A5A5] hover:text-white border border-[#D99A28]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Listing */}
      <section className="py-12 sm:py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="p-8 sm:p-16 text-center rounded-2xl bg-[#111111] border border-[#D99A28]/20 space-y-3">
              <SlidersHorizontal className="w-8 h-8 text-[#FFC857] mx-auto opacity-60" />
              <h3 className="text-lg font-bold text-white">No projects found</h3>
              <p className="text-xs text-[#A5A5A5]">
                Try adjusting your search criteria or select "All" categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#D99A28] text-black"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="p-5 rounded-xl bg-[#111111] border border-[#D99A28]/20 hover:border-[#FFC857]/60 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-16 rounded-lg overflow-hidden bg-black shrink-0">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#D99A28] mb-1">
                        <span>{project.category}</span>
                        <span>·</span>
                        <span className="text-white font-medium">{project.status}</span>
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-[#FFC857] transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs text-[#A5A5A5] line-clamp-1 mt-0.5">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 self-end md:self-auto text-xs text-[#777] font-mono">
                    <span>{project.leadArchitect}</span>
                    <span className="text-white font-bold tabular-nums">
                      {project.completionYear}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#D99A28] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
