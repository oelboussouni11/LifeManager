import React from 'react';
import { ArrowUpDown } from 'lucide-react';

type SortOption = 'dueDate' | 'priority' | 'createdAt';

interface TaskSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function TaskSort({ value, onChange }: TaskSortProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <ArrowUpDown size={16} className="text-gray-400 dark:text-violet-200/50" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="text-sm bg-transparent text-gray-600 dark:text-violet-200/70
                 focus:outline-none cursor-pointer"
      >
        <option value="dueDate">Sort by Due Date</option>
        <option value="priority">Sort by Priority</option>
        <option value="createdAt">Sort by Created Date</option>
      </select>
    </div>
  );
}