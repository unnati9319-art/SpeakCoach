import React from 'react';
import { Mic } from 'lucide-react';

export default function LandingScreen({ userName, setUserName, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-100 p-5 rounded-full text-slate-600">
        <Mic size={48} strokeWidth={1.5} />
      </div>
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold text-slate-800">SpeakCoach</h1>
        <p className="text-slate-500">Your AI-powered spoken English practice tool.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            What's your name?
          </label>
          <input
            id="name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
            placeholder="e.g. Alex"
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={!userName.trim()}
          className="w-full bg-slate-800 text-white font-medium py-3 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Start Practice
        </button>
      </form>
    </div>
  );
}
