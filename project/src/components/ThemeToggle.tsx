import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="glass p-3 rounded-xl transition-all duration-200 hover:scale-105"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun 
          size={20}
          className={`absolute transform transition-all duration-300 header-text
            ${isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
        />
        <Moon 
          size={20}
          className={`absolute transform transition-all duration-300 header-text
            ${isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
        />
      </div>
    </button>
  );
}