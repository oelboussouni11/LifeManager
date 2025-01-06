export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'health' | 'shopping' | 'finance' | 'other';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  dueDate: string | null;
  createdAt: string;
}