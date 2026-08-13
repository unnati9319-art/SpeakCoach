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
    <div className="flex flex-col h-full animate-fade-in-up">
      <div className="mb-10 text-center sm:text-left">
        <h2 className="text-3xl font-semibold text-white tracking-wide">Hi {userName},</h2>
        <p className="text-slate-400 mt-2 text-lg">Pick a topic to practice your spoken English.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 flex-grow">
        {TOPICS.map((topic, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(topic)}
            className="group relative text-left p-6 rounded-2xl bg-dark-800/40 backdrop-blur-md border border-dark-border hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(139,92,246,0.12)] flex items-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 text-slate-300 font-medium group-hover:text-white leading-relaxed text-lg transition-colors">
              {topic}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
