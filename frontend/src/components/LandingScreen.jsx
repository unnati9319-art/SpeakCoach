import React from 'react';
import { Mic } from 'lucide-react';

export default function LandingScreen({ userName, setUserName, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-10 animate-fade-in-up">
      
      <div className="relative group cursor-pointer animate-float">
        <div className="absolute inset-0 bg-primary-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
        <div className="relative bg-gradient-to-br from-dark-700 to-dark-800 p-6 rounded-full border border-dark-border text-primary-400 shadow-2xl">
          <Mic size={56} strokeWidth={1.5} />
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
          SpeakCoach
        </h1>
        <p className="text-slate-400 text-lg">Your AI-powered spoken English practice tool.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        <div className="relative">
          <input
            id="name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-5 py-4 bg-dark-800/80 rounded-xl border border-dark-border text-white placeholder-slate-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-inner text-lg"
            placeholder="What's your name?"
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={!userName.trim()}
          className="w-full relative group overflow-hidden bg-primary-500 text-white font-semibold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative text-lg tracking-wide">Start Practice</span>
        </button>
      </form>
    </div>
  );
}
