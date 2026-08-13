import React, { useState } from 'react';

const TOPICS = [
  "Describe your favorite hobby",
  "Talk about a memorable trip",
  "Describe your daily routine",
  "Talk about a book or movie you liked",
  "Describe your hometown",
  "Talk about your career goals",
  "Discuss a person you admire",
  "Describe a time you overcame a challenge",
  "Talk about your dream job",
  "Describe your favorite food or cuisine",
  "Discuss the importance of learning English",
  "Describe a festival or celebration in your culture",
  "Talk about an important lesson you learned",
  "Describe a skill you would like to master",
  "Talk about your favorite childhood memory",
  "Discuss a recent news event that interested you",
  "Describe your ideal weekend",
  "Talk about a place you would love to visit",
  "Discuss the role of technology in modern life",
  "Describe a piece of advice that changed your life",
  "Talk about a historical event you find fascinating",
  "Discuss the benefits of reading books",
  "Describe your favorite season of the year",
  "Talk about an animal you find interesting",
  "Discuss the impact of social media",
  "Describe a project you worked on successfully",
  "Talk about your favorite type of music",
  "Discuss how you handle stress",
  "Describe a typical day in your life 10 years from now",
  "Talk about a sport or physical activity you enjoy"
];

export default function TopicSelectionScreen({ userName, onSelect }) {
  const [prepTime, setPrepTime] = useState(60);

  return (
    <div className="flex flex-col h-full animate-fade-in-up">
      <div className="mb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-wide">Hi {userName},</h2>
          <p className="text-slate-400 mt-2 text-lg">Pick a topic to practice your spoken English.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-dark-800/60 px-4 py-3 rounded-xl border border-dark-border shadow-inner self-stretch sm:self-auto">
          <label htmlFor="prepTime" className="text-slate-300 font-medium text-sm whitespace-nowrap">
            Prep Time (sec):
          </label>
          <input
            id="prepTime"
            type="number"
            min="0"
            max="300"
            value={prepTime}
            onChange={(e) => setPrepTime(Number(e.target.value))}
            className="w-20 px-3 py-1.5 bg-dark-900 rounded-lg border border-dark-border text-white focus:ring-2 focus:ring-primary-500 outline-none text-center font-semibold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow overflow-y-auto custom-scrollbar pr-2 max-h-[320px]">
        {TOPICS.map((topic, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(topic, prepTime)}
            className="group relative text-left p-5 rounded-2xl bg-dark-800/40 backdrop-blur-md border border-dark-border hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(139,92,246,0.12)] flex items-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 text-slate-300 font-medium group-hover:text-white leading-relaxed text-base transition-colors">
              {topic}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
