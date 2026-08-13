import React, { useState, useEffect } from 'react';

export default function PreparationScreen({ topic, prepTime, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(prepTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  // Prevent division by zero if prepTime is 0
  const maxTime = Math.max(prepTime, 1); 
  const strokeDashoffset = circumference - (timeLeft / maxTime) * circumference;

  return (
    <div className="flex flex-col items-center justify-center flex-grow animate-fade-in-up">
      <div className="text-center mb-12">
        <h2 className="text-sm font-semibold text-primary-400 mb-3 uppercase tracking-[0.2em]">Your topic is</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-white px-4 leading-tight">{topic}</h3>
      </div>

      <div className="relative flex items-center justify-center mb-12 animate-pulse-glow">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.5))' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
            {timeLeft}
          </span>
        </div>
      </div>

      <p className="text-center text-slate-400 max-w-md mb-8 text-lg">
        Think about what you'll say. Recording starts automatically when the timer ends.
      </p>

      <button 
        onClick={onComplete}
        className="text-sm font-medium text-slate-500 hover:text-primary-400 transition-colors tracking-wide uppercase"
      >
        Skip preparation
      </button>
    </div>
  );
}
