import React, { useState } from 'react';
import { Check, Trash2, Clock, AlertCircle } from 'lucide-react';
import { Todo } from '../types/todo';
import { categoryIcons } from '../utils/icons';
import ConfirmDialog from './ConfirmDialog';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityStyles = {
  low: {
    border: 'border-l-teal-500',
    badge: 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300',
    icon: 'text-teal-600 dark:text-teal-400'
  },
  medium: {
    border: 'border-l-amber-500',
    badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
    icon: 'text-amber-600 dark:text-amber-400'
  },
  high: {
    border: 'border-l-rose-500',
    badge: 'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300',
    icon: 'text-rose-600 dark:text-rose-400'
  }
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleDelete = () => setShowConfirm(true);
  const CategoryIcon = categoryIcons[todo.category];
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
  const style = priorityStyles[todo.priority];

  return (
    <>
      <div 
        className={`bg-white dark:bg-slate-900/95 rounded-xl shadow-sm p-4 mb-3 
          border-l-4 ${todo.completed ? 'border-l-gray-400 opacity-75' : style.border}
          transform transition-all duration-200 hover:shadow-md hover:-translate-y-1
          dark:shadow-violet-900/5 dark:hover:shadow-violet-900/10`}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(todo.id)}
            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center
              transition-colors duration-200 ${
                todo.completed 
                  ? 'bg-gray-500 border-gray-500' 
                  : `border-current ${style.icon} hover:bg-gray-50 dark:hover:bg-slate-800`
              }`}
          >
            {todo.completed && <Check size={16} className="text-white" />}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CategoryIcon size={16} className={todo.completed ? 'text-gray-400' : style.icon} />
              <h3 className={`font-medium ${
                todo.completed 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-800 dark:text-violet-50'
              }`}>
                {todo.title}
              </h3>
            </div>
            
            {todo.description && (
              <p className={`text-sm mt-1 ${
                todo.completed 
                  ? 'text-gray-500 dark:text-gray-400' 
                  : 'text-gray-600 dark:text-violet-200/70'
              }`}>
                {todo.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full 
                flex items-center gap-1 ${style.badge}`}>
                <AlertCircle size={12} />
                {todo.priority}
              </span>
              
              {todo.dueDate && (
                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1
                  ${isOverdue 
                    ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300' 
                    : 'bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300'}`}>
                  <Clock size={12} />
                  {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleDelete}
            className="p-2 rounded-full text-gray-400 hover:text-rose-500 
                     hover:bg-rose-50 dark:hover:bg-rose-900/30 
                     transition-colors duration-200"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={() => {
          onDelete(todo.id);
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </>
  );
}