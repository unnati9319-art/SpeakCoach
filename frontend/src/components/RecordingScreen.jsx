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
      <div className="flex flex-col items-center justify-center flex-grow text-center animate-in fade-in">
        <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-xl mb-6 max-w-md">
          <p>{error}</p>
        </div>
        <button 
          onClick={handleRetry}
          className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Topic</span>
          <h2 className="text-lg font-medium text-slate-800 mt-1">{topic}</h2>
        </div>
        
        {isRecording && (
          <div className="flex items-center space-x-2 bg-red-50 border border-red-100 text-red-500 px-3 py-1.5 rounded-full animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium">Recording</span>
          </div>
        )}
      </div>

      <div className="flex-grow bg-slate-50 rounded-xl p-5 mb-6 overflow-y-auto border border-slate-200 min-h-[250px] max-h-[350px]">
        {transcript ? (
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">{transcript}</p>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-400 text-lg italic animate-pulse">
              Listening... start speaking.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-auto">
        <button
          onClick={handleStop}
          className="flex items-center space-x-2 bg-slate-800 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-slate-700 transition-colors shadow-sm hover:shadow active:scale-95"
        >
          <Square size={18} fill="currentColor" />
          <span>Stop Recording</span>
        </button>
      </div>
    </div>
  );
}
