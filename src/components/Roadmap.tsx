import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Flame, Lock, ShieldAlert, Sparkles, ArrowLeftRight, Repeat } from "lucide-react";
import { RoadmapMilestone } from "../types";

import phase3Bg from "../assets/images/phase3_portal_bg_1784898786909.jpg";
import phase4Bg from "../assets/images/phase4_summit_bg_1784898801348.jpg";
import wolfAvatar from "../assets/images/fang_wolf_avatar_1784962343730.jpg";
import wolfAvatarTwo from "../assets/images/fang_wolf_variant_two_1784991921193.jpg";
import fangLogo from "../assets/images/logo_fang.png";

// Interactive Staking Dashboard Widget for Phase 2
function Phase2StakingWidget() {
  return (
    <div className="p-1.5 sm:p-4 space-y-2.5 font-sans">
      <div className="text-[10px] sm:text-[11px] font-mono text-[#8fe38a] uppercase tracking-widest font-bold flex items-center justify-between">
        <span>FANG_STAKING_PROTOCOL</span>
        <span className="text-amber-400 font-extrabold flex items-center gap-1">● COMING SOON</span>
      </div>

      {/* Main Forest Dark Theme Container - Horizontal Grid on all screen sizes */}
      <div className="grid grid-cols-12 gap-2 sm:gap-3.5 bg-[#05110a]/95 border-2 border-[#8fe38a]/40 rounded-2xl p-2 sm:p-4 shadow-[0_12px_30px_rgba(0,0,0,0.85)] backdrop-blur-md">
        
        {/* LEFT COLUMN: STAKING SUMMARY CARD (col-span-5) */}
        <div className="col-span-5 bg-[#081a10] border border-[#8fe38a]/25 rounded-xl p-2 sm:p-3.5 flex flex-col justify-between relative overflow-hidden group">
          {/* Scratch mark background decoration */}
          <div className="absolute top-1 right-1.5 text-[#8fe38a]/15 text-xs sm:text-xl font-mono select-none pointer-events-none">
            ///
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-[#8fe38a]/20 pb-1.5 mb-2 sm:mb-3">
              <h5 className="font-display font-black text-[10px] sm:text-sm text-[#ece6d6] uppercase tracking-wider flex items-center gap-1 truncate">
                <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                <span className="truncate">STAKING SUMMARY</span>
              </h5>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[#8fe38a] bg-[#8fe38a]/10 px-1.5 py-0.5 rounded border border-[#8fe38a]/30">LIVE</span>
            </div>

            <div className="space-y-1.5 sm:space-y-3">
              <div className="bg-[#030c07] p-1.5 sm:p-2.5 rounded-lg border border-[#8fe38a]/15">
                <div className="text-[8px] sm:text-[10px] font-mono text-[#a39d8c] uppercase tracking-wider truncate">NFT STAKE</div>
                <div className="text-sm sm:text-2xl font-black font-display text-[#ece6d6] mt-0.5">
                  ???
                </div>
              </div>

              <div className="bg-[#030c07] p-1.5 sm:p-2.5 rounded-lg border border-[#8fe38a]/15">
                <div className="text-[8px] sm:text-[10px] font-mono text-[#a39d8c] uppercase tracking-wider truncate">Total FANG EARNED</div>
                <div className="text-sm sm:text-2xl font-black font-display text-amber-400 mt-0.5 tracking-wide">
                  ???
                </div>
              </div>

              <div className="bg-[#030c07] p-1.5 sm:p-2.5 rounded-lg border border-[#8fe38a]/15">
                <div className="text-[8px] sm:text-[10px] font-mono text-[#a39d8c] uppercase tracking-wider truncate">Current APY</div>
                <div className="text-sm sm:text-2xl font-black font-display text-[#8fe38a] mt-0.5">
                  ???
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 sm:mt-3.5">
            <button className="w-full py-1 sm:py-2 px-1.5 sm:px-3 rounded-lg bg-gradient-to-r from-amber-700 to-amber-900 border border-amber-500/50 text-[#ece6d6] font-display font-bold text-[9px] sm:text-xs uppercase tracking-wider shadow-md cursor-not-allowed truncate">
              CLAIM ALL
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: MY INVENTORY CARD (col-span-7) */}
        <div className="col-span-7 bg-[#081a10] border border-[#8fe38a]/25 rounded-xl p-2 sm:p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#8fe38a]/20 pb-1.5 mb-2 sm:mb-3">
              <h5 className="font-display font-black text-[10px] sm:text-sm text-[#ece6d6] uppercase tracking-wider truncate">
                MY INVENTORY <span className="text-[9px] sm:text-xs font-normal text-[#8fe38a]">(7 Available)</span>
              </h5>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[#a39d8c]">▾ RECENT</span>
            </div>

            {/* Inventory NFT Grid */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
              
              {/* NFT Card 1 (Image 2) */}
              <div className="bg-[#030c07] border border-[#8fe38a]/20 rounded-lg p-1.5 sm:p-2 flex flex-col justify-between">
                <div>
                  <div className="aspect-square rounded-md overflow-hidden bg-black/80 border border-[#8fe38a]/30 mb-1 sm:mb-2">
                    <img src={wolfAvatar} alt="Genesis Pack #0421" className="w-full h-full object-cover" />
                  </div>
                  <div className="font-display font-bold text-[9px] sm:text-xs text-[#ece6d6] truncate">Genesis Pack</div>
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#a39d8c] mt-0.5">
                    <span>#0421</span>
                    <span className="text-amber-400 font-semibold truncate">UNSTAKED</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-0.5 sm:gap-1 mt-1.5 sm:mt-2.5">
                  <button className="py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-mono font-bold rounded bg-[#0b2416] border border-[#8fe38a]/30 text-[#8fe38a] truncate">
                    SELECT
                  </button>
                  <button className="py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-mono font-bold rounded bg-amber-900/60 border border-amber-500/40 text-amber-200 truncate">
                    STAKE
                  </button>
                </div>
              </div>

              {/* NFT Card 2 (Image 3) */}
              <div className="bg-[#030c07] border border-[#8fe38a]/20 rounded-lg p-1.5 sm:p-2 flex flex-col justify-between">
                <div>
                  <div className="aspect-square rounded-md overflow-hidden bg-black/80 border border-[#8fe38a]/30 mb-1 sm:mb-2">
                    <img src={wolfAvatarTwo} alt="Genesis Pack #0422" className="w-full h-full object-cover" />
                  </div>
                  <div className="font-display font-bold text-[9px] sm:text-xs text-[#ece6d6] truncate">Genesis Pack</div>
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#a39d8c] mt-0.5">
                    <span>#0422</span>
                    <span className="text-amber-400 font-semibold truncate">UNSTAKED</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-0.5 sm:gap-1 mt-1.5 sm:mt-2.5">
                  <button className="py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-mono font-bold rounded bg-[#0b2416] border border-[#8fe38a]/30 text-[#8fe38a] truncate">
                    SELECT
                  </button>
                  <button className="py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-mono font-bold rounded bg-amber-900/60 border border-amber-500/40 text-amber-200 truncate">
                    STAKE
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Phase 2 Locked Section Overlay
function Phase2LockedStakingSection() {
  return (
    <div className="my-5 space-y-3">
      <div className="text-[11px] font-mono text-[#8fe38a] uppercase tracking-widest font-bold flex items-center justify-between">
        <span>FANG_STAKING_PROTOCOL</span>
        <span className="text-amber-400 font-extrabold flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> LOCKED PORTAL
        </span>
      </div>

      {/* Container with light blurred staking widget */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-[#030e08]/90 shadow-[0_12px_35px_rgba(0,0,0,0.95)] group">
        
        {/* Blurred Phase2StakingWidget */}
        <div className="filter blur-[2px] opacity-90 select-none transition-all duration-300 scale-[0.99] group-hover:blur-none group-hover:opacity-100">
          <Phase2StakingWidget />
        </div>
      </div>
    </div>
  );
}

// Interactive Swap Widget for Phase 3
function Phase3SwapWidget() {
  const [isSwapped, setIsSwapped] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSwapClick = () => {
    setIsSpinning(true);
    setIsSwapped(!isSwapped);
    setTimeout(() => setIsSpinning(false), 400);
  };

  const leftAsset = isSwapped
    ? { title: "$FANG", textClass: "text-[#e05a3a]", img: fangLogo, borderClass: "border-[#e05a3a]" }
    : { title: "FANG", textClass: "text-[#ece6d6]", img: wolfAvatar, borderClass: "border-[#8fe38a]" };

  const rightAsset = isSwapped
    ? { title: "FANG", textClass: "text-[#ece6d6]", img: wolfAvatar, borderClass: "border-[#8fe38a]" }
    : { title: "$FANG", textClass: "text-[#e05a3a]", img: fangLogo, borderClass: "border-[#e05a3a]" };

  return (
    <div className="p-2 sm:p-4 space-y-2 sm:space-y-3 font-sans overflow-hidden max-w-full">
      <div className="text-[10px] sm:text-[11px] font-mono text-[#8fe38a] uppercase tracking-widest font-bold flex items-center justify-between">
        <span>DEFI_SWAP_INTERFACE</span>
        <span className="text-amber-400 font-extrabold animate-pulse text-[9px] sm:text-[11px]">● SWAP POOL PREVIEW</span>
      </div>

      {/* Main Dark Swapping Bar Box */}
      <div className="relative bg-[#05110a]/95 border-2 border-[#8fe38a]/40 rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-[0_12px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(143,227,138,0.15)] backdrop-blur-md transition-all overflow-hidden w-full max-w-full">
        <div className="flex items-center justify-between gap-1 sm:gap-3 w-full overflow-hidden">
          
          {/* Left Side: Asset 1 */}
          <div className="flex items-center gap-1 sm:gap-2.5 min-w-0 flex-shrink">
            <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full border-2 ${leftAsset.borderClass} overflow-hidden shadow-lg flex-shrink-0 bg-black/80`}>
              <img src={leftAsset.img} alt={leftAsset.title} className="w-full h-full object-cover" />
            </div>
            <span className={`font-display font-black text-xs sm:text-lg tracking-wider truncate ${leftAsset.textClass}`}>
              {leftAsset.title}
            </span>
          </div>

          {/* Center Cool Horizontal Swapping Button */}
          <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#0b2416] border-2 border-[#8fe38a] text-[#8fe38a] flex items-center justify-center flex-shrink-0">
            <ArrowLeftRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>

          {/* Right Side: Asset 2 */}
          <div className="flex items-center gap-1 sm:gap-2.5 justify-end min-w-0 flex-shrink">
            <span className={`font-display font-black text-xs sm:text-lg tracking-wider truncate ${rightAsset.textClass}`}>
              {rightAsset.title}
            </span>
            <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full border-2 ${rightAsset.borderClass} overflow-hidden shadow-lg flex-shrink-0 bg-black/80`}>
              <img src={rightAsset.img} alt={rightAsset.title} className="w-full h-full object-cover" />
            </div>
          </div>

        </div>

        {/* Live Exchange Rate & Status Footer */}
        <div className="mt-2 sm:mt-3 pt-2 border-t border-[#8fe38a]/15 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-[#a39d8c] overflow-hidden">
          <span className="truncate pr-1">RATE: 1 FANG = 1,000 $FANG</span>
          <span className="text-[#8fe38a] font-bold flex-shrink-0">SLIPPAGE: 0.5%</span>
        </div>
      </div>
    </div>
  );
}

// Phase 3 Locked Section Overlay
function Phase3LockedSwapSection() {
  return (
    <div className="my-5 space-y-3 overflow-hidden">
      <div className="text-[11px] font-mono text-[#8fe38a] uppercase tracking-widest font-bold flex items-center justify-between">
        <span>DEFI_SWAP_INTERFACE</span>
        <span className="text-amber-400 font-extrabold flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> LOCKED PORTAL
        </span>
      </div>

      {/* Container with light blurred swap widget */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-[#030e08]/90 shadow-[0_12px_35px_rgba(0,0,0,0.95)] group">
        
        {/* Blurred Phase3SwapWidget */}
        <div className="filter blur-[1.5px] opacity-90 select-none transition-all duration-300 scale-[0.99] group-hover:blur-none group-hover:opacity-100 overflow-hidden">
          <Phase3SwapWidget />
        </div>
      </div>
    </div>
  );
}

// Tokenomics Donut Chart Widget for Phase 4
function Phase4TokenomicsWidget() {
  const allocation = [
    { label: "Community Staking & Rewards", pct: "40%", color: "#10b981", bgClass: "bg-[#10b981]" },
    { label: "Liquidity Pool", pct: "20%", color: "#06b6d4", bgClass: "bg-[#06b6d4]" },
    { label: "Strategic Fundraising", pct: "20%", color: "#f59e0b", bgClass: "bg-[#f59e0b]" },
    { label: "Team & Advisors", pct: "10%", color: "#3b82f6", bgClass: "bg-[#3b82f6]" },
    { label: "Ecosystem Reserve", pct: "10%", color: "#a855f7", bgClass: "bg-[#a855f7]" },
  ];

  return (
    <div className="p-2 sm:p-4 space-y-3 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#8fe38a]/20 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-emerald-500/60 overflow-hidden bg-black/80 flex-shrink-0">
            <img src={fangLogo} alt="$FANG Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display font-black text-sm sm:text-base text-[#ece6d6] tracking-wider">
            $FANG TOKENOMICS
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#8fe38a] bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
          100,000,000 $FANG
        </span>
      </div>

      {/* Main Grid: Left Donut Chart, Right Breakdown */}
      <div className="bg-[#05110a]/95 border-2 border-[#8fe38a]/40 rounded-2xl p-3 sm:p-5 shadow-[0_12px_30px_rgba(0,0,0,0.85)] backdrop-blur-md flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        
        {/* SVG Donut Chart */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            {/* 40% Community Staking */}
            <circle
              cx="100" cy="100" r="60"
              fill="transparent"
              stroke="#10b981"
              strokeWidth="24"
              strokeDasharray="150.80 226.19"
              strokeDashoffset="0"
              className="transition-all duration-500 hover:opacity-80"
            />
            {/* 20% Liquidity Pool */}
            <circle
              cx="100" cy="100" r="60"
              fill="transparent"
              stroke="#06b6d4"
              strokeWidth="24"
              strokeDasharray="75.40 301.59"
              strokeDashoffset="-150.80"
              className="transition-all duration-500 hover:opacity-80"
            />
            {/* 20% Strategic Fundraising */}
            <circle
              cx="100" cy="100" r="60"
              fill="transparent"
              stroke="#f59e0b"
              strokeWidth="24"
              strokeDasharray="75.40 301.59"
              strokeDashoffset="-226.20"
              className="transition-all duration-500 hover:opacity-80"
            />
            {/* 10% Team & Advisors */}
            <circle
              cx="100" cy="100" r="60"
              fill="transparent"
              stroke="#3b82f6"
              strokeWidth="24"
              strokeDasharray="37.70 339.29"
              strokeDashoffset="-301.60"
              className="transition-all duration-500 hover:opacity-80"
            />
            {/* 10% Ecosystem Reserve */}
            <circle
              cx="100" cy="100" r="60"
              fill="transparent"
              stroke="#a855f7"
              strokeWidth="24"
              strokeDasharray="37.70 339.29"
              strokeDashoffset="-339.30"
              className="transition-all duration-500 hover:opacity-80"
            />
          </svg>

          {/* Donut Center Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-display font-black text-xl sm:text-2xl text-[#ece6d6] tracking-tight">
              100M
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#8fe38a] font-bold uppercase tracking-wider">
              Total Supply
            </span>
          </div>
        </div>

        {/* Right Allocation Breakdown List */}
        <div className="flex-1 w-full space-y-2">
          <div className="text-[10px] font-mono text-[#a39d8c] uppercase tracking-widest font-bold mb-1 border-b border-[#8fe38a]/15 pb-1">
            ALLOCATION BREAKDOWN
          </div>

          <div className="space-y-1.5">
            {allocation.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-[#030c07] border border-[#8fe38a]/15 rounded-lg px-2.5 py-1.5 text-xs font-sans">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.bgClass} flex-shrink-0 shadow-sm`} />
                  <span className="font-medium text-[#ece6d6] text-[11px] sm:text-xs">{item.label}</span>
                </div>
                <span className="font-mono font-bold text-[#8fe38a] text-[11px] sm:text-xs ml-2">{item.pct}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Phase 4 Section - Clean & Unblurred
function Phase4LockedTokenomicsSection() {
  return (
    <div className="my-5 space-y-3">
      <div className="text-[11px] font-mono text-[#8fe38a] uppercase tracking-widest font-bold flex items-center justify-between">
        <span>TOKENOMICS_ALLOCATION_PROTOCOL</span>
        <span className="text-[#8fe38a] font-extrabold flex items-center gap-1.5">
          ● TOKEN LAUNCH (TGE)
        </span>
      </div>

      {/* Container with clean unblurred tokenomics widget */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#8fe38a]/40 bg-[#030e08]/90 shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
        <Phase4TokenomicsWidget />
      </div>
    </div>
  );
}

const ROADMAP_DATA: (RoadmapMilestone & { bgImage?: string; isLocked?: boolean })[] = [
  {
    phase: "PHASE_01",
    title: "GENESIS MINT",
    status: "Completed",
    percentage: "100%",
    description: "Launch of 5,000 unique Fang NFTs. Community building and establishing core presence.",
    deliverables: [
      "5,000 Limited Genesis FANG NFT Collection with 150+ custom cyberpunk traits",
      "Guaranteed Trail List Whitelist allocation & priority minting access",
      "Audited ERC-721A smart contract implementation with instant metadata reveal",
      "Community Discord & holder-exclusive Alpha signals with daily $FANG reward previews"
    ]
  },
  {
    phase: "PHASE_02",
    title: "Ecosystem Staking",
    status: "In Progress",
    percentage: "45%",
    description: "Activating the $FANG yield portal. Genesis FANG holders lock their NFTs to accumulate daily utility tokens.",
    deliverables: [
      "Launch of high-yield staking protocol for Genesis FANG holders",
      "Physical streetwear release: heavyweight embroidered FANG hoodies and vinyl art figures",
      "Pledge of 10% secondary royalties to ecosystem development and liquidity pools",
      "Holder-voted proposal system on snapshot ledger"
    ]
  },
  {
    phase: "PHASE_03",
    title: "Defi & Swap Portal",
    status: "Coming Soon",
    percentage: "0%",
    bgImage: phase3Bg,
    isLocked: true,
    description: "$FANG automated swap pools and physical merchandise store integration currently in stealth development.",
    deliverables: [
      "DeFi liquidity pools and automated token swap portal",
      "Ecosystem marketplace: redeem $FANG for physical gear, rare trait upgrades, and whitelist passes",
      "Strategic partnerships with top Web3 NFT marketplaces",
      "Cross-chain bridge exploration"
    ]
  },
  {
    phase: "PHASE_04",
    title: "TOKEN LAUNCH (TGE)",
    status: "Coming Soon",
    percentage: "0%",
    bgImage: phase4Bg,
    isLocked: false,
    description: "Public Exchange Listings (CEX/DEX), ecosystem expansion, and cross-chain scaling.",
    deliverables: [
      "Public Exchange Listings (CEX/DEX)",
      "Ecosystem expansion and utility integration",
      "Cross-chain scaling and bridge activation"
    ]
  }
];

export default function Roadmap() {
  return (
    <div className="relative font-display">
      {/* Decorative vertical glowing line */}
      <div className="absolute left-4 md:left-1/2 top-8 bottom-8 w-[1px] bg-gradient-to-b from-emerald-500 via-emerald-800 to-transparent opacity-60 hidden sm:block md:-translate-x-1/2" />

      <div className="space-y-12 relative z-10">
        {ROADMAP_DATA.map((milestone, idx) => {
          const isEven = idx % 2 === 0;
          const isLocked = milestone.isLocked;

          return (
            <motion.div 
              key={milestone.phase}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col md:flex-row items-stretch ${isEven ? "md:flex-row-reverse" : ""}`}
            >
              {/* Left/Right content card */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end px-0 md:px-8">
                <div className={`relative w-full max-w-lg p-7 rounded-2xl overflow-hidden border-2 transition-all duration-500 group shadow-[0_24px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(143,227,138,0.2)] ${
                  milestone.status === "Completed" ? "bg-[#06180e]/95 backdrop-blur-xl border-emerald-500/70 shadow-[0_0_30px_rgba(16,185,129,0.35)]" :
                  milestone.status === "In Progress" ? "bg-[#06180e]/95 backdrop-blur-xl border-[#8fe38a] shadow-[0_0_35px_rgba(143,227,138,0.45)]" :
                  "border-amber-500/50 bg-[#06120a]"
                }`}>

                  {/* Swapping Base Background Image for Phase 3 & Phase 4 */}
                  {milestone.bgImage && (
                    <>
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter blur-[8px] scale-110 opacity-40 group-hover:blur-[3px] group-hover:scale-105 group-hover:opacity-60 pointer-events-none"
                        style={{ backgroundImage: `url(${milestone.bgImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040e08]/98 via-[#040e08]/90 to-[#040e08]/80 pointer-events-none" />
                    </>
                  )}

                  <div className={`relative z-10 ${isLocked ? "backdrop-blur-sm" : ""}`}>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-sm font-black text-[#8fe38a] tracking-wider uppercase bg-[#020c06] px-3 py-1 border border-[#8fe38a]/40 shadow-inner">
                        {milestone.phase}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider font-mono font-bold border flex items-center gap-1.5 ${
                        milestone.status === "Completed" ? "bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]" :
                        milestone.status === "In Progress" ? "bg-emerald-500/20 border-[#8fe38a] text-emerald-200 animate-pulse shadow-[0_0_15px_rgba(143,227,138,0.5)]" :
                        "bg-amber-950/80 border-amber-500/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                      }`}>
                        {isLocked && <Lock className="w-3.5 h-3.5 text-amber-400 animate-bounce" />}
                        {milestone.status} {milestone.percentage !== "0%" && `(${milestone.percentage})`}
                      </span>
                    </div>

                    <h4 className="text-2xl md:text-3xl font-black text-slate-100 tracking-wide mb-3 flex items-center gap-2 font-display">
                      {milestone.title}
                    </h4>

                    <p className="text-sm md:text-base font-sans mb-4 leading-relaxed font-medium text-slate-200">
                      {milestone.description}
                    </p>

                    {/* PHASE 02 STAKING UI vs PHASE 03 SWAPPING UI vs PHASE 04 TOKENOMICS vs STANDARD DELIVERABLES */}
                    {milestone.phase === "PHASE_02" ? (
                      <div>
                        <Phase2LockedStakingSection />
                        
                        <div className="mt-4 pt-3 border-t border-emerald-800/40 flex items-center justify-between text-xs font-mono text-[#a39d8c]">
                          <span className="flex items-center gap-1.5 text-[#8fe38a] font-bold">
                            <Sparkles className="w-3.5 h-3.5 text-[#8fe38a]" /> STAKING PROTOCOL
                          </span>
                          <span className="text-[#8fe38a]">STAKING POOL LAUNCH</span>
                        </div>
                      </div>
                    ) : milestone.phase === "PHASE_03" ? (
                      <div>
                        <Phase3LockedSwapSection />
                        
                        <div className="mt-4 pt-3 border-t border-emerald-800/40 flex items-center justify-between text-xs font-mono text-[#a39d8c]">
                          <span className="flex items-center gap-1.5 text-[#8fe38a] font-bold">
                            <Sparkles className="w-3.5 h-3.5 text-[#8fe38a]" /> DEFI SWAP PROTOCOL
                          </span>
                          <span className="text-[#8fe38a]">STEALTH LAUNCH</span>
                        </div>
                      </div>
                    ) : milestone.phase === "PHASE_04" ? (
                      <div>
                        <Phase4LockedTokenomicsSection />
                        
                        <div className="mt-4 pt-3 border-t border-emerald-800/40 flex items-center justify-between text-xs font-mono text-[#a39d8c]">
                          <span className="flex items-center gap-1.5 text-[#8fe38a] font-bold">
                            <Sparkles className="w-3.5 h-3.5 text-[#8fe38a]" /> TOKEN LAUNCH (TGE)
                          </span>
                          <span className="text-[#8fe38a]">100,000,000 $FANG</span>
                        </div>
                      </div>
                    ) : (
                      /* Deliverables bullet items for other phases */
                      <div className="space-y-3 pt-5 border-t border-emerald-800/40 relative">
                        {isLocked && (
                          <div className="mb-4 px-3.5 py-2 rounded-lg bg-amber-950/95 border border-amber-500/60 text-amber-300 font-mono text-xs flex items-center justify-center gap-2 tracking-wider uppercase font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 animate-pulse" />
                            <span>LOCKED PORTAL // STEALTH DEVELOPMENT</span>
                          </div>
                        )}

                        <span className="block text-xs font-mono text-[#8fe38a] uppercase tracking-widest font-bold">Deliverables & Objectives</span>
                        
                        <div className={`space-y-3 transition-all duration-500 ${isLocked ? "filter blur-[0.5px] group-hover:blur-none opacity-85 group-hover:opacity-100 select-none" : ""}`}>
                          {milestone.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2.5 text-sm font-sans text-slate-200 font-medium">
                              <span className="text-[#8fe38a] flex-shrink-0 mt-0.5 text-base">
                                {isLocked ? "🔒" : "🐺"}
                              </span>
                              <span className="leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Timeline center node dot */}
              <div className="absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden sm:flex items-center justify-center z-20">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border bg-[#020f07] ${
                  milestone.status === "Completed" ? "border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]" :
                  milestone.status === "In Progress" ? "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse" :
                  "border-amber-500/70 shadow-[0_0_18px_rgba(245,158,11,0.3)]"
                }`}>
                  {milestone.status === "Completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : milestone.status === "In Progress" ? (
                    <Flame className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-amber-400" />
                  )}
                </div>
              </div>

              {/* Space filler for layout balance on desktop */}
              <div className="w-full md:w-1/2 hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
