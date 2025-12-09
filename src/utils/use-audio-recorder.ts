import { useCallback } from "react";

export function useAudioRecorder({ onAudioData }: { onAudioData: (base64: string) => void }) {
  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorder.start(250); // chunks cada 250ms

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result!.toString().split(",")[1];
            onAudioData(base64);
          };
          reader.readAsDataURL(event.data);
        }
      };
    } catch (err) {
      console.error("Error acceso micrófono:", err);
    }
  }, [onAudioData]);

  const stop = useCallback(() => {
    // Aquí iría detener el recorder si guardas referencia
  }, []);

  return { start, stop };
}
