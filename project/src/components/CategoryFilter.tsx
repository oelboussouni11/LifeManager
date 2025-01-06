import React from 'react';
import { Category } from '../types/todo';
import { categoryIcons } from '../utils/icons';

interface CategoryFilterProps {
  currentFilter: Category | 'all';
  onFilterChange: (filter: Category | 'all') => void;
}

export default function CategoryFilter({ currentFilter, onFilterChange }: CategoryFilterProps) {
  const categories: (Category | 'all')[] = ['all', 'personal', 'work', 'health', 'shopping', 'finance', 'other'];

  return (
    <div className="relative w-full">
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-2 py-2 min-w-max">
          {categories.map((category) => {
            const Icon = categoryIcons[category === 'all' ? 'all' : category];
            return (
              <button
                key={category}
                onClick={() => onFilterChange(category)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap
                  transition-all duration-200 ${
                    currentFilter === category
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 dark:from-fuchsia-500 dark:to-purple-600 text-white shadow-md transform scale-105'
                      : 'bg-white dark:bg-slate-800/80 text-gray-600 dark:text-violet-200/70 hover:bg-gray-50 dark:hover:bg-slate-700/80'
                  }`}
              >
                <Icon size={16} className="shrink-0" />
                <span className="truncate">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}