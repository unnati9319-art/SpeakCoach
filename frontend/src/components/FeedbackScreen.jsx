import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';

export default function FeedbackScreen({ transcript, onRetry }) {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript })
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch feedback.');
        }
        
        const data = await response.json();
        setFeedback(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [transcript]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow space-y-6 animate-fade-in-up">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-dark-600"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-4 border-secondary-500 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="text-primary-400 font-medium animate-pulse tracking-wide text-lg">Analyzing your speech...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow text-center animate-fade-in-up">
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-6 rounded-xl mb-6 max-w-md backdrop-blur-md">
          <AlertCircle className="mx-auto mb-3 text-red-500" size={32} />
          <p className="text-lg">{error}</p>
        </div>
        <button 
          onClick={onRetry}
          className="bg-dark-700 border border-dark-border text-white px-8 py-4 rounded-xl hover:bg-dark-600 transition shadow-lg"
        >
          Try Another Topic
        </button>
      </div>
    );
  }

  if (!feedback) return null;

  return (
    <div className="flex flex-col h-full animate-fade-in-up overflow-y-auto pr-2 custom-scrollbar">
      
      {/* Header & Score */}
      <div className="bg-dark-800/60 backdrop-blur-md p-6 rounded-2xl border border-dark-border mb-8 flex flex-col sm:flex-row items-center gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center rounded-full border border-dark-border bg-gradient-to-br from-dark-800 to-dark-900 shadow-inner">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
             <circle cx="56" cy="56" r="52" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
             <circle cx="56" cy="56" r="52" stroke="url(#score-gradient)" strokeWidth="6" fill="none" strokeDasharray={2 * Math.PI * 52} strokeDashoffset={(2 * Math.PI * 52) - ((feedback.fluency_score / 10) * (2 * Math.PI * 52))} strokeLinecap="round" className="transition-all duration-1500 ease-out" />
             <defs>
               <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#8b5cf6" />
                 <stop offset="100%" stopColor="#06b6d4" />
               </linearGradient>
             </defs>
          </svg>
          <div className="flex items-baseline space-x-1 z-10">
            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">{feedback.fluency_score}</span>
            <span className="text-sm font-medium text-slate-500">/10</span>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">Great effort!</h2>
          <p className="text-slate-300 leading-relaxed text-lg">{feedback.encouragement}</p>
        </div>
      </div>

      <div className="space-y-8">
        
        {/* Grammar Issues */}
        {feedback.grammar_issues && feedback.grammar_issues.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-primary-400" size={24} />
              Grammar Highlights
            </h3>
            <div className="space-y-3">
              {feedback.grammar_issues.map((issue, idx) => (
                <div key={idx} className="bg-dark-800/40 backdrop-blur-sm border border-dark-border rounded-xl p-5 shadow-sm hover:border-primary-500/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                    <span className="line-through text-red-400/80 font-medium text-lg">{issue.original}</span>
                    <span className="hidden sm:inline text-slate-500">→</span>
                    <span className="text-secondary-400 font-medium text-lg">{issue.corrected}</span>
                  </div>
                  <p className="text-slate-400">{issue.note}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Vocabulary Suggestions */}
        {feedback.vocabulary_suggestions && feedback.vocabulary_suggestions.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="text-secondary-400" size={24} />
              Vocabulary Upgrades
            </h3>
            <div className="space-y-3">
              {feedback.vocabulary_suggestions.map((vocab, idx) => (
                <div key={idx} className="bg-dark-800/40 backdrop-blur-sm border border-dark-border rounded-xl p-5 shadow-sm hover:border-secondary-500/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                    <span className="text-slate-300 font-medium text-lg">"{vocab.used}"</span>
                    <span className="hidden sm:inline text-slate-500">→</span>
                    <span className="text-primary-400 font-medium text-lg">{vocab.suggested}</span>
                  </div>
                  <p className="text-slate-400">{vocab.reason}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fluency & Structure */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-dark-800/40 backdrop-blur-sm border border-dark-border rounded-xl p-6 shadow-sm hover:border-dark-600 transition-colors">
            <h4 className="font-semibold text-white mb-3 text-lg">Fluency & Filler Words</h4>
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">{feedback.filler_word_count}</span>
              <span className="text-slate-400">filler words</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{feedback.fluency_comment}</p>
          </div>
          
          <div className="bg-dark-800/40 backdrop-blur-sm border border-dark-border rounded-xl p-6 shadow-sm hover:border-dark-600 transition-colors">
            <h4 className="font-semibold text-white mb-3 text-lg">Structure</h4>
            <p className="text-slate-300 leading-relaxed">{feedback.structure_comment}</p>
          </div>
        </section>
      </div>

      <div className="mt-12 mb-6 flex justify-center">
        <button
          onClick={onRetry}
          className="group relative flex items-center gap-2 bg-dark-700 border border-dark-border text-white font-medium px-8 py-4 rounded-xl hover:border-primary-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <RefreshCw size={20} className="relative z-10 text-primary-400 group-hover:rotate-180 transition-transform duration-500" />
          <span className="relative z-10 text-lg tracking-wide">Try Another Topic</span>
        </button>
      </div>
    </div>
  );
}
