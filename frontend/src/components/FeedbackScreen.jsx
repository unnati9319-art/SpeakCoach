import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, MessageCircle } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center flex-grow space-y-6 animate-in fade-in duration-500">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-slate-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-500 font-medium animate-pulse">Analyzing your speech...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow text-center animate-in fade-in">
        <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-xl mb-6 max-w-md">
          <p>{error}</p>
        </div>
        <button 
          onClick={onRetry}
          className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition"
        >
          Try Another Topic
        </button>
      </div>
    );
  }

  if (!feedback) return null;

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 overflow-y-auto pr-2 custom-scrollbar">
      
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-200">
          <span className="text-3xl font-bold text-slate-800">{feedback.fluency_score}</span>
          <span className="text-sm font-medium text-slate-400 absolute bottom-3">/10</span>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Great effort!</h2>
          <p className="text-slate-600 leading-relaxed">{feedback.encouragement}</p>
        </div>
      </div>

      <div className="space-y-8">
        
        {feedback.grammar_issues && feedback.grammar_issues.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-slate-400" size={20} />
              Grammar
            </h3>
            <div className="space-y-3">
              {feedback.grammar_issues.map((issue, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <span className="line-through text-red-400 font-medium">{issue.original}</span>
                    <span className="hidden sm:inline text-slate-300">→</span>
                    <span className="text-green-600 font-medium">{issue.corrected}</span>
                  </div>
                  <p className="text-sm text-slate-600">{issue.note}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {feedback.vocabulary_suggestions && feedback.vocabulary_suggestions.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <MessageCircle className="text-slate-400" size={20} />
              Vocabulary
            </h3>
            <div className="space-y-3">
              {feedback.vocabulary_suggestions.map((vocab, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <span className="text-slate-600 font-medium">"{vocab.used}"</span>
                    <span className="hidden sm:inline text-slate-300">→</span>
                    <span className="text-blue-600 font-medium">{vocab.suggested}</span>
                  </div>
                  <p className="text-sm text-slate-600">{vocab.reason}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold text-slate-800 mb-3">Fluency & Filler Words</h4>
            <div className="mb-3">
              <span className="text-2xl font-bold text-slate-700">{feedback.filler_word_count}</span>
              <span className="text-sm text-slate-500 ml-1">filler words</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{feedback.fluency_comment}</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold text-slate-800 mb-3">Structure</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{feedback.structure_comment}</p>
          </div>
        </section>
      </div>

      <div className="mt-10 mb-4 flex justify-center">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-slate-800 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-slate-700 transition-colors shadow-sm"
        >
          <RefreshCw size={18} />
          <span>Try Another Topic</span>
        </button>
      </div>
    </div>
  );
}
