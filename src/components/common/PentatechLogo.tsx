import React from 'react';

interface PentatechLogoProps {
  variant?: 'full' | 'emblem' | 'compact';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  glow?: boolean;
}

export const PentatechLogo: React.FC<PentatechLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  glow = false,
}) => {
  // Size classes
  const sizeMap = {
    xs: 'h-6 w-auto',
    sm: 'h-8 w-auto',
    md: 'h-11 w-auto',
    lg: 'h-14 w-auto',
    xl: 'h-20 w-auto',
    hero: 'h-28 md:h-36 w-auto',
  };

  const emblemSizeMap = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
    hero: 'h-28 w-28 md:h-36 md:w-36',
  };

  if (variant === 'emblem') {
    // Pure geometric interconnected triangular star emblem (isolated from wordmark)
    return (
      <div
        className={`relative overflow-hidden rounded-xl inline-flex items-center justify-center shrink-0 ${emblemSizeMap[size]} ${
          glow ? 'drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]' : ''
        } ${className}`}
      >
        <img
          src="/assets/pentatech-emblem.png"
          alt="Team Pentatech Emblem"
          className="w-full h-full object-contain select-none"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center shrink-0 ${
        glow ? 'drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]' : ''
      } ${className}`}
    >
      <img
        src="/assets/pentatech-logo.png"
        alt="TEAM PENTATECH"
        className={`${sizeMap[size]} object-contain`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
