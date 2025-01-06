import React from 'react';
import { Calendar } from 'lucide-react';

type DateRange = 'all' | 'today' | 'week' | 'month' | 'overdue';

interface DateFilterProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
}

export default function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <div className="relative w-full">
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex items-center gap-3 py-2 min-w-max">
          <Calendar size={16} className="text-gray-400 dark:text-violet-200/50 shrink-0" />
          {[
            { value: 'all', label: 'All' },
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' },
            { value: 'overdue', label: 'Overdue' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value as DateRange)}
              className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all duration-200
                ${value === option.value
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 dark:from-fuchsia-500 dark:to-purple-600 text-white'
                  : 'text-gray-600 dark:text-violet-200/70 hover:bg-gray-100 dark:hover:bg-slate-800/80'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}