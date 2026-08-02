import React from 'react';

const TOPICS = [
  "Describe your favorite hobby",
  "Talk about a memorable trip",
  "Describe your daily routine",
  "Talk about a book or movie you liked",
  "Describe your hometown",
  "Talk about your career goals"
];

export default function TopicSelectionScreen({ userName, onSelect }) {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-slate-800">Hi {userName},</h2>
        <p className="text-slate-500 mt-1">Pick a topic to practice your spoken English.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
        {TOPICS.map((topic, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(topic)}
            className="text-left p-5 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-sm bg-white transition-all group flex items-center"
          >
            <span className="text-slate-700 font-medium group-hover:text-slate-900 leading-relaxed">
              {topic}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
