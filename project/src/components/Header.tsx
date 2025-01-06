import React from 'react';
import { PlusCircle, ListTodo } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ProgressRing from './ui/ProgressRing';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onAddClick: () => void;
  completionRate: number;
  userName: string;
}

export default function Header({ onAddClick, completionRate, userName }: HeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="bg-gradient-to-r from-violet-500/90 via-fuchsia-500/90 to-purple-500/90 
                     dark:from-violet-900 dark:via-fuchsia-900 dark:to-purple-900 p-6 shadow-lg">
      <div className="max-w-lg mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <ListTodo size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Hi, {userName}
            </h1>
            <p className="text-sm text-white/80">
              Let's organize your day
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ProgressRing 
            progress={completionRate} 
            className="hidden sm:flex"
            darkMode={isDark}
          />
          <ThemeToggle />
          <button
            onClick={onAddClick}
            className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-200 
                     hover:scale-105 backdrop-blur-sm"
            aria-label="Add new task"
          >
            <PlusCircle size={24} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}