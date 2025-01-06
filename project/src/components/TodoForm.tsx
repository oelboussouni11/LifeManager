import React, { useState } from 'react';
import { Plus, X, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Todo, Priority, Category } from '../types/todo';
import { categoryIcons } from '../utils/icons';

interface TodoFormProps {
  onAdd: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

export default function TodoForm({ onAdd, onClose }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('personal');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      description,
      category,
      priority,
      dueDate: dueDate || null,
      completed: false,
    });
    onClose();
  };

  const CategoryIcon = categoryIcons[category];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} 
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl
                 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">New Task</h2>
          <button 
            type="button" 
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 
                     dark:hover:bg-gray-700 p-2 rounded-full transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 
                       dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent outline-none 
                       transition-all duration-200"
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 
                       dark:bg-gray-700 dark:text-white rounded-xl h-24 focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent outline-none 
                       transition-all duration-200 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={16} className="text-gray-500 dark:text-gray-400" />
                <label className="text-sm text-gray-600 dark:text-gray-300">Category</label>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full p-3 border border-gray-200 dark:border-gray-700 
                         dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent outline-none 
                         transition-all duration-200"
              >
                {Object.keys(categoryIcons).filter(cat => cat !== 'all').map((cat) => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={16} className="text-gray-500 dark:text-gray-400" />
                <label className="text-sm text-gray-600 dark:text-gray-300">Priority</label>
              </div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full p-3 border border-gray-200 dark:border-gray-700 
                         dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent outline-none 
                         transition-all duration-200"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
              <label className="text-sm text-gray-600 dark:text-gray-300">Due Date</label>
            </div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 
                       dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent outline-none 
                       transition-all duration-200"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 
                   dark:from-blue-600 dark:to-blue-700 text-white p-3 rounded-xl 
                   flex items-center justify-center gap-2 hover:from-blue-600 
                   hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 
                   transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Plus size={20} /> Create Task
        </button>
      </form>
    </div>
  );
}