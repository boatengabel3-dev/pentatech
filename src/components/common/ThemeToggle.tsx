import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'navbar' | 'compact' | 'drawer';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'navbar',
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  if (variant === 'drawer') {
    return (
      <button
        onClick={toggleTheme}
        className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 cursor-pointer ${
          isDark
            ? 'bg-[#141414] hover:bg-[#1c1c1c] border-[#D99A28]/30 hover:border-[#FFC857] text-[#A5A5A5] hover:text-white'
            : 'bg-white hover:bg-gray-100 border-[#D99A28]/40 text-gray-800 shadow-sm'
        } ${className}`}
        aria-label={`Switch to ${isDark ? 'high-contrast Light' : 'Dark'} mode`}
        title={`Current: ${isDark ? 'Dark Mode' : 'Light Mode'} (Click to toggle)`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-[#1c1c1c] text-[#FFC857]'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold">
              {isDark ? 'Dark Mode' : 'High-Contrast Light'}
            </span>
            <span className="text-[10px] font-mono text-[#888]">
              {isDark ? 'Deep Black & Metallic Gold' : 'Crisp White & High Contrast'}
            </span>
          </div>
        </div>

        {/* Toggle Pill switch */}
        <div
          className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
            isDark ? 'bg-[#222] border border-[#D99A28]/40' : 'bg-amber-500 border border-amber-600'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center text-[9px] ${
              isDark ? 'translate-x-0 text-black' : 'translate-x-5 text-amber-600'
            }`}
          >
            {isDark ? (
              <Moon className="w-2.5 h-2.5 text-[#050505]" />
            ) : (
              <Sun className="w-2.5 h-2.5 text-amber-600" />
            )}
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`group relative p-1.5 sm:p-2 rounded-xl border transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
        isDark
          ? 'bg-[#141414] hover:bg-[#1a1a1a] border-[#D99A28]/30 hover:border-[#FFC857] text-[#FFC857] shadow-[0_0_15px_rgba(217,154,40,0.1)]'
          : 'bg-white hover:bg-gray-50 border-[#D99A28]/50 text-amber-700 shadow-[0_2px_10px_rgba(217,154,40,0.2)]'
      } ${className}`}
      aria-label={`Toggle theme (currently ${theme})`}
      title={`Switch to ${isDark ? 'High-Contrast Light Mode' : 'Dark Mode'}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 transition-transform group-hover:rotate-12 text-[#FFC857]" />
        ) : (
          <Sun className="w-4 h-4 transition-transform group-hover:rotate-45 text-amber-600" />
        )}
      </div>

      <span className="hidden xl:inline-block text-[11px] font-mono tracking-wider font-semibold uppercase">
        {isDark ? 'Dark' : 'Light'}
      </span>

      {/* Mini state dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isDark ? 'bg-[#FFC857] shadow-[0_0_6px_#FFC857]' : 'bg-amber-600 shadow-[0_0_6px_#D97706]'
        }`}
      />
    </button>
  );
};
