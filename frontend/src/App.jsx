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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl glass-panel rounded-[2rem] p-6 sm:p-10 min-h-[500px] flex flex-col relative overflow-hidden transition-all duration-500 shadow-primary-500/10">
        
        {/* Glow ambient blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex-grow flex flex-col">
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
    </div>
  );
}

export default App;
