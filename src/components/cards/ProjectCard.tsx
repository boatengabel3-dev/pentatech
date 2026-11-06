import React from 'react';
import { Project } from '../../types';
import { ArrowUpRight, Cpu, Layers, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const statusColorMap: Record<string, string> = {
    'In Development': 'text-sky-400 border-sky-500/40 bg-sky-950/30',
    'Active R&D': 'text-[#FFC857] border-[#D99A28]/40 bg-[#D99A28]/10',
    'Field Testing': 'text-[#168BDA] border-[#168BDA]/40 bg-[#168BDA]/10',
    'Prototype': 'text-amber-400 border-amber-500/30 bg-amber-950/20',
    'Production': 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
    'Archived': 'text-[#A5A5A5] border-[#444] bg-[#222]/20',
  };

  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative bg-[#111111] border border-[#D99A28]/25 hover:border-[#FFC857]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_-5px_rgba(217,154,40,0.25)] flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Visual Image container with fallback */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#090909]">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-90" />

          {/* Development Status tag */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border backdrop-blur-md ${
                statusColorMap[project.status] || 'text-[#FFC857] border-[#D99A28]/30 bg-black/60'
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Category tag */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-[#FFC857] font-medium drop-shadow-md">
            <Cpu className="w-3.5 h-3.5" />
            <span>{project.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 pb-2">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xl font-display font-bold text-white group-hover:text-[#FFC857] transition-colors leading-snug">
              {project.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[#A5A5A5] group-hover:text-[#FFC857] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
          </div>

          <p className="text-xs sm:text-sm text-[#A5A5A5] line-clamp-2 leading-relaxed mb-4">
            {project.summary}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#171717] border border-[#D99A28]/20 text-[#A5A5A5]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer with Metadata & View Project button */}
      <div className="p-5 sm:p-6 pt-0">
        <div className="flex items-center justify-between border-t border-[#D99A28]/15 pt-4">
          <div className="text-[11px] text-[#777] font-mono">
            <span>{project.leadArchitect}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#171717] hover:bg-[#D99A28] border border-[#D99A28]/30 hover:border-transparent text-white hover:text-black text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>View Project</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
