import React from 'react';
import { CheckCircle2, Target } from 'lucide-react';

interface ProgressProps {
  progress: number;
  className?: string;
  darkMode?: boolean;
}

export default function Progress({ progress, className = '', darkMode = false }: ProgressProps) {
  const roundedProgress = Math.round(progress || 0);
  const isComplete = roundedProgress === 100;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative min-w-[160px] group">
        {/* Background gradient for depth */}
        <div className={`
          absolute inset-0 blur-xl opacity-50
          ${isComplete 
            ? (darkMode ? 'bg-green-400/20' : 'bg-green-500/20')
            : (darkMode ? 'bg-blue-400/20' : 'bg-blue-500/20')
          }
        `} />

        {/* Progress track */}
        <div className={`
          h-1.5 rounded-full overflow-hidden backdrop-blur-sm
          ${darkMode ? 'bg-slate-700/50' : 'bg-slate-200/50'}
          transition-all duration-300
        `}>
          {/* Progress bar */}
          <div
            className={`
              h-full rounded-full shadow-lg
              transition-all duration-700 ease-out
              ${isComplete 
                ? (darkMode ? 'bg-green-400' : 'bg-green-500')
                : (darkMode ? 'bg-blue-400' : 'bg-blue-500')
              }
              group-hover:brightness-110
            `}
            style={{ 
              width: `${roundedProgress}%`,
              transition: 'width 700ms cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          />
        </div>

        {/* Completion indicator */}
        <div className={`
          absolute -top-7 left-0
          transition-all duration-500
          ${isComplete ? 'opacity-100 translate-x-full' : 'opacity-0'}
        `}>
          <CheckCircle2 
            size={16} 
            className={`
              ${darkMode ? 'text-green-400' : 'text-green-500'}
              drop-shadow-md
            `}
          />
        </div>

        {/* Target indicator */}
        <div className={`
          absolute -top-7 right-0
          transition-all duration-300
          ${isComplete ? 'opacity-0' : 'opacity-100'}
        `}>
          <Target 
            size={14} 
            className={`
              ${darkMode ? 'text-blue-400/70' : 'text-blue-500/70'}
            `}
          />
        </div>
      </div>

      {/* Percentage display */}
      <div className={`
        relative min-w-[48px] text-right
        font-medium tracking-wide
        ${isComplete 
          ? (darkMode ? 'text-green-400' : 'text-green-500')
          : 'header-text'
        }
      `}>
        <span className="text-sm tabular-nums">
          {roundedProgress}
        </span>
        <span className={`
          text-xs ml-0.5 opacity-60
          ${isComplete ? 'opacity-100' : ''}
        `}>
          %
        </span>
      </div>
    </div>
  );
}