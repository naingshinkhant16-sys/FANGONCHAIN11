import React, { useState } from "react";
import { motion } from "motion/react";

interface GlitchImageProps {
  key?: React.Key;
  src: string;
  alt: string;
  title: string;
  rarity: string;
  specimenId?: string;
  powerScore?: number;
}

export default function GlitchImage({ src, alt, title, rarity, specimenId, powerScore }: GlitchImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Define rarity border colors
  const getRarityColor = (r: string) => {
    switch (r.toLowerCase()) {
      case "legendary": return "border-amber-400 text-amber-400 bg-amber-950/40 shadow-[0_0_12px_rgba(251,191,36,0.3)]";
      case "epic": return "border-purple-400 text-purple-300 bg-purple-950/40 shadow-[0_0_12px_rgba(192,132,252,0.3)]";
      case "rare": return "border-cyan-400 text-cyan-300 bg-cyan-950/40 shadow-[0_0_12px_rgba(34,211,238,0.3)]";
      default: return "border-[#8fe38a] text-[#8fe38a] bg-[#1e3d28]/40";
    }
  };

  return (
    <div 
      className="relative group overflow-hidden box-3d-card backdrop-blur-md transition-all duration-300 hover:border-[#8fe38a] shadow-[0_20px_45px_rgba(0,0,0,0.95),0_0_25px_rgba(143,227,138,0.18)] hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scanline retro overlay */}
      <div className="absolute inset-0 z-10 grid-overlay pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
      
      {/* Glitch container */}
      <div className="relative aspect-square overflow-hidden bg-[#081410]">
        {/* Animated noise lines on hover */}
        {isHovered && (
          <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-30 bg-repeat-y bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(224,90,58,0.1),_rgba(143,227,138,0.05),_rgba(79,214,208,0.1))] bg-[size:100%_4px,3px_100%]" />
        )}

        {/* Specimen ID badge top right */}
        {specimenId && (
          <div className="absolute top-2.5 right-2.5 z-30 font-mono text-[10px] bg-[#020d06]/90 border border-[#8fe38a]/40 text-[#8fe38a] px-2 py-0.5 font-bold tracking-wider">
            {specimenId}
          </div>
        )}

        {/* The Image Itself */}
        <div 
          className={`w-full h-full transition-transform duration-300 scale-100 group-hover:scale-105 ${isHovered ? "glitch-hyper" : "glitch-live"}`}
          style={{ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <img 
            src={src} 
            alt={alt} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-0" 
          />
        </div>

        {/* Glitch Tech Tag */}
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-2.5 left-2.5 z-30 font-mono text-[9px] bg-[#e05a3a] text-black px-2 py-0.5 uppercase tracking-widest font-black"
          >
            SPECIMEN // SCAN
          </motion.div>
        )}
      </div>

      {/* Info panel */}
      <div className="p-2.5 sm:p-3.5 relative bg-[#081410]/95 border-t border-[rgba(143,227,138,0.2)] font-display">
        <div className="flex justify-between items-center mb-1 gap-1">
          <span className="font-bold text-xs sm:text-sm text-[#ece6d6] tracking-tight group-hover:text-[#8fe38a] transition-colors duration-200 truncate">
            {title}
          </span>
          <span className={`text-[8px] sm:text-[9px] font-mono px-1.5 sm:px-2 py-0.5 border uppercase font-black tracking-wider flex-shrink-0 ${getRarityColor(rarity)}`}>
            {rarity}
          </span>
        </div>
        
        <div className="flex justify-between items-center font-mono text-[9px] sm:text-[10px] text-[#a39d8c] uppercase tracking-widest mt-1 pt-1 border-t border-[#8fe38a]/10">
          <span className="truncate">{specimenId ? `SPEC ${specimenId}` : "GENESIS"}</span>
          {powerScore && <span className="text-[#8fe38a] font-bold flex-shrink-0">PWR:{powerScore}</span>}
        </div>
      </div>
    </div>
  );
}
