import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
}) => {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl ${alignmentClass} ${className} mb-12 md:mb-16`}>
      {badge && (
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-[1px] bg-white/40" />
          <span className="text-xs uppercase tracking-[0.25em] text-white font-semibold">
            {badge}
          </span>
          <span className="w-6 h-[1px] bg-white/40" />
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white text-balance leading-tight">
        {title}{' '}
        {highlight && (
          <span className="text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)] underline decoration-white/30 decoration-1 underline-offset-8">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl text-balance">
          {description}
        </p>
      )}
    </div>
  );
};
