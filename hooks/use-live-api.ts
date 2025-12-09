import { useState, useCallback, useEffect, useRef } from "react";
import { useAudioRecorder } from "../utils/use-audio-recorder"; 
import { AudioStreamer } from "../utils/audio-streamer";
import { GoogleGenAI, Modality } from "@google/genai";

export type LiveConfig = {
  model: string;
  systemInstruction?: string;
};

export function useLiveAPI({ model, systemInstruction }: LiveConfig) {
  const [connected, setConnected] = useState(false);
  const [isVolume, setIsVolume] = useState(false);
  const audioStreamerRef = useRef<AudioStreamer | null>(null);
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    audioStreamerRef.current = new AudioStreamer({
      sampleRate: 24000,
      onComplete: () => setIsVolume(false)
    });
    return () => { audioStreamerRef.current?.stop(); };
  }, []);

  const { start: startRecording, stop: stopRecording } = useAudioRecorder({
    onAudioData: (base64) => {
      if(sessionRef.current){
        sessionRef.current.sendRealtimeInput({
          media: {
            mimeType: "audio/pcm",
            data: base64
          }
        });
      }
    }
  });

  const connectWithCallbacks = useCallback(async () => {
    if (sessionRef.current) return;

    // CORRECCIÓN VITE/VERCEL: Usar import.meta.env y prefijo VITE_
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
    
    const sessionPromise = ai.live.connect({
      model: "gemini-2.5-flash-native-audio-preview-09-2025",
      callbacks: {
        onopen: () => {
          setConnected(true);
          startRecording();
        },
        onmessage: (message) => {
          const audioBase64 = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioBase64) {
            setIsVolume(true);
            audioStreamerRef.current?.addPCM16(audioBase64);
          }
        },
        onclose: () => {
          setConnected(false);
          stopRecording();
          sessionRef.current = null;
        },
        onerror: (e) => {
          console.error("Live API Error:", e);
        }
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } } },
        systemInstruction: systemInstruction,
      }
    });

    sessionPromise.then(session => {
        sessionRef.current = session;
    });

  }, [systemInstruction, startRecording, stopRecording]);


  const disconnect = useCallback(() => {
    if (sessionRef.current) {
      try {
          sessionRef.current.close();
      } catch(e) {}
      sessionRef.current = null;
    }
    stopRecording();
    setConnected(false);
    audioStreamerRef.current?.stop();
  }, [stopRecording]);

  return { connect: connectWithCallbacks, disconnect, connected, isVolume };
}
