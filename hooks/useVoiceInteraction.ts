import { useState, useEffect, useRef, useCallback } from 'react';

export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

interface UseVoiceInteractionProps {
  onTranscript: (text: string) => void;
  language?: string;
}

interface UseVoiceInteractionReturn {
  state: VoiceState;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  transcript: string;
  error: string | null;
}

export const useVoiceInteraction = ({
  onTranscript,
  language = 'ar-SA'
}: UseVoiceInteractionProps): UseVoiceInteractionReturn => {
  const [state, setState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check browser support
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (SpeechRecognition && speechSynthesis) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      synthRef.current = speechSynthesis;

      // Configure recognition
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptResult = event.results[current][0].transcript;
        setTranscript(transcriptResult);

        if (event.results[current].isFinal) {
          onTranscript(transcriptResult);
          setTranscript('');
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setError(`خطأ في التعرف على الصوت: ${event.error}`);
        setState('idle');
      };

      recognitionRef.current.onend = () => {
        if (state === 'listening') {
          setState('idle');
        }
      };
    } else {
      setIsSupported(false);
      setError('المتصفح لا يدعم التفاعل الصوتي');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [language, onTranscript, state]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) return;

    try {
      setError(null);
      setState('listening');
      recognitionRef.current.start();
    } catch (err) {
      console.error('Error starting recognition:', err);
      setError('فشل بدء التسجيل');
      setState('idle');
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
      setState('idle');
    } catch (err) {
      console.error('Error stopping recognition:', err);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!synthRef.current || !isSupported) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setState('speaking');
    };

    utterance.onend = () => {
      setState('idle');
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setState('idle');
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  }, [language, isSupported]);

  const stopSpeaking = useCallback(() => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();
    setState('idle');
  }, []);

  return {
    state,
    isSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    transcript,
    error
  };
};
