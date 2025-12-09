import { useState, useCallback, useRef } from "react";
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

  const connectWithCallbacks = useCallback(async () => {
    if (sessionRef.current) return;

    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

    audioStreamerRef.current = new AudioStreamer({
      sampleRate: 24000,
      onComplete: () => setIsVolume(false),
    });

    const session = await ai.live.connect({
      model: model || "gemini-1.5-flash",
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } } },
        systemInstruction,
      },
      callbacks: {
        onopen: () => setConnected(true),
        onmessage: (message) => {
          const audioBase64 = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioBase64) {
            setIsVolume(true);
            audioStreamerRef.current?.addPCM16(audioBase64);
          }
        },
        onclose: () => {
          setConnected(false);
          sessionRef.current = null;
        },
        onerror: (e) => console.error("Live API Error:", e),
      },
    });

    sessionRef.current = session;
  }, [model, systemInstruction]);

  const disconnect = useCallback(() => {
    sessionRef.current?.close();
    sessionRef.current = null;
    audioStreamerRef.current?.stop();
    setConnected(false);
  }, []);

  // Envío manual de texto (para pruebas mientras no hay micrófono)
  const sendText = useCallback((text: string) => {
    if (sessionRef.current) {
      sessionRef.current.sendRealtimeInput({ text });
    }
  }, []);

  return { connect: connectWithCallbacks, disconnect, connected, isVolume, sendText };
}
