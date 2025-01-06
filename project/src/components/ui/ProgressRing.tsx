import React from 'react';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  darkMode?: boolean;
}

export default function ProgressRing({ 
  progress, 
  size = 44, 
  strokeWidth = 3,
  className = '',
  darkMode = false
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - ((progress || 0) / 100) * circumference;
  const roundedProgress = Math.round(progress || 0);
  const isComplete = roundedProgress === 100;

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-full blur-lg opacity-50
        ${isComplete 
          ? (darkMode ? 'bg-emerald-400/30' : 'bg-green-500/30')
          : (darkMode ? 'bg-fuchsia-400/20' : 'bg-purple-500/30')
        }
      `} />

      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={`
            ${darkMode ? 'stroke-violet-900/20' : 'stroke-slate-200'} 
            fill-none
          `}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset || 0}
          className={`
            ${isComplete 
              ? (darkMode ? 'stroke-emerald-400' : 'stroke-green-500')
              : (darkMode ? 'stroke-fuchsia-400' : 'stroke-purple-500')
            }
            fill-none transition-all duration-500 ease-out
          `}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`
          text-sm font-medium tabular-nums
          ${isComplete 
            ? (darkMode ? 'text-emerald-400' : 'text-green-500')
            : 'header-text'
          }
        `}>
          {roundedProgress}
        </span>
      </div>
    </div>
  );
}