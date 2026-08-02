import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import TopicSelectionScreen from './components/TopicSelectionScreen';
import PreparationScreen from './components/PreparationScreen';
import RecordingScreen from './components/RecordingScreen';
import FeedbackScreen from './components/FeedbackScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [userName, setUserName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [transcript, setTranscript] = useState('');

  const goToScreen = (screen) => setCurrentScreen(screen);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-100 p-8 min-h-[450px] flex flex-col relative overflow-hidden transition-all duration-300">
        
        {currentScreen === 'landing' && (
          <LandingScreen 
            userName={userName}
            setUserName={setUserName}
            onNext={() => goToScreen('topic')} 
          />
        )}
        
        {currentScreen === 'topic' && (
          <TopicSelectionScreen 
            userName={userName} 
            onSelect={(topic) => {
              setSelectedTopic(topic);
              goToScreen('prep');
            }} 
          />
        )}
        
        {currentScreen === 'prep' && (
          <PreparationScreen 
            topic={selectedTopic} 
            onComplete={() => goToScreen('recording')} 
          />
        )}
        
        {currentScreen === 'recording' && (
          <RecordingScreen 
            topic={selectedTopic} 
            onComplete={(finalTranscript) => {
              setTranscript(finalTranscript);
              goToScreen('feedback');
            }} 
          />
        )}
        
        {currentScreen === 'feedback' && (
          <FeedbackScreen 
            transcript={transcript} 
            onRetry={() => goToScreen('topic')} 
          />
        )}

      </div>
    </div>
  );
}

export default App;
