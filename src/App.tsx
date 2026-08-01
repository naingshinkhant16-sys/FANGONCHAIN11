import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Sparkles, 
  MessageSquare, 
  Twitter, 
  Disc, 
  Link as LinkIcon, 
  Database,
  ArrowRight,
  ShieldAlert,
  Menu,
  X,
  Lock,
  Grid
} from "lucide-react";

// Reusable custom modular components
import GlitchImage from "./components/GlitchImage";
import BushMint from "./components/BushMint";
import WhitelistChecklist from "./components/WhitelistChecklist";
import Roadmap from "./components/Roadmap";
import AdminPanel from "./components/AdminPanel";
import CursorFollower from "./components/CursorFollower";
import FirefliesBackground from "./components/FirefliesBackground";
import Forest3DBackground from "./components/Forest3DBackground";
import GalleryPage from "./components/GalleryPage";

// Import asset images
import fangLogo from "./assets/images/logo_fang.png";
import image1 from "./assets/images/display_fang1.png";
import image2 from "./assets/images/display_fang2.png";
import image3 from "./assets/images/display_fang3.png";
import image4 from "./assets/images/display_fang4.png";
import image5 from "./assets/images/outcome1.png";
import image6 from "./assets/images/outcome2.png";
import image7 from "./assets/images/outcome3.png";
import image8 from "./assets/images/outcome4.png";

// 4 Genesis FANG Specimens
const GALLERY_4_SPECIMENS = [
  { id: "#0001", src: image1, title: "Bloomrot Alpha", rarity: "Epic", powerScore: 94 },
  { id: "#0002", src: image2, title: "Blaze Rebel", rarity: "Rare", powerScore: 88 },
  { id: "#0003", src: image3, title: "Box-Bot Voyager", rarity: "Legendary", powerScore: 99 },
  { id: "#0004", src: image4, title: "Bruiser Cub", rarity: "Common", powerScore: 75 },
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAdminConsole, setShowAdminConsole] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== "undefined" ? window.location.pathname : "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string, hash?: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path + (hash ? hash : ""));
      setCurrentPath(path);
    } else if (hash) {
      window.history.pushState({}, "", hash);
    }
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020b05] text-slate-100">
      
      {/* 3D Bioluminescent Fireflies Background */}
      <FirefliesBackground />

      {/* Fancy target cursor follower */}
      <CursorFollower />

      {/* Dynamic Floating Forest Leaves Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => {
          const scale = 0.5 + Math.random() * 0.8;
          const left = `${Math.random() * 100}%`;
          const delay = `${Math.random() * 12}s`;
          const duration = `${15 + Math.random() * 12}s`;
          const emoji = ["🍃", "🌿", "🍂"][i % 3];
          return (
            <span 
              key={i}
              className="leaf-particle"
              style={{
                left,
                animationDelay: delay,
                animationDuration: duration,
                transform: `scale(${scale})`,
                filter: "hue-rotate(20deg) brightness(0.8) saturate(1.2)",
              }}
            >
              {emoji}
            </span>
          );
        })}
      </div>
      
      {/* Immersive Background Forest overlays and parallax particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/45 via-[#020a04] to-[#010602] pointer-events-none z-0" />
      
      {/* Full-fill 3D Forest background with giant towering trees and arching branches */}
      <Forest3DBackground />
      
      {/* Jungle fog dust effect */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-transparent via-[#020b05]/10 to-[#020b05] pointer-events-none z-0" />
      
      {/* Halftone matrix pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(rgba(16,185,129,0.5)_1px,transparent_1px)] [background-size:16px_16px] z-0" />

      {/* HEADER / NAVIGATION */}
      <header className="relative z-40 border-b border-[rgba(143,227,138,0.18)] bg-[#081410]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* FANG Logo with Red Slash */}
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); navigateTo("/"); }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-[#0f2418] border border-[#e05a3a] flex items-center justify-center shadow-[2px_2px_0px_#e05a3a] overflow-hidden p-0.5">
              <img src={fangLogo} alt="FANG Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-wider text-[#ece6d6] uppercase leading-none group-hover:text-[#8fe38a] transition-colors">
                FANG
              </span>
              <span className="font-mono text-[9px] text-[#e05a3a] uppercase tracking-widest font-black mt-1">
                DEFI & SCARCITY ECOSYSTEM
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 font-display text-xs font-bold uppercase tracking-widest text-[#a39d8c]">
            <a 
              href="/#about-section" 
              onClick={(e) => { e.preventDefault(); navigateTo("/", "#about-section"); }}
              className="hover:text-[#8fe38a] transition-colors"
            >
              Ecosystem
            </a>
            <a 
              href="/#bush-mint-section" 
              onClick={(e) => { e.preventDefault(); navigateTo("/", "#bush-mint-section"); }}
              className="hover:text-[#8fe38a] transition-colors"
            >
              Portal
            </a>
            <a 
              href="/#whitelist-section" 
              onClick={(e) => { e.preventDefault(); navigateTo("/", "#whitelist-section"); }}
              className="hover:text-[#8fe38a] transition-colors text-[#e05a3a]"
            >
              Trail List
            </a>
            <a 
              href="/gallery" 
              onClick={(e) => { e.preventDefault(); navigateTo("/gallery"); }}
              className={`transition-colors flex items-center gap-1.5 ${
                currentPath === "/gallery"
                  ? "text-[#8fe38a] border-b-2 border-[#8fe38a] pb-0.5"
                  : "hover:text-[#8fe38a]"
              }`}
            >
              <span>Gallery</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#e05a3a] text-black font-black">12</span>
            </a>
            <a 
              href="/#roadmap-section" 
              onClick={(e) => { e.preventDefault(); navigateTo("/", "#roadmap-section"); }}
              className="hover:text-[#8fe38a] transition-colors"
            >
              Map
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#ece6d6] p-2 border border-[rgba(143,227,138,0.2)] bg-[#0f2418] cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-[rgba(143,227,138,0.18)] bg-[#081410] px-4 pt-4 pb-6 space-y-3 font-display text-xs font-bold uppercase tracking-wider"
          >
            <a 
              href="/#about-section" 
              onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigateTo("/", "#about-section"); }} 
              className="block py-2 text-[#ece6d6] hover:text-[#8fe38a]"
            >
              Ecosystem
            </a>
            <a 
              href="/#bush-mint-section" 
              onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigateTo("/", "#bush-mint-section"); }} 
              className="block py-2 text-[#ece6d6] hover:text-[#8fe38a]"
            >
              Portal
            </a>
            <a 
              href="/#whitelist-section" 
              onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigateTo("/", "#whitelist-section"); }} 
              className="block py-2 text-[#e05a3a] hover:text-[#8fe38a]"
            >
              Trail List
            </a>
            <a 
              href="/gallery" 
              onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigateTo("/gallery"); }} 
              className={`block py-2 flex items-center justify-between ${
                currentPath === "/gallery" ? "text-[#8fe38a] font-black" : "text-[#ece6d6] hover:text-[#8fe38a]"
              }`}
            >
              <span>Gallery (Honorary 12)</span>
              <span className="text-[9px] font-mono px-2 py-0.5 bg-[#e05a3a] text-black font-black">12 SPECIMENS</span>
            </a>
            <a 
              href="/#roadmap-section" 
              onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigateTo("/", "#roadmap-section"); }} 
              className="block py-2 text-[#ece6d6] hover:text-[#8fe38a]"
            >
              Map
            </a>
            <a href="#admin-panel-section" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[#8fe38a] flex items-center gap-1.5">
              <Database className="w-4 h-4" /> Ledger Sync
            </a>
          </motion.div>
        )}
      </header>

      {/* MAIN VIEW CONDITIONAL ROUTING: /gallery VS HOME */}
      {currentPath === "/gallery" ? (
        <GalleryPage 
          onNavigateHome={() => navigateTo("/")}
          onNavigateToPortal={() => navigateTo("/", "#bush-mint-section")}
        />
      ) : (
        <>
          {/* HERO SECTION / GENERAL MINT CONTAINER */}
          <section className="relative z-10 pt-16 md:pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left: Headline & Live Statistics */}
              <div className="lg:col-span-5 text-left font-display">
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-[#0f2418] border border-[#8fe38a]/40 shadow-[0_4px_12px_rgba(143,227,138,0.15)]">
                  <Sparkles className="w-4 h-4 text-[#8fe38a] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#8fe38a] tracking-wider uppercase">5,000 GENESIS NFTS · $FANG DEFI</span>
                </div>

                <h1 className="font-black text-4xl md:text-5xl lg:text-6xl text-[#ece6d6] tracking-wide leading-tight mb-6 uppercase">
                  Unlocking the Power of <span className="text-[#8fe38a]">Web3</span> with <span className="text-[#e05a3a]">FANG.</span>
                </h1>

                <p className="text-[#a39d8c] text-sm md:text-base leading-relaxed mb-8 font-mono">
                  A premier collection of 5,000 Genesis NFTs bridging artistic scarcity with a high-yield DeFi ecosystem. Mint, Stake, Swap, and Earn $FANG.
                </p>

                {/* Live Stats Board with 3D Depth */}
                <div className="grid grid-cols-3 gap-3 font-mono p-4 sm:p-5 box-3d-deep mb-8 text-left">
                  <div>
                    <div className="text-[10px] text-[#a39d8c] uppercase font-bold tracking-wider">SUPPLY</div>
                    <div className="text-lg sm:text-xl font-black text-[#ece6d6]">5,000</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#a39d8c] uppercase font-bold tracking-wider">PRICE</div>
                    <div className="text-lg sm:text-xl font-black text-[#ece6d6]">0.0008 <span className="text-xs text-[#8fe38a] font-bold">ETH</span></div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#a39d8c] uppercase font-bold tracking-wider">DATE</div>
                    <div className="text-lg sm:text-xl font-black text-[#8fe38a]">TBA</div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="flex gap-4 items-center">
                  <a 
                    href="#bush-mint-section" 
                    className="btn-fang-primary cursor-pointer text-xs font-black uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>HUNT IN THE BRUSH</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <span className="text-[10px] text-[#a39d8c] font-mono uppercase">ERC-721A MAINNET</span>
                </div>
              </div>

              {/* Right: The Amazing Interactive "Bushes Mint" Engine */}
              <div className="lg:col-span-7" id="bush-mint-section">
                <BushMint />
              </div>

            </div>
          </section>

          {/* SECTION: ABOUT & SANCTUARY LORE */}
          <section id="about-section" className="relative z-10 py-16 md:py-20 border-t border-[rgba(143,227,138,0.18)] bg-[#081410]/80">
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
              <div className="max-w-3xl mx-auto font-display">
                <span className="text-xs font-mono font-bold text-[#8fe38a] tracking-widest uppercase block mb-3">// ARCHITECTURE_AND_UTILITY</span>
                <h2 className="font-black text-3xl md:text-5xl text-[#ece6d6] mb-6 tracking-wide uppercase">THE $FANG ECOSYSTEM</h2>
                <p className="text-[#a39d8c] font-mono text-xs md:text-sm leading-relaxed">
                  Synthesizing digital scarcity, DeFi yield generation, and physical streetwear. Each Genesis FANG NFT provides direct access to staking pools, governance votes, and exclusive drop portals.
                </p>
              </div>
            </motion.div>
          </section>

          {/* SECTION: SNEAK PEAK IMAGES WITH SPIDER-VERSE GLITCH EFFECT */}
          <section id="sneak-peak-section" className="relative z-10 py-24 bg-[#081410]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
              >
                <div className="text-left font-display">
                  <span className="text-xs font-mono font-bold text-[#e05a3a] tracking-widest uppercase block mb-2">CHROMATIC_ABERRATION // SCANNER</span>
                  <h2 className="font-black text-3xl md:text-5xl text-[#ece6d6] tracking-wide leading-none uppercase">Genesis FANG Preview</h2>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right">
                  <p className="text-[#a39d8c] text-xs md:text-sm font-mono max-w-sm leading-relaxed mb-3">
                    Hover over or touch each specimen to trigger real-time glitch aberration split-layer effects.
                  </p>
                  <button 
                    onClick={() => navigateTo("/gallery")}
                    className="text-xs font-mono font-bold text-[#8fe38a] hover:text-[#e05a3a] uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View All 12 Jungle Fangs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>

              {/* Glitch Grid of 4 Image Spaces */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
              >
                {GALLERY_4_SPECIMENS.map((item) => (
                  <GlitchImage 
                    key={item.id}
                    src={item.src} 
                    alt={`${item.title} Genesis FANG specimen ${item.id}`} 
                    title={item.title} 
                    rarity={item.rarity} 
                    specimenId={item.id}
                    powerScore={item.powerScore}
                  />
                ))}
              </motion.div>

              {/* CTA to full 12 Gallery page */}
              <div className="mt-12 text-center">
                <button 
                  onClick={() => navigateTo("/gallery")}
                  className="btn-fang-primary cursor-pointer text-xs font-mono font-black uppercase tracking-wider inline-flex items-center gap-2 shadow-[0_10px_25px_rgba(224,90,58,0.4)]"
                >
                  <Grid className="w-4 h-4" />
                  <span>EXPLORE ALL 12 HONORARY FANGS IN JUNGLE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </section>

          {/* SECTION: ROADMAP TIMELINE */}
          <section id="roadmap-section" className="relative z-10 py-24 border-t border-[rgba(143,227,138,0.18)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-2xl mx-auto mb-16 font-display"
              >
                <span className="text-xs font-mono font-bold text-[#8fe38a] tracking-widest uppercase block mb-3">// ECOSYSTEM_MILESTONES</span>
                <h2 className="font-black text-3xl md:text-5xl text-[#ece6d6] tracking-tight leading-none uppercase">FANG Roadmap</h2>
                <p className="text-[#a39d8c] font-mono text-xs md:text-sm mt-4 leading-relaxed">
                  Synthesizing physical collectibles, decentralized staking pools, governance DAOs, and cross-chain utility.
                </p>
              </motion.div>

              <Roadmap />

            </div>
          </section>

          {/* SECTION: PROVE YOU'RE PACK MATERIAL (WHITELIST CHECKLIST) */}
          <div id="whitelist-section">
            <WhitelistChecklist />
          </div>
        </>
      )}

      {/* ADMIN PANEL CONSOLE (ACCESSIBLE VIA FOOTER IF NEEDED) */}
      <AnimatePresence>
        {showAdminConsole && (
          <section className="relative z-10 py-12 border-t border-[rgba(143,227,138,0.18)] bg-[#040d08]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-xs text-[#8fe38a] font-bold uppercase tracking-wider">// SITE_ADMIN_SETTINGS</span>
                <button 
                  onClick={() => setShowAdminConsole(false)}
                  className="text-xs font-mono text-[#e05a3a] hover:underline cursor-pointer"
                >
                  Close Settings ✕
                </button>
              </div>
              <AdminPanel />
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="relative z-30 border-t border-[rgba(143,227,138,0.18)] bg-[#081410] py-12 text-center text-[#a39d8c] font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-[#0f2418] border border-[#e05a3a] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M6 3 L11 15 L12 9 L13 15 L18 3" stroke="#e05a3a" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xs text-[#ece6d6] uppercase tracking-wider leading-none">FANG DEFI ECOSYSTEM</span>
              <span className="text-[9px] text-[#a39d8c] mt-1 uppercase font-bold tracking-widest">© 2026 FANG GENESIS · ALL RIGHTS RESERVED</span>
            </div>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-3 text-[#a39d8c]">
            <a href="https://x.com/Fangonchain" target="_blank" rel="noreferrer" className="hover:text-[#8fe38a] transition-colors p-2 bg-[#0f2418] border border-[rgba(143,227,138,0.2)]">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-[#8fe38a] transition-colors p-2 bg-[#0f2418] border border-[rgba(143,227,138,0.2)]">
              <Disc className="w-4 h-4" />
            </a>
            <a href="https://etherscan.io" target="_blank" rel="noreferrer" className="hover:text-[#8fe38a] transition-colors p-2 bg-[#0f2418] border border-[rgba(143,227,138,0.2)]">
              <LinkIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="text-right text-[10px] text-[#a39d8c] uppercase flex flex-col items-end gap-1">
            <span>NETWORK: ETHEREUM_MAINNET</span>
            <button 
              onClick={() => setShowAdminConsole(!showAdminConsole)}
              className="text-[9px] text-[#8fe38a]/50 hover:text-[#8fe38a] transition-colors cursor-pointer"
            >
              [Owner Ledger Sync]
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
