// src/utils/audio-streamer.ts
export class AudioStreamer {
  private audioContext: AudioContext;
  private source?: AudioBufferSourceNode;
  private isPlaying = false;

  constructor(private options: { sampleRate: number; onComplete?: () => void }) {
    this.audioContext = new AudioContext({ sampleRate: options.sampleRate });
  }

  async addPCM16(base64: string) {
    if (this.isPlaying) return;
    this.isPlaying = true;

    try {
      const binary = atob(base64);
      const arrayBuffer = new ArrayBuffer(binary.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binary.length; i++) {
        view[i] = binary.charCodeAt(i);
      }
      const int16Array = new Int16Array(arrayBuffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768;
      }

      const audioBuffer = await this.audioContext.decodeAudioData(
        float32Array.buffer.slice(0)
      );
      this.source = this.audioContext.createBufferSource();
      this.source.buffer = audioBuffer;
      this.source.connect(this.audioContext.destination);
      this.source.start(0);
      this.source.onended = () => {
        this.isPlaying = false;
        this.options.onComplete?.();
      };
    } catch (e) {
      console.error("Error playing audio:", e);
      this.isPlaying = false;
    }
  }

  stop() {
    this.source?.stop();
    this.isPlaying = false;
  }
}
