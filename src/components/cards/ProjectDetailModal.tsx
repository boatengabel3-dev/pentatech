import React from 'react';
import { Project } from '../../types';
import { X, ExternalLink, Github, Cpu, Calendar, User, Tag, CheckCircle } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-black border border-white/30 rounded-2xl shadow-[0_20px_60px_-10px_rgba(255,255,255,0.15)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header visual */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full bg-black overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-black/80 hover:bg-white text-white hover:text-black border border-white/30 hover:border-white transition-colors backdrop-blur-md z-10 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Title & category overlaid on image bottom */}
          <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white font-semibold flex items-center gap-1">
                <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {project.category}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-[10px] sm:text-xs font-mono text-white px-2 py-0.5 rounded bg-black/80 border border-white/30">
                {project.status}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          {/* Summary */}
          <div>
            <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white mb-1.5 sm:mb-2">
              System Overview & Architecture
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Placeholder Description Box */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-black border border-white/20 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <CheckCircle className="w-3.5 h-3.5 text-white shrink-0" />
              <span>Specification & Research Documentation</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/15 text-xs">
            <div>
              <span className="text-neutral-400 block font-mono text-[9px] sm:text-[10px] uppercase">Architect / Lead</span>
              <span className="text-white font-medium flex items-center gap-1.5 mt-0.5 sm:mt-1 truncate">
                <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" />
                <span className="truncate">{project.leadArchitect}</span>
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block font-mono text-[9px] sm:text-[10px] uppercase">Timeline / Cycle</span>
              <span className="text-white font-medium flex items-center gap-1.5 mt-0.5 sm:mt-1">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" />
                {project.completionYear}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-neutral-400 block font-mono text-[9px] sm:text-[10px] uppercase">Readiness</span>
              <span className="text-white font-semibold block mt-0.5 sm:mt-1">
                {project.status} Phase
              </span>
            </div>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="pt-2">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                Engineering Tags
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-black border border-white/20 text-neutral-300 text-[10px] sm:text-xs"
                  >
                    <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 sm:pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center gap-1.5 border border-white transition-all shadow-sm"
                >
                  <span>Interactive Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-black hover:bg-neutral-900 border border-white/30 text-white font-medium text-xs flex items-center gap-1.5 transition-all"
                >
                  <Github className="w-3.5 h-3.5 text-white" />
                  <span>Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs text-neutral-300 hover:text-white bg-black sm:bg-transparent border border-white/20 sm:border-transparent transition-colors text-center cursor-pointer"
            >
              Close Specification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
