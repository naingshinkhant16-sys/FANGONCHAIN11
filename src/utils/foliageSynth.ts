/**
 * BREACH THE WILD_FOLIAGE: Interactive Web Audio Synthesizer & Game Engine
 * --------------------------------------------------------------------------
 * A fully client-side, dependency-free audio synthesis solution for cyberpunk
 * and gothic ambient interfaces. Utilizes the HTML5 Web Audio API to generate
 * realistic procedural sounds like wind rustling, wolf howling, laser scanning,
 * and high-fidelity retro mechanical clicks without any downloaded audio assets.
 * 
 * Perfect for full-stack React / Vite, HTML5 game loops, or immersive web art.
 */

export type SynthSoundType = "rustle" | "howl" | "reveal" | "click";

/**
 * Procedural Audio Synthesizer Class
 * Standardizes browser compatibility and state management for client-side sound effects.
 */
export class FoliageAudioSynth {
  private isMuted: boolean = false;

  constructor(options?: { mutedByDefault?: boolean }) {
    this.isMuted = !!options?.mutedByDefault;
  }

  /**
   * Toggle global mute status
   */
  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /**
   * Get current mute status
   */
  public getMutedStatus(): boolean {
    return this.isMuted;
  }

  /**
   * Play synthesized sound procedural wave
   */
  public play(type: SynthSoundType): void {
    if (this.isMuted) return;

    try {
      // 1. Establish audio context with standard browser fallback
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.warn("Web Audio API is not supported in this browser environment.");
        return;
      }
      
      const ctx = new AudioContextClass();

      // Resume context if suspended by browser security/user interaction policies
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      switch (type) {
        case "click": {
          // Precise mechanical/cybernetic click trigger
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          // Fast pitch decay from middle C down to a sub-bass click
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);
          
          // Sharp exponential amplitude envelope
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
          
          osc.start(now);
          osc.stop(now + 0.15);
          break;
        }

        case "rustle": {
          // Leaf rustling: Procedural bandpass-filtered white noise
          const duration = 0.35; // Short burst duration
          const bufferSize = ctx.sampleRate * duration;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const channelData = buffer.getChannelData(0);
          
          // Generate white noise array
          for (let i = 0; i < bufferSize; i++) {
            channelData[i] = Math.random() * 2 - 1;
          }
          
          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = buffer;

          // Bandpass filter to isolate rustling frequency range (approx 700Hz)
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.setValueAtTime(700, now);
          filter.Q.setValueAtTime(4, now);

          // Swiftly modulate frequency downward to mimic leaves brushing
          filter.frequency.exponentialRampToValueAtTime(250, now + 0.3);

          // Clean volume envelope
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

          // Route: Noise Source -> Biquad Filter -> Gain Node -> Audio Destination
          noiseSource.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          
          noiseSource.start(now);
          noiseSource.stop(now + duration);
          break;
        }

        case "howl": {
          // Haunting robotic wolf howl using dual-detuned oscillators
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc1.type = "sine";
          osc2.type = "sine";
          
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);
          
          // Haunting pitch-sweep mimicry of a wolf howling in a gothic dark landscape
          osc1.frequency.setValueAtTime(150, now);
          osc1.frequency.exponentialRampToValueAtTime(550, now + 0.8);
          osc1.frequency.linearRampToValueAtTime(620, now + 1.2);
          osc1.frequency.linearRampToValueAtTime(580, now + 2.0);
          osc1.frequency.exponentialRampToValueAtTime(100, now + 2.8);

          // Detune oscillator 2 by 2-5Hz for realistic thick chorus/beating effect
          osc2.frequency.setValueAtTime(152, now);
          osc2.frequency.exponentialRampToValueAtTime(555, now + 0.8);
          osc2.frequency.linearRampToValueAtTime(625, now + 1.2);
          osc2.frequency.linearRampToValueAtTime(585, now + 2.0);
          osc2.frequency.exponentialRampToValueAtTime(102, now + 2.8);

          // Haunting swell and fade amplitude envelope
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.12, now + 0.6); // Crest of the howl
          gain.gain.linearRampToValueAtTime(0.1, now + 1.8);  // Deep echo holding period
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8); // Natural decay
          
          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 2.9);
          osc2.stop(now + 2.9);
          break;
        }

        case "reveal": {
          // High-pitched ascending holographic matrix chord (C-Major Arpeggio)
          const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C4, E4, G4, C5, E5, G5
          
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = "triangle"; // Warm triangle waves for vintage console aesthetic
            
            const noteStartTime = now + idx * 0.08; // Staggered arpeggiator delays
            osc.frequency.setValueAtTime(freq, noteStartTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 2, noteStartTime + 0.5);
            
            gain.gain.setValueAtTime(0.05, noteStartTime);
            gain.gain.exponentialRampToValueAtTime(0.001, noteStartTime + 0.8);
            
            osc.start(noteStartTime);
            osc.stop(noteStartTime + 0.9);
          });
          break;
        }
      }
    } catch (err) {
      console.error("Synthesizer playback exception captured: ", err);
    }
  }
}
