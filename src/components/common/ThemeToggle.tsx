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
        className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border ${
          isDark
            ? 'border-[#D99A28]/40 bg-black text-white hover:border-[#FFC857]'
            : 'border-slate-300 bg-white text-slate-900 hover:border-amber-500'
        } flex items-center justify-between transition-all duration-300 cursor-pointer ${className}`}
        aria-label="Theme mode"
        title="Toggle Light or Dark theme"
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
            isDark ? 'bg-black border border-[#D99A28]/40 text-[#FFC857]' : 'bg-amber-50 border border-amber-200 text-amber-600'
          }`}>
            {isDark ? <Moon className="w-4 h-4 text-[#FFC857]" /> : <Sun className="w-4 h-4 text-amber-600" />}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold">
              {isDark ? 'Deep Black & Gold Theme' : 'High-Contrast Light Theme'}
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              {isDark ? 'Total Black with White & Gold Lines' : 'Crisp Slate & Amber Palette'}
            </span>
          </div>
        </div>

        {/* Toggle Pill switch */}
        <div
          className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
            isDark ? 'bg-neutral-900 border border-[#D99A28]/50' : 'bg-amber-400 border border-amber-500'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center text-[9px] ${
              isDark ? 'translate-x-0 text-black' : 'translate-x-5 text-amber-600'
            }`}
          >
            {isDark ? (
              <Moon className="w-2.5 h-2.5 text-black" />
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
          ? 'border-[#D99A28]/40 hover:border-[#FFC857] bg-black text-white hover:bg-neutral-900 shadow-sm'
          : 'border-slate-300 hover:border-amber-500 bg-white text-slate-800 hover:bg-slate-50 shadow-sm'
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
          isDark ? 'bg-[#FFC857] shadow-[0_0_6px_#FFC857]' : 'bg-amber-500 shadow-[0_0_6px_#F59E0B]'
        }`}
      />
    </button>
  );
};
