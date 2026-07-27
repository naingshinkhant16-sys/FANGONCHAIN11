import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles, AlertTriangle, Shield, Zap, BookOpen, RotateCcw, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { NFTItem } from "../types";

// Import images for 11 Wolf types
import image1 from "../assets/images/display_fang1.png";
import image2 from "../assets/images/display_fang2.png";
import image3 from "../assets/images/display_fang3.png";
import image4 from "../assets/images/display_fang4.png";
import image5 from "../assets/images/outcome1.png";
import image6 from "../assets/images/outcome2.png";
import image7 from "../assets/images/outcome3.png";
import image8 from "../assets/images/outcome4.png";

import tokenLogo from "../assets/images/logo_fang.png";

interface BushMintProps {
  walletConnected?: boolean;
  walletAddress?: string | null;
  onConnectClick?: () => void;
  onWalletRegister?: (address: string, walletType: string) => void;
}

const NFT_POOL: NFTItem[] = [
  {
    id: 1,
    name: "Bloomrot Alpha",
    rarity: "Epic",
    image: image1,
    stats: { attack: 78, speed: 88, stealth: 92, wisdom: 95 },
    description: "Formed from primeval swamp moss and celestial glowing dust, this fluid protector flows silently through the thickest foliage.",
    serial: "FANG-0120"
  },
  {
    id: 2,
    name: "Blaze Rebel",
    rarity: "Rare",
    image: image2,
    stats: { attack: 88, speed: 76, stealth: 82, wisdom: 64 },
    description: "A mercenary spirit wearing an ancient flame visor. He patrols the canopy borders, letting no intruding predator slip through.",
    serial: "FANG-0542"
  },
  {
    id: 3,
    name: "Box-Bot Voyager",
    rarity: "Legendary",
    image: image3,
    stats: { attack: 94, speed: 91, stealth: 60, wisdom: 99 },
    description: "An ancient cybernetic spirit engineered from scavenged space cargo in the Undergrowth. Possesses superior technomancy.",
    serial: "FANG-0999"
  },
  {
    id: 4,
    name: "Bruiser Cub",
    rarity: "Common",
    image: image4,
    stats: { attack: 68, speed: 80, stealth: 92, wisdom: 71 },
    description: "A silent, agile hunter disguised in archaic ceremonial gear, wielding a staff with lethal precision to safeguard the pack.",
    serial: "FANG-0381"
  },
  {
    id: 5,
    name: "Cyber Howler",
    rarity: "Epic",
    image: image5,
    stats: { attack: 91, speed: 94, stealth: 75, wisdom: 86 },
    description: "Enhanced with neon cybernetic optics and high-frequency sound resonance, hunting prey across futuristic neon wildernesses.",
    serial: "FANG-0811"
  },
  {
    id: 6,
    name: "Shadow Fang",
    rarity: "Legendary",
    image: image6,
    stats: { attack: 98, speed: 96, stealth: 99, wisdom: 92 },
    description: "Cloaked in dark void energy, this spectral wolf moves unseen between shadow dimensions to strike with terrifying precision.",
    serial: "FANG-1337"
  },
  {
    id: 7,
    name: "Chrome Mech Fang",
    rarity: "Rare",
    image: image7,
    stats: { attack: 86, speed: 72, stealth: 55, wisdom: 80 },
    description: "Forged from titanium alloy plating with reinforced kinetic claws, designed for high-impact front-line defense.",
    serial: "FANG-0404"
  },
  {
    id: 8,
    name: "Spectral Frost",
    rarity: "Legendary",
    image: image8,
    stats: { attack: 95, speed: 89, stealth: 90, wisdom: 97 },
    description: "A mythical frost wolf radiating sub-zero aura, capable of flash-freezing obstacles and navigating blizzard storms.",
    serial: "FANG-2024"
  },

  {
    id: 11,
    name: "Emblem Guard",
    rarity: "Rare",
    image: tokenLogo,
    stats: { attack: 84, speed: 85, stealth: 88, wisdom: 93 },
    description: "The sacred crest-bearer of the Genesis $FANG protocol, radiating ancient protective energy across the sanctuary.",
    serial: "FANG-0010"
  }
];

// Red Eyes SVG Component inspired by reference image
function RedEyesIcon({ className = "w-48 h-24" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 100" 
      className={`${className} filter drop-shadow-[0_0_18px_rgba(239,68,68,0.95)] drop-shadow-[0_0_35px_rgba(220,38,38,0.7)]`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="redEyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4d4d" />
          <stop offset="45%" stopColor="#ef4444" />
          <stop offset="85%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#990000" />
        </linearGradient>
      </defs>
      {/* Left Eye */}
      <path 
        d="M 20 42 C 40 25, 72 32, 92 53 C 72 56, 44 54, 20 42 Z" 
        fill="url(#redEyeGrad)" 
      />
      {/* Right Eye */}
      <path 
        d="M 180 42 C 160 25, 128 32, 108 53 C 128 56, 156 54, 180 42 Z" 
        fill="url(#redEyeGrad)" 
      />
    </svg>
  );
}

export default function BushMint({ walletConnected, walletAddress, onConnectClick, onWalletRegister }: BushMintProps) {
  const [mintState, setMintState] = useState<"idle" | "searching" | "revealed">("idle");
  const [bushClicks, setBushClicks] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [isMuting, setIsMuting] = useState(false);
  const [shakeIntensity, setShakeIntensity] = useState(0); // 0 = none, 1 = low, 2 = extreme

  // Web Audio Synthesizer to play fully client-side sound effects
  const playSynthesizedSound = (type: "rustle" | "howl" | "reveal" | "click") => {
    if (isMuting) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "rustle") {
        // Synthesizing wind/leaf rustling using bandpass-filtered noise
        const bufferSize = ctx.sampleRate * 0.35; // 0.35 seconds
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 700;
        filter.Q.value = 4;

        // Modulate frequency to simulate brushing leaves
        filter.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.3);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

        noiseNode.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noiseNode.start();
      } else if (type === "howl") {
        // Synthesizing a haunting wolf howl in the distance
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc1.type = "sine";
        osc2.type = "sine";
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        
        const now = ctx.currentTime;
        
        // Pitch sweep mimicking a howl
        osc1.frequency.setValueAtTime(150, now);
        osc1.frequency.exponentialRampToValueAtTime(550, now + 0.8);
        osc1.frequency.linearRampToValueAtTime(620, now + 1.2);
        osc1.frequency.linearRampToValueAtTime(580, now + 2.0);
        osc1.frequency.exponentialRampToValueAtTime(100, now + 2.8);

        osc2.frequency.setValueAtTime(152, now);
        osc2.frequency.exponentialRampToValueAtTime(555, now + 0.8);
        osc2.frequency.linearRampToValueAtTime(625, now + 1.2);
        osc2.frequency.linearRampToValueAtTime(585, now + 2.0);
        osc2.frequency.exponentialRampToValueAtTime(102, now + 2.8);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.6);
        gain.gain.linearRampToValueAtTime(0.1, now + 1.8);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 2.9);
        osc2.stop(now + 2.9);
      } else if (type === "reveal") {
        // Magical, high-pitched chord with ascending frequency
        const now = ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C major arpeggio
        
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          osc.frequency.exponentialRampToValueAtTime(freq * 2, now + idx * 0.08 + 0.5);
          
          gain.gain.setValueAtTime(0.05, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.8);
          
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.9);
        });
      }
    } catch (e) {
      console.warn("Audio synthesis error:", e);
    }
  };

  // Handle searching the bushes trigger
  const handleSearchBushes = () => {
    playSynthesizedSound("click");
    playSynthesizedSound("howl");
    setMintState("searching");
    setBushClicks(0);
    setShakeIntensity(1);

    // Pre-select a random companion specimen from the pool to emerge
    const randomNFT = NFT_POOL[Math.floor(Math.random() * NFT_POOL.length)];
    setSelectedNFT(randomNFT);
  };

  const triggerMintConfetti = () => {
    try {
      // Center explosive burst
      confetti({
        particleCount: 90,
        spread: 110,
        origin: { y: 0.55 },
        colors: ["#10b981", "#34d399", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7"],
        disableForReducedMotion: true,
      });

      // Left side cannon
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.7 },
          colors: ["#10b981", "#f59e0b", "#ffffff"],
        });
      }, 180);

      // Right side cannon
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.7 },
          colors: ["#10b981", "#ef4444", "#06b6d4"],
        });
      }, 360);
    } catch (e) {
      console.error("Confetti trigger error:", e);
    }
  };

  // Process manual click-to-clear action
  const handleBushClick = () => {
    if (bushClicks >= 5) return;

    const nextClicks = bushClicks + 1;
    setBushClicks(nextClicks);
    playSynthesizedSound("rustle");
    setShakeIntensity(2);

    // Settle the shake after click
    setTimeout(() => {
      setShakeIntensity(nextClicks < 5 ? 1 : 0);
    }, 150);

    if (nextClicks === 5) {
      playSynthesizedSound("reveal");
      playSynthesizedSound("howl");
      triggerMintConfetti();
      // Stay on searching page so user admires fully cleared wolf image, no automatic timeout transition!
    }
  };

  // Handle get image action
  const handleGetImage = () => {
    playSynthesizedSound("click");
    triggerMintConfetti();
    setMintState("revealed");
  };

  // Auto transition if they connect wallet while cleared
  useEffect(() => {
    if (walletConnected && mintState === "searching" && bushClicks >= 5) {
      setMintState("revealed");
    }
  }, [walletConnected, mintState, bushClicks]);

  const handleReset = () => {
    playSynthesizedSound("click");
    setMintState("idle");
    setBushClicks(0);
    setSelectedNFT(null);
  };

  return (
    <div id="bush-mint-section" className="relative p-6 md:p-12 rounded-none box-3d-deep border-2 border-[#8fe38a]/40 shadow-[10px_10px_0px_#020805,0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden min-h-[500px] flex flex-col justify-center items-center">
      {/* Background scanline & hazard pattern */}
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-40" />
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500" />
      
      {/* Absolute sound toggle */}
      <button 
        onClick={() => setIsMuting(!isMuting)}
        className="absolute top-4 right-4 text-xs font-mono px-3 py-1 bg-black hover:bg-emerald-950/40 rounded-none border border-emerald-500/40 text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <span>{isMuting ? "🔇 MUTED" : "📡 SYNTH_AUDIO: ACTIVE"}</span>
      </button>

      <AnimatePresence mode="wait">
        {/* State 1: Idle (Show interactive forest bushes and CTA) */}
        {mintState === "idle" && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-2xl text-center flex flex-col items-center"
          >
            <div className="mb-4">
              <span className="px-3 py-1 rounded-none text-xs font-mono font-bold uppercase bg-[#0f1712] border border-emerald-500 text-emerald-400 tracking-wider">
                [ SECURE_EXTRACTION_SYSTEM ]
              </span>
            </div>
            
            <h3 className="font-display font-black text-3xl md:text-4xl text-slate-100 leading-tight mb-4 tracking-tight uppercase">
              BREACH THE <span className="text-emerald-400 glow-green">WILD_FOLIAGE</span>
            </h3>
            
            <p className="text-slate-400 text-xs md:text-sm font-mono max-w-lg mb-8 leading-relaxed">
              SCANNING_STATUS: 5,555 PREDATORY BEASTS CORRALLED. CLEAVE DENSE LEAF CANOPY AT YOUR OWN RISK. NO MOCK PROTOCOLS.
            </p>

            {/* Simulated interactive black box portal with glowing red eyes */}
            <div 
              className="relative w-72 h-48 mb-8 bg-black border-2 border-red-950/80 hover:border-red-500/80 rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer group shadow-[0_0_30px_rgba(0,0,0,0.9),0_0_15px_rgba(239,68,68,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(239,68,68,0.45)]" 
              onClick={handleSearchBushes}
            >
              {/* Pitch black interior with subtle scanline grid */}
              <div className="absolute inset-0 bg-black z-0" />
              <div className="absolute inset-0 grid-overlay pointer-events-none opacity-30 z-0" />

              {/* Dark foliage frame around edges */}
              <div className="absolute inset-0 pointer-events-none z-10 border-8 border-[#020b05]/60" />
              
              {/* Glowing crimson predator eyes centered in pitch dark */}
              <div className="relative z-20 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <div className="animate-pulse">
                  <RedEyesIcon className="w-52 h-24" />
                </div>
              </div>

              {/* Technical corner brackets */}
              <div className="absolute top-2 left-2 font-mono text-[9px] text-red-600/70 z-20 font-bold">[EYES_DETECTED]</div>
              <div className="absolute bottom-2 right-2 font-mono text-[9px] text-emerald-500/70 z-20 font-bold">[BREACH_PORTAL]</div>

              {/* Prompt text on hover */}
              <div className="absolute bottom-1.5 text-[10px] text-red-400 font-mono tracking-widest uppercase font-bold opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-20">
                ⚡ CLICK TO TAP / ENTER
              </div>
            </div>

            {walletConnected ? (
              <button 
                onClick={handleSearchBushes}
                className="relative cursor-pointer px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider rounded-none shadow-none border-2 border-emerald-300 transition-all duration-300 flex items-center gap-2 group"
              >
                <Compass className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>LASTRY SCAN: SEARCH THE SHRUBS</span>
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <button 
                  onClick={handleSearchBushes}
                  className="cursor-pointer px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider rounded-none shadow-none border-2 border-emerald-300 transition-all duration-300 flex items-center gap-2 mb-3"
                >
                  <span>BREACH FOLIAGE PORTAL</span>
                </button>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">LOCALIZED CLIENT DECRYPTION PROTOCOL</span>
              </div>
            )}
          </motion.div>
        )}

        {/* State 2: 5-Click Bush-Clearing Game */}
        {mintState === "searching" && selectedNFT && (
          <motion.div 
            key="searching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl text-center flex flex-col items-center justify-center py-6"
          >
            <div className="mb-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase bg-emerald-950 border border-emerald-500/50 text-emerald-400 tracking-wider animate-pulse">
                🌱 Wild Jungle Interaction Active
              </span>
            </div>
            
            <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-100 leading-tight mb-2 tracking-tight">
              {bushClicks < 5 ? "Clear the Foliage to Reveal!" : "Foliage Cleared!"}
            </h3>
            
            <p className="text-slate-400 text-xs md:text-sm font-sans max-w-sm mb-6">
              {bushClicks < 5 
                ? `Click or tap on the bushes ${5 - bushClicks} more times to clear the dense canopy!`
                : "Capturing the Lupine specimen..."}
            </p>

            {/* Interactive Bush-Clearing Canvas */}
            <div 
              onClick={handleBushClick}
              className={`relative w-72 h-72 rounded-2xl overflow-hidden border-2 border-emerald-500/30 bg-black/60 flex items-center justify-center cursor-pointer select-none transition-all duration-300 ${
                shakeIntensity === 2 
                  ? "animate-rustle scale-105 shadow-[0_0_40px_rgba(16,185,129,0.35)] border-emerald-400" 
                  : "hover:border-emerald-500/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] shadow-inner"
              }`}
            >
              {/* Retro digital green scan overlay */}
              <div className="absolute inset-0 z-10 grid-overlay pointer-events-none opacity-40" />

              {/* Underlying mystery companion emerging */}
              <div 
                className="absolute inset-0 transition-all duration-500 pointer-events-none flex items-center justify-center"
                style={{
                  filter: `blur(${Math.max(0, 16 - bushClicks * 4.5)}px) brightness(${20 + bushClicks * 16}%) contrast(${85 + bushClicks * 3}%)`,
                  opacity: Math.max(0.08, bushClicks / 5),
                  transform: `scale(${0.92 + (bushClicks / 5) * 0.08})`
                }}
              >
                <img 
                  src={selectedNFT.image} 
                  alt="Mystery Lupine" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Glowing red predator eyes lurking in the dark foliage */}
              {bushClicks < 3 && (
                <div 
                  className="absolute z-20 transition-opacity duration-300 pointer-events-none animate-pulse"
                  style={{ opacity: 1 - bushClicks * 0.35 }}
                >
                  <RedEyesIcon className="w-32 h-16" />
                </div>
              )}

              {/* Five Layered SVG/Foliage Groups with Framer Motion exits */}
              <AnimatePresence>
                {/* Foliage 1: Top Left vines */}
                {bushClicks < 1 && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ x: -150, y: -150, rotate: -60, opacity: 0, transition: { duration: 0.6 } }}
                    className="absolute inset-0 pointer-events-none text-emerald-800/90 z-20"
                  >
                    <svg viewBox="0 0 100 100" fill="currentColor" className="absolute top-0 left-0 w-32 h-32 transform -rotate-12">
                      <path d="M0 0 Q40 0 50 50 Q0 40 0 0 Z M20 10 Q40 20 30 30" />
                      <path d="M10 0 C30 10, 40 30, 45 45 C30 35, 10 20, 10 0 Z" opacity="0.6"/>
                    </svg>
                  </motion.div>
                )}

                {/* Foliage 2: Top Right dense branch */}
                {bushClicks < 2 && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ x: 150, y: -150, rotate: 60, opacity: 0, transition: { duration: 0.6 } }}
                    className="absolute inset-0 pointer-events-none text-emerald-900 z-20"
                  >
                    <svg viewBox="0 0 100 100" fill="currentColor" className="absolute top-0 right-0 w-32 h-32 transform rotate-12">
                      <path d="M100 0 Q60 0 50 50 Q100 40 100 0 Z" />
                      <path d="M90 0 C70 10, 60 30, 55 45 C70 35, 90 20, 90 0 Z" opacity="0.7"/>
                    </svg>
                  </motion.div>
                )}

                {/* Foliage 3: Bottom Left ivy drape */}
                {bushClicks < 3 && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ x: -150, y: 150, rotate: -45, opacity: 0, transition: { duration: 0.6 } }}
                    className="absolute inset-0 pointer-events-none text-emerald-950 z-20"
                  >
                    <svg viewBox="0 0 100 100" fill="currentColor" className="absolute bottom-0 left-0 w-32 h-32">
                      <path d="M0 100 Q40 100 50 50 Q0 60 0 100 Z" />
                    </svg>
                  </motion.div>
                )}

                {/* Foliage 4: Bottom Right fern shroud */}
                {bushClicks < 4 && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ x: 150, y: 150, rotate: 45, opacity: 0, transition: { duration: 0.6 } }}
                    className="absolute inset-0 pointer-events-none text-forest-800 z-20"
                  >
                    <svg viewBox="0 0 100 100" fill="currentColor" className="absolute bottom-0 right-0 w-32 h-32">
                      <path d="M100 100 Q60 100 50 50 Q100 60 100 100 Z" />
                    </svg>
                  </motion.div>
                )}

                {/* Foliage 5: Central thick bush shield */}
                {bushClicks < 5 && (
                  <motion.div 
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ scale: 0, rotate: 90, opacity: 0, transition: { duration: 0.7 } }}
                    className="absolute inset-0 pointer-events-none text-emerald-700/90 z-30 flex items-center justify-center"
                  >
                    <svg viewBox="0 0 100 100" fill="currentColor" className="w-56 h-56 drop-shadow-2xl">
                      <path d="M50 15 C65 15, 75 30, 75 45 C85 45, 95 55, 90 70 C85 85, 15 85, 10 70 C5 55, 15 45, 25 45 C25 30, 35 15, 50 15 Z" />
                      <path d="M35 30 C45 25, 55 25, 65 30 C75 35, 78 48, 70 58 C75 62, 80 72, 75 80 C70 85, 30 85, 25 80 C20 72, 25 62, 30 58 C22 48, 25 35, 35 30 Z" fill="#042a0f" opacity="0.8" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Laser Flashlight Sweeper Line */}
              {bushClicks < 5 && (
                <motion.div 
                  animate={{ left: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] z-10" 
                />
              )}

              {/* Clicks remaining tag */}
              {bushClicks < 5 && (
                <div className="absolute bottom-3 z-35 bg-emerald-950/90 border border-emerald-500/40 px-3 py-1 rounded-full font-mono text-[9px] text-emerald-400 uppercase tracking-widest animate-bounce">
                  ⚡ TAP TO HIT: {5 - bushClicks} LEFT
                </div>
              )}
            </div>

            {/* Custom click feedback meter */}
            <div className="mt-6 flex flex-col items-center w-full max-w-xs">
              <div className="flex justify-between w-full font-mono text-[10px] text-emerald-500 uppercase tracking-wider mb-2">
                <span>Density Defeated</span>
                <span>{bushClicks * 20}%</span>
              </div>
              
              {/* Segments progress bar */}
              <div className="flex gap-1.5 w-full">
                {[1, 2, 3, 4, 5].map((seg) => (
                  <div 
                    key={seg}
                    className={`h-2.5 flex-1 rounded-full border transition-all duration-300 ${
                      bushClicks >= seg 
                        ? "bg-emerald-400 border-emerald-300 shadow-[0_0_10px_#34d399]" 
                        : "bg-forest-950/80 border-forest-800"
                    }`}
                  />
                ))}
              </div>

              {/* Status helper text */}
              <p className="mt-3 font-mono text-[11px] text-slate-400">
                {bushClicks === 0 && "🌲 Shrub layers are dense. Click to start!"}
                {bushClicks === 1 && "🍃 Sliced some ivy! Something is rustling..."}
                {bushClicks === 2 && "👁️ Deep golden eyes detected peeking through!"}
                {bushClicks === 3 && "💫 Stealth shields cracking! Shape is visible..."}
                {bushClicks === 4 && "⚡ One final strike to shatter the canopy!"}
                {bushClicks >= 5 && "🎉 SPECIMEN EXPOSED! SECURING IMAGERY..."}
              </p>

              {/* Get Image Action CTA */}
              {bushClicks >= 5 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 w-full flex flex-col items-center gap-3"
                >
                  <button
                    onClick={handleGetImage}
                    className="w-full cursor-pointer py-4 px-6 bg-[#8fe38a] hover:bg-[#8fe38a]/90 text-[#081410] font-black uppercase tracking-wider transition-all duration-300 border-2 border-[#8fe38a] flex items-center justify-center gap-2 text-xs md:text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>CLAIM SPECIMEN</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* State 3: Revealed NFT with 3D stats showcase */}
        {mintState === "revealed" && selectedNFT && (
          <motion.div 
            key="revealed"
            initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, transition: { type: "spring", damping: 12 } }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            {/* Left: Card Reveal */}
            <div className="flex flex-col items-center">
              <div className="relative group overflow-hidden rounded-none bg-black border-2 border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.3)] preserve-3d w-full max-w-[320px] aspect-square">
                {/* Vintage scanner grid overlay */}
                <div className="absolute inset-0 z-10 grid-overlay pointer-events-none opacity-50" />
                
                {/* Confetti canvas glow */}
                <div className="absolute inset-0 bg-radial-gradient from-emerald-500/20 to-transparent animate-pulse pointer-events-none" />

                <img 
                  src={selectedNFT.image} 
                  alt={selectedNFT.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />

                {/* Tech specifications tag */}
                <div className="absolute bottom-0 inset-x-0 bg-black/95 p-3 font-mono text-[10px] border-t-2 border-emerald-500 text-emerald-400 flex justify-between">
                  <span>ID_SPECIMEN: {selectedNFT.serial}</span>
                  <span className="text-emerald-400 uppercase font-black">{selectedNFT.rarity}</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <span className="px-2.5 py-0.5 rounded-none bg-black text-emerald-400 border border-emerald-500 font-mono text-[10px] uppercase font-bold">
                  [ WILDWOOD_SECURED ]
                </span>
                <span className="px-2.5 py-0.5 rounded-none bg-black text-rose-500 border border-rose-950 font-mono text-[10px] uppercase font-bold">
                  [ GEN-0_LUPINE ]
                </span>
              </div>
            </div>

            {/* Right: Capture details, stats visual, mint more */}
            <div className="text-left flex flex-col justify-center font-display">
              <div className="mb-2">
                <span className={`px-3 py-1 rounded-none border-2 text-xs font-mono font-black uppercase ${
                  selectedNFT.rarity === "Legendary" ? "bg-amber-950/60 border-amber-500 text-amber-400" :
                  selectedNFT.rarity === "Epic" ? "bg-purple-950/60 border-purple-500 text-purple-400" :
                  selectedNFT.rarity === "Rare" ? "bg-cyan-950/60 border-cyan-500 text-cyan-400" :
                  "bg-emerald-950/60 border-emerald-500 text-emerald-400"
                }`}>
                  // {selectedNFT.rarity} COMPANION
                </span>
              </div>

              <h3 className="font-black text-3xl md:text-4xl text-slate-100 tracking-tight leading-none mb-3 uppercase">
                {selectedNFT.name}
              </h3>

              <p className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-4">
                CAPTURED_SPECIMEN_ID: {selectedNFT.serial}
              </p>

              <p className="text-slate-400 text-xs md:text-sm font-mono leading-relaxed mb-6">
                {selectedNFT.description}
              </p>

              {/* Stat grid */}
              <div className="space-y-4 mb-8">
                <h4 className="font-mono text-[11px] text-emerald-500 uppercase tracking-wider font-bold">[ SPECIMEN_MUTATION_METERS ]</h4>
                
                {/* Attack Stat */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className="flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> ATK_RATING</span>
                    <span className="text-slate-200 font-bold">{selectedNFT.stats.attack}/100</span>
                  </div>
                  <div className="w-full bg-black h-3 rounded-none overflow-hidden border border-emerald-950">
                    <div className="bg-amber-500 h-full rounded-none" style={{ width: `${selectedNFT.stats.attack}%` }} />
                  </div>
                </div>

                {/* Speed Stat */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-cyan-400" /> SPD_VELOCITY</span>
                    <span className="text-slate-200 font-bold">{selectedNFT.stats.speed}/100</span>
                  </div>
                  <div className="w-full bg-black h-3 rounded-none overflow-hidden border border-emerald-950">
                    <div className="bg-cyan-400 h-full rounded-none" style={{ width: `${selectedNFT.stats.speed}%` }} />
                  </div>
                </div>

                {/* Stealth Stat */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-purple-400" /> STH_SHIELD</span>
                    <span className="text-slate-200 font-bold">{selectedNFT.stats.stealth}/100</span>
                  </div>
                  <div className="w-full bg-black h-3 rounded-none overflow-hidden border border-emerald-950">
                    <div className="bg-purple-500 h-full rounded-none" style={{ width: `${selectedNFT.stats.stealth}%` }} />
                  </div>
                </div>

                {/* Wisdom Stat */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-emerald-400" /> WIS_COMPUTING</span>
                    <span className="text-slate-200 font-bold">{selectedNFT.stats.wisdom}/100</span>
                  </div>
                  <div className="w-full bg-black h-3 rounded-none overflow-hidden border border-emerald-950">
                    <div className="bg-emerald-400 h-full rounded-none" style={{ width: `${selectedNFT.stats.wisdom}%` }} />
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    document.getElementById('whitelist-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-fang-primary cursor-pointer w-full py-4 px-6 text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(143,227,138,0.4)]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>GET THE WOLF</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleSearchBushes}
                    className="cursor-pointer flex-1 px-5 py-3 bg-[#081410] hover:bg-[#0f2418] text-[#8fe38a] font-bold uppercase tracking-wider border border-[rgba(143,227,138,0.3)] hover:border-[#8fe38a] flex items-center justify-center gap-2 text-xs transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>EXTRACT ANOTHER</span>
                  </button>
                  <button 
                    onClick={handleReset}
                    className="cursor-pointer px-5 py-3 bg-[#081410] hover:bg-[#0f2418] text-[#a39d8c] hover:text-[#ece6d6] border border-[rgba(143,227,138,0.2)] font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RESET PORTAL</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
