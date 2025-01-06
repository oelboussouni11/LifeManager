import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  priority 
}: CardProps) {
  const priorityColors = {
    low: 'from-green-500/10 to-green-500/5',
    medium: 'from-yellow-500/10 to-yellow-500/5',
    high: 'from-red-500/10 to-red-500/5'
  };

  const bgGradient = priority ? priorityColors[priority] : '';

  return (
    <div className={`
      card p-4 
      ${hover ? 'card-hover' : ''} 
      ${priority ? `bg-gradient-to-br ${bgGradient}` : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}