import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import WelcomeScreen from './components/WelcomeScreen';
import TaskStats from './components/features/TaskStats';
import TaskSort from './components/features/TaskSort';
import DateFilter from './components/features/DateFilter';
import { Todo, Category } from './types/todo';
import { loadTodos, saveTodos } from './utils/storage';
import { useUser } from './hooks/useUser';
import { isToday, isThisWeek, isThisMonth, isOverdue } from './utils/dateFilters';

type SortOption = 'dueDate' | 'priority' | 'createdAt';
type DateRange = 'all' | 'today' | 'week' | 'month' | 'overdue';

const priorityOrder = { high: 0, medium: 1, low: 2 };

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [dateRange, setDateRange] = useState<DateRange>('all');
  const [sortBy, setSortBy] = useState<SortOption>('dueDate');
  const { name, saveName } = useUser();

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  const handleAddTodo = (newTodo: Omit<Todo, 'id' | 'createdAt'>) => {
    const todo: Todo = {
      ...newTodo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const filteredAndSortedTodos = todos
    .filter(todo => {
      // Category filter
      if (filter !== 'all' && todo.category !== filter) return false;

      // Date filter
      if (dateRange !== 'all' && todo.dueDate) {
        const dueDate = new Date(todo.dueDate);
        switch (dateRange) {
          case 'today':
            if (!isToday(dueDate)) return false;
            break;
          case 'week':
            if (!isThisWeek(dueDate)) return false;
            break;
          case 'month':
            if (!isThisMonth(dueDate)) return false;
            break;
          case 'overdue':
            if (!isOverdue(dueDate) || todo.completed) return false;
            break;
        }
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const completionRate = todos.length === 0 
    ? 0 
    : (todos.filter(todo => todo.completed).length / todos.length) * 100;

  if (!name) {
    return <WelcomeScreen onComplete={saveName} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
      <Header 
        onAddClick={() => setShowForm(true)} 
        completionRate={completionRate}
        userName={name}
      />

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <TaskStats todos={todos} />
        </div>
        
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <DateFilter value={dateRange} onChange={setDateRange} />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="w-full sm:w-auto">
                <CategoryFilter
                  currentFilter={filter}
                  onFilterChange={setFilter}
                />
              </div>
              <TaskSort value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          <TodoList
            todos={filteredAndSortedTodos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onAddClick={() => setShowForm(true)}
          />
        </div>
      </main>

      {showForm && (
        <TodoForm onAdd={handleAddTodo} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}