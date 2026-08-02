import React, { useState, useEffect } from 'react';

export default function PreparationScreen({ topic, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(60);

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

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 60) * circumference;

  return (
    <div className="flex flex-col items-center justify-center flex-grow animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-lg font-medium text-slate-500 mb-2 uppercase tracking-wide">Your topic is:</h2>
        <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 px-4 leading-tight">{topic}</h3>
      </div>

      <div className="relative flex items-center justify-center mb-10">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-slate-600 transition-all duration-1000 ease-linear"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-5xl font-semibold text-slate-800">{timeLeft}</span>
        </div>
      </div>

      <p className="text-center text-slate-600 max-w-sm mb-6">
        Think about what you'll say. Recording starts automatically when the timer ends.
      </p>

      <button 
        onClick={onComplete}
        className="text-sm text-slate-400 hover:text-slate-600 underline underline-offset-4 transition-colors"
      >
        Skip preparation
      </button>
    </div>
  );
}
