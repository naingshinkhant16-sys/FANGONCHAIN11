import React from "react";
import forestBgImage from "../assets/images/mystic_forest_bg_1784818652246.jpg";

export default function Forest3DBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* High-res cinematic mystic forest artwork background */}
      <img
        src={forestBgImage}
        alt="Mystic Dark Forest"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-85 scale-105 filter contrast-125 brightness-90 saturate-110"
      />

      {/* Volumetric ambient green mist & vignette depth overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-900/25 via-[#020d06]/65 to-[#010603]/90 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b05]/60 via-transparent to-[#010703]/95" />

      {/* TIER 1: Far Background Mist & High Canopy Silhouettes */}
      <div className="absolute inset-x-0 top-0 h-[40vh] opacity-50 filter blur-[0.5px]">
        <svg className="w-full h-full text-[#011409]" preserveAspectRatio="none" viewBox="0 0 1000 400">
          <path d="M0,400 L0,180 L20,200 L35,140 L50,190 L70,120 L85,180 L110,100 L130,160 L160,80 L180,150 L210,110 L240,170 L270,90 L300,160 L330,120 L370,190 L400,70 L430,150 L460,110 L500,180 L540,80 L570,150 L600,100 L640,170 L680,60 L720,140 L760,90 L800,160 L840,110 L880,180 L920,80 L960,150 L1000,120 L1000,400 Z" fill="currentColor" />
        </svg>
      </div>

      {/* TIER 2: Midground Dense Giant Pines & Interlocking Branches */}
      <div className="absolute inset-0 flex justify-between items-stretch opacity-60">
        
        {/* Left-center massive pine tower */}
        <div className="w-[38vw] max-w-[600px] h-full flex flex-col justify-between -ml-10">
          <svg className="w-full h-screen text-[#02180c] animate-tree-left" viewBox="0 0 300 800" fill="none" preserveAspectRatio="xMinYMid slice">
            <defs>
              <linearGradient id="treeGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#010a04" />
                <stop offset="70%" stopColor="#042211" />
                <stop offset="100%" stopColor="#0a3d1e" />
              </linearGradient>
            </defs>
            <path d="M 40,800 C 50,500 45,200 60,0 L 90,0 C 80,200 75,500 70,800 Z" fill="url(#treeGradLeft)" />
            <path d="M 60,650 Q 150,620 280,640 Q 150,655 58,680 Z" fill="#031e0f" />
            <path d="M 58,520 Q 180,480 290,510 Q 160,530 56,550 Z" fill="#042613" />
            <path d="M 62,380 Q 200,340 300,360 Q 180,390 60,410 Z" fill="#052c16" />
            <path d="M 60,240 Q 170,200 270,220 Q 150,250 58,265 Z" fill="#063219" />
            <path d="M 58,110 Q 140,80 230,100 Q 130,120 58,135 Z" fill="#073a1d" />
            <path d="M 120,625 C 140,600 170,595 190,620 C 210,600 240,610 270,635 C 230,645 180,640 120,625 Z" fill="#084221" opacity="0.9" />
            <path d="M 130,485 C 160,460 190,455 220,480 C 250,465 270,480 290,505 C 240,515 180,505 130,485 Z" fill="#084221" opacity="0.9" />
            <path d="M 140,345 C 170,320 210,320 240,340 C 270,330 290,345 300,358 C 250,370 190,360 140,345 Z" fill="#094a25" opacity="0.9" />
          </svg>
        </div>

        {/* Right-center massive pine tower */}
        <div className="w-[38vw] max-w-[600px] h-full flex flex-col justify-between -mr-10">
          <svg className="w-full h-screen text-[#02180c] animate-tree-right" viewBox="0 0 300 800" fill="none" preserveAspectRatio="xMaxYMid slice">
            <defs>
              <linearGradient id="treeGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#010a04" />
                <stop offset="70%" stopColor="#042211" />
                <stop offset="100%" stopColor="#0a3d1e" />
              </linearGradient>
            </defs>
            <path d="M 260,800 C 250,500 255,200 240,0 L 210,0 C 220,200 225,500 230,800 Z" fill="url(#treeGradRight)" />
            <path d="M 240,670 Q 150,630 20,650 Q 150,675 242,700 Z" fill="#031e0f" />
            <path d="M 242,530 Q 120,490 10,520 Q 140,545 244,560 Z" fill="#042613" />
            <path d="M 238,390 Q 100,350 0,370 Q 120,400 240,420 Z" fill="#052c16" />
            <path d="M 240,250 Q 130,210 30,230 Q 150,260 242,275 Z" fill="#063219" />
            <path d="M 242,120 Q 160,90 70,110 Q 170,130 242,145 Z" fill="#073a1d" />
            <path d="M 180,635 C 160,610 130,605 110,630 C 90,610 60,620 30,645 C 70,655 120,650 180,635 Z" fill="#084221" opacity="0.9" />
            <path d="M 170,495 C 140,470 110,465 80,490 C 50,475 30,490 10,515 C 60,525 120,515 170,495 Z" fill="#084221" opacity="0.9" />
            <path d="M 160,355 C 130,330 90,330 60,350 C 30,340 10,355 0,368 C 50,380 110,370 160,355 Z" fill="#094a25" opacity="0.9" />
          </svg>
        </div>

      </div>

      {/* TIER 3: Foreground Overhanging Ancient Arching Canopy Branches */}
      <div className="absolute inset-x-0 top-0 h-[45vh] pointer-events-none filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.95)]">
        <svg className="w-full h-full text-[#010904]" preserveAspectRatio="none" viewBox="0 0 1200 450">
          <defs>
            <linearGradient id="canopyGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#010703" />
              <stop offset="85%" stopColor="#031f0f" />
              <stop offset="100%" stopColor="#8fe38a" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M -50,-20 L 550,-20 Q 500,80 420,120 Q 300,160 180,110 Q 80,180 -50,220 Z" fill="url(#canopyGlow)" />
          <path d="M 180,110 Q 280,190 380,240 Q 260,260 140,180 Q 20,280 -50,340 L -50,180 Z" fill="#021208" />
          <path d="M 1250,-20 L 650,-20 Q 700,80 780,120 Q 900,160 1020,110 Q 1120,180 1250,220 Z" fill="url(#canopyGlow)" />
          <path d="M 1020,110 Q 920,190 820,240 Q 940,260 1060,180 Q 1180,280 1250,340 L 1250,180 Z" fill="#021208" />
        </svg>
      </div>

      {/* TIER 4: Bottom Forest Floor Base Layer */}
      <div className="absolute inset-x-0 bottom-0 h-[38vh] flex justify-between items-end filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.95)]">
        <svg className="w-full h-full text-[#010b05]" preserveAspectRatio="none" viewBox="0 0 1200 350">
          <path d="M -30,350 L -30,120 L 40,220 L 90,80 L 150,200 L 220,50 L 290,190 L 370,30 L 440,180 L 520,70 L 600,210 L 680,40 L 760,180 L 840,60 L 920,200 L 1000,40 L 1070,180 L 1150,90 L 1230,350 Z" fill="#02160c" />
          <path d="M -10,350 L 20,180 L 70,260 L 130,140 L 190,250 L 270,110 L 340,240 L 420,90 L 500,230 L 580,120 L 660,250 L 740,100 L 820,230 L 900,110 L 970,240 L 1050,120 L 1120,260 L 1210,350 Z" fill="#010d05" />
        </svg>
      </div>

      {/* Subtle Depth 3D Vignette Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020b05] via-transparent to-[#020b05]/60 pointer-events-none" />
    </div>
  );
}

