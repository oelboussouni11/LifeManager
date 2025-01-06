import React from 'react';
import { PieChart, Timer, TrendingUp } from 'lucide-react';
import { Todo } from '../../types/todo';
import Card from '../ui/Card';

interface TaskStatsProps {
  todos: Todo[];
}

export default function TaskStats({ todos }: TaskStatsProps) {
  const stats = {
    completed: todos.filter(t => t.completed).length,
    overdue: todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length,
    upcoming: todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) > new Date()).length
  };

  return (
    <>
      <Card className="p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
          <PieChart size={20} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-violet-200/70">Completed</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-violet-50">{stats.completed}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30">
          <Timer size={20} className="text-rose-600 dark:text-rose-400" />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-violet-200/70">Overdue</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-violet-50">{stats.overdue}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
          <TrendingUp size={20} className="text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-violet-200/70">Upcoming</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-violet-50">{stats.upcoming}</p>
        </div>
      </Card>
    </>
  );
}