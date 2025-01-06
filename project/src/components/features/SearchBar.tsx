import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={20} className="text-gray-400 dark:text-violet-200/50" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900/95 
                 border border-gray-200 dark:border-violet-900/20 rounded-xl
                 focus:ring-2 focus:ring-violet-500 dark:focus:ring-fuchsia-500
                 focus:border-transparent outline-none transition-all duration-200
                 text-gray-900 dark:text-violet-50 placeholder-gray-400
                 dark:placeholder-violet-200/50"
      />
    </div>
  );
}