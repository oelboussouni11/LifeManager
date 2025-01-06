import React, { useState } from 'react';
import { Check, Trash2, Clock, AlertCircle } from 'lucide-react';
import { Todo } from '../../types/todo';
import { categoryIcons } from '../../utils/icons';
import ConfirmDialog from '../ui/ConfirmDialog';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Confetti from '../ui/Confetti';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const CategoryIcon = categoryIcons[todo.category];
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const handleToggle = () => {
    if (!todo.completed) {
      setShowConfetti(true);
    }
    onToggle(todo.id);
  };

  const priorityVariants = {
    low: 'success',
    medium: 'warning',
    high: 'danger'
  } as const;

  return (
    <>
      <Card 
        hover 
        priority={todo.completed ? undefined : todo.priority}
        className={`
          ${todo.completed ? 'opacity-75' : ''}
          ${!todo.completed ? 'float' : ''}
        `}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggle}
            className={`
              mt-1 w-6 h-6 rounded-full border-2 
              flex items-center justify-center
              transition-all duration-200 
              ${todo.completed 
                ? 'bg-gray-500 border-gray-500 shadow-inner checkbox-pop' 
                : 'border-current hover:scale-110'
              }
            `}
          >
            {todo.completed && <Check size={16} className="text-white" />}
          </button>
          
          {/* Rest of the TodoItem content remains the same */}
        </div>
      </Card>

      <Confetti active={showConfetti} />
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