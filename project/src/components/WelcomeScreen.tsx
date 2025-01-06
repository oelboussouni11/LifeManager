import React, { useState } from 'react';
import { User } from 'lucide-react';
import Card from './ui/Card';

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 dark:from-violet-500/10 dark:via-fuchsia-500/10 dark:to-purple-600/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="bg-purple-500/10 dark:bg-fuchsia-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-purple-500 dark:text-fuchsia-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-violet-50 mb-2">
            Welcome to Life Manager
          </h1>
          <p className="text-gray-600 dark:text-violet-200/70">
            Let's personalize your experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 dark:text-violet-200/70 mb-2"
            >
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-violet-900/20 
                       dark:bg-slate-900/90 dark:text-violet-50 rounded-xl 
                       focus:ring-2 focus:ring-purple-500 dark:focus:ring-fuchsia-500 
                       focus:border-transparent outline-none transition-all duration-200"
              placeholder="Enter your name"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 
                     dark:from-fuchsia-500 dark:to-purple-600 text-white p-3 
                     rounded-xl flex items-center justify-center gap-2 
                     hover:from-purple-600 hover:to-indigo-700 
                     dark:hover:from-fuchsia-600 dark:hover:to-purple-700 
                     transition-all duration-200 shadow-md hover:shadow-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Started
          </button>
        </form>
      </Card>
    </div>
  );
}