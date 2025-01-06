import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddClick: () => void;
}

export default function TodoList({ todos, onToggle, onDelete, onAddClick }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 mb-2">No tasks found</p>
          <button
            onClick={onAddClick}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 
                     dark:hover:text-blue-300 font-medium"
          >
            Add your first task
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}