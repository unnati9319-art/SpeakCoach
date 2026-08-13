import React, { useState, useEffect, useRef } from 'react';
import { Square } from 'lucide-react';

export default function RecordingScreen({ topic, onComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  
  const recognitionRef = useRef(null);
  const fullTranscriptRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Your browser doesn't support the Web Speech API. Please use Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      let currentFinal = '';
      let currentInterim = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          currentFinal += event.results[i][0].transcript + ' ';
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }
      
      if (currentFinal) {
        fullTranscriptRef.current += currentFinal;
      }
      
      setTranscript(fullTranscriptRef.current + currentInterim);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === 'not-allowed') {
        setError("Microphone access was denied. Please allow microphone access to practice.");
      } else {
        setError(`An error occurred: ${event.error}`);
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      setError("Could not start recording.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    onComplete(transcript.trim() || fullTranscriptRef.current.trim());
  };

  const handleRetry = () => {
    setError(null);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow text-center animate-fade-in-up">
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-6 rounded-xl mb-6 max-w-md backdrop-blur-md">
          <p className="text-lg">{error}</p>
        </div>
        <button 
          onClick={handleRetry}
          className="bg-dark-700 border border-dark-border text-white px-8 py-4 rounded-xl hover:bg-dark-600 transition shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-400">Topic</span>
          <h2 className="text-xl font-medium text-white mt-1">{topic}</h2>
        </div>
        
        {isRecording && (
          <div className="flex items-center space-x-3 bg-primary-500/10 border border-primary-500/30 text-primary-400 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-pulse">
            <div className="w-2.5 h-2.5 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>
            <span className="text-sm font-semibold uppercase tracking-wide">Recording</span>
          </div>
        )}
      </div>

      <div className="flex-grow bg-dark-900/50 rounded-2xl p-6 mb-8 overflow-y-auto border border-dark-border min-h-[250px] max-h-[350px] custom-scrollbar relative shadow-inner">
        {transcript ? (
          <p className="text-slate-300 text-xl leading-relaxed whitespace-pre-wrap font-light">{transcript}</p>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center animate-pulse opacity-50">
               <div className="flex space-x-1.5 mb-5">
                  <div className="w-1.5 h-6 bg-primary-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-1.5 h-10 bg-secondary-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-1.5 h-8 bg-primary-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  <div className="w-1.5 h-5 bg-secondary-400 rounded-full animate-bounce" style={{animationDelay: '450ms'}}></div>
               </div>
               <p className="text-slate-400 text-lg tracking-wide">Listening... start speaking.</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-auto">
        <button
          onClick={handleStop}
          className="group relative flex items-center space-x-2 bg-dark-700 border border-dark-border text-white font-medium px-8 py-4 rounded-xl hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-red-500/20 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Square size={18} fill="currentColor" className="text-red-400 relative z-10" />
          <span className="relative z-10 text-lg tracking-wide">Stop Recording</span>
        </button>
      </div>
    </div>
  );
}
