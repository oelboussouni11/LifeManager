import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export default function Badge({ icon: Icon, children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200',
    success: 'bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    warning: 'bg-yellow-100/80 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    danger: 'bg-red-100/80 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    info: 'bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
  };

  return (
    <span className={`
      inline-flex items-center gap-1 px-2.5 py-1 rounded-full 
      text-xs font-medium backdrop-blur-sm
      shadow-sm border border-current/10
      ${variants[variant]}
    `}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}