import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  ArrowLeft, 
  ShieldAlert, 
  Flame, 
  Zap, 
  Eye, 
  Swords, 
  ExternalLink,
  ChevronRight,
  Share2,
  Check
} from "lucide-react";

import GlitchImage from "./GlitchImage";
import { FangSpecimen } from "../types";

// Import all 12 Genesis Jungle FANG specimens
import image1 from "../assets/images/Mythic1.png";
import image2 from "../assets/images/Mythic2.png";
import image3 from "../assets/images/Mythic3.png";
import image4 from "../assets/images/Mythic4.png";
import image5 from "../assets/images/Mythic5.png";
import image6 from "../assets/images/Mythic6.png";
import image7 from "../assets/images/Mythic7.png";
import image8 from "../assets/images/Mythic8.png";
import image9 from "../assets/images/Mythic9.png";
import image10 from "../assets/images/Mythic10.png";
import image11 from "../assets/images/Mythic11.png";
import image12 from "../assets/images/Mythic12.png";

// 12 Honorary Fangs in Jungle
export const HONORARY_12_SPECIMENS: FangSpecimen[] = [
  {
    id: "#0001",
    src: image1,
    title: "HED",
    rarity: "1/1 Mythic",
    powerScore: 94,
    element: "Bio-Spore",
    stats: { attack: 92, speed: 85, stealth: 88, ferocity: 95 },
    description: "Formed in the deepest spores of the toxic jungle canopy. Emits bioluminescent spore clouds that paralyze prey before striking."
  },
  {
    id: "#0002",
    src: image2,
    title: "Leomaxi",
    rarity: "1/1 Mythic",
    powerScore: 88,
    element: "Plasma Fire",
    stats: { attack: 89, speed: 94, stealth: 72, ferocity: 91 },
    description: "Carrying embers of the ancient core beneath the jungle floor. Known for lightning-fast plasma dashes through dense brush."
  },
  {
    id: "#0003",
    src: image3,
    title: "Oguz",
    rarity: "1/1 Mythic",
    powerScore: 99,
    element: "Cyber-Armor",
    stats: { attack: 98, speed: 90, stealth: 82, ferocity: 99 },
    description: "An ancient cybernetic guardian resurrected by jungle mana. Constructed with reinforced tungsten plating and high-voltage core."
  },
  {
    id: "#0004",
    src: image4,
    title: "SHREDDER",
    rarity: "1/1 Mythic",
    powerScore: 75,
    element: "Timber Earth",
    stats: { attack: 74, speed: 78, stealth: 80, ferocity: 72 },
    description: "A fierce young specimen learning the path of the jungle pack. Quick to strike and fiercely loyal to the Alpha pack."
  },
  {
    id: "#0005",
    src: image5,
    title: "Adam Weitsman",
    rarity: "1/1 Mythic",
    powerScore: 100,
    element: "Void-Shadow",
    stats: { attack: 99, speed: 99, stealth: 100, ferocity: 98 },
    description: "The ghost of the nocturnal foliage. Steps between shadow dimensions without producing a single sound in the jungle canopy."
  },
  {
    id: "#0006",
    src: image6,
    title: "Evokein",
    rarity: "1/1 Mythic",
    powerScore: 92,
    element: "Toxic Acid",
    stats: { attack: 91, speed: 89, stealth: 93, ferocity: 88 },
    description: "Coated in lethal neurotoxic foliage resins. Its fangs leak corrosive energy capable of melting cyber-shields."
  },
  {
    id: "#0007",
    src: image7,
    title: "Meek",
    rarity: "1/1 Mythic",
    powerScore: 97,
    element: "Bioluminescence",
    stats: { attack: 95, speed: 92, stealth: 87, ferocity: 96 },
    description: "Guards the glowing lily gates of the jungle sanctuary. Its visual aura blinds encroachers while empowering pack allies."
  },
  {
    id: "#0008",
    src: image8,
    title: "Caominhweb3",
    rarity: "1/1 Mythic",
    powerScore: 86,
    element: "Ancient Wood",
    stats: { attack: 84, speed: 81, stealth: 91, ferocity: 85 },
    description: "Entwined with petrified ironwood vines. Absorbs physical kinetic impact and regenerates health under canopy moonlight."
  },
  {
    id: "#0009",
    src: image9,
    title: "Jayy",
    rarity: "1/1 Mythic",
    powerScore: 98,
    element: "Alpha Command",
    stats: { attack: 97, speed: 94, stealth: 85, ferocity: 100 },
    description: "The revered ruler of the 5,000 FANG pack. Commands absolute respect and unlocks max yield multipliers in staking pools."
  },
  {
    id: "#0010",
    src: image10,
    title: "VIOLET",
    rarity: "Mythic",
    powerScore: 99,
    element: "Hyper-Tech",
    stats: { attack: 100, speed: 96, stealth: 90, ferocity: 97 },
    description: "Enhanced with optic HUD scanners and plasma jaw actuators. Built for high-frequency hunting across all Web3 domains."
  },
  {
    id: "#0011",
    src: image11,
    title: "VFFONSO",
    rarity: "1/1 Mythic",
    powerScore: 96,
    element: "Stargate Mana",
    stats: { attack: 93, speed: 97, stealth: 94, ferocity: 93 },
    description: "Stationed at Phase 3 Portal coordinates. Harnesses cosmic wormhole energy to teleport across jungle sectors."
  },
  {
    id: "#0012",
    src: image12,
    title: "Ace King",
    rarity: "1/1 Mythic",
    powerScore: 95,
    element: "Jungle Summit",
    stats: { attack: 96, speed: 88, stealth: 86, ferocity: 96 },
    description: "Perched atop the highest jungle peak. Surveys all lower trails and guards the Genesis vault with impenetrable roar."
  }
];

interface GalleryPageProps {
  onNavigateHome: () => void;
  onNavigateToPortal: () => void;
}

export default function GalleryPage({ onNavigateHome, onNavigateToPortal }: GalleryPageProps) {
  const [selectedRarity, setSelectedRarity] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"power-desc" | "power-asc" | "id-asc" | "id-desc">("power-desc");
  const [activeSpecimenModal, setActiveSpecimenModal] = useState<FangSpecimen | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  // Filter logic
  const filteredSpecimens = HONORARY_12_SPECIMENS.filter((specimen) => {
    const matchesRarity = selectedRarity === "All" || specimen.rarity.toLowerCase() === selectedRarity.toLowerCase();
    const matchesSearch = 
      specimen.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specimen.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specimen.element.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specimen.rarity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRarity && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "power-desc") return b.powerScore - a.powerScore;
    if (sortBy === "power-asc") return a.powerScore - b.powerScore;
    if (sortBy === "id-asc") return a.id.localeCompare(b.id);
    if (sortBy === "id-desc") return b.id.localeCompare(a.id);
    return 0;
  });

  const handleCopySpecimen = (id: string) => {
    navigator.clipboard.writeText(`FANG_SPECIMEN_${id}`);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getRarityBadgeStyle = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "mythic": return "border-red-500 text-red-400 bg-red-950/50 shadow-[0_0_12px_rgba(239,68,68,0.4)]";
      case "legendary": return "border-amber-400 text-amber-300 bg-amber-950/50 shadow-[0_0_12px_rgba(251,191,36,0.4)]";
      case "epic": return "border-purple-400 text-purple-300 bg-purple-950/50 shadow-[0_0_12px_rgba(192,132,252,0.4)]";
      case "rare": return "border-cyan-400 text-cyan-300 bg-cyan-950/50 shadow-[0_0_12px_rgba(34,211,238,0.4)]";
      default: return "border-[#8fe38a] text-[#8fe38a] bg-[#1e3d28]/50";
    }
  };

  return (
    <div className="relative z-10 pt-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Return Breadcrumb */}
      <div className="mb-8 flex flex-wrap justify-between items-center gap-4 font-mono text-xs">
        <button 
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0f2418] border border-[rgba(143,227,138,0.3)] text-[#ece6d6] hover:text-[#8fe38a] hover:border-[#8fe38a] transition-all cursor-pointer font-bold uppercase tracking-wider shadow-[2px_2px_0px_#8fe38a]"
        >
          <ArrowLeft className="w-4 h-4 text-[#8fe38a]" />
          <span>RETURN TO MAIN SANCTUARY</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#020d06] border border-[#8fe38a]/20 text-[#a39d8c]">
          <span className="w-2 h-2 rounded-full bg-[#8fe38a] animate-ping" />
          <span>LOCATION: /gallery // 12_HONORARY_PLANTED_FANGS</span>
        </div>
      </div>

      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-12 font-display"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0f2418] border border-[#8fe38a]/40 shadow-[0_4px_16px_rgba(143,227,138,0.2)] mb-4">
          <Sparkles className="w-4 h-4 text-[#8fe38a] animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#8fe38a] tracking-widest uppercase">
            JUNGLE_HONORARY // GENESIS_ARCHIVE
          </span>
        </div>

        <h1 className="font-black text-4xl sm:text-5xl md:text-6xl text-[#ece6d6] tracking-wide uppercase leading-tight mb-4">
          Honorary of Fangs in <span className="text-[#8fe38a]">Jungle</span>
        </h1>

        <p className="text-[#a39d8c] font-mono text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          12 Ancient Specimens & Cyber-Beasts of the Bioluminescent Jungle. Explore their battle attributes, elemental affinities, power ratings, and rarity tiers.
        </p>

        {/* Quick Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 font-mono text-left p-4 box-3d-deep bg-[#081410]/90">
          <div>
            <div className="text-[10px] text-[#a39d8c] uppercase font-bold">TOTAL HONORARY</div>
            <div className="text-xl font-black text-[#8fe38a]">12 SPECIMENS</div>
          </div>
          <div>
            <div className="text-[10px] text-[#a39d8c] uppercase font-bold">HIGHEST POWER</div>
            <div className="text-xl font-black text-[#e05a3a]">100 PWR</div>
          </div>
          <div>
            <div className="text-[10px] text-[#a39d8c] uppercase font-bold">RARITY CLASSES</div>
            <div className="text-xl font-black text-amber-400">5 TIERS</div>
          </div>
          <div>
            <div className="text-[10px] text-[#a39d8c] uppercase font-bold">BIOME LOCATION</div>
            <div className="text-xl font-black text-cyan-400">DEEP JUNGLE</div>
          </div>
        </div>
      </motion.div>

      {/* FILTER & SEARCH BAR CONTROLS */}
      <div className="mb-10 bg-[#081410]/95 border border-[rgba(143,227,138,0.2)] p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a39d8c]" />
            <input 
              type="text"
              placeholder="Search specimen by name, ID (#0001), element or rarity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#020a04] border border-[rgba(143,227,138,0.25)] text-[#ece6d6] font-mono text-xs placeholder-[#a39d8c]/60 focus:outline-none focus:border-[#8fe38a] transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a39d8c] hover:text-[#e05a3a] text-xs font-mono"
              >
                Clear
              </button>
            )}
          </div>

          {/* Rarity filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <span className="text-[10px] text-[#a39d8c] font-bold uppercase mr-1 hidden sm:inline-block flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#8fe38a]" /> RARITY:
            </span>
            {["All", "Mythic", "Legendary", "Epic", "Rare", "Common"].map((rarity) => (
              <button
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={`px-3 py-1.5 font-bold uppercase transition-all cursor-pointer ${
                  selectedRarity === rarity
                    ? "bg-[#e05a3a] text-black shadow-[2px_2px_0px_#8fe38a]"
                    : "bg-[#0f2418] text-[#a39d8c] border border-[rgba(143,227,138,0.15)] hover:text-[#ece6d6] hover:border-[#8fe38a]/40"
                }`}
              >
                {rarity}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <SlidersHorizontal className="w-4 h-4 text-[#8fe38a]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#020a04] border border-[rgba(143,227,138,0.25)] text-[#ece6d6] px-3 py-2 text-xs focus:outline-none focus:border-[#8fe38a] cursor-pointer"
            >
              <option value="power-desc">Sort: Power (High → Low)</option>
              <option value="power-asc">Sort: Power (Low → High)</option>
              <option value="id-asc">Sort: ID (#0001 → #0012)</option>
              <option value="id-desc">Sort: ID (#0012 → #0001)</option>
            </select>
          </div>

        </div>
      </div>

      {/* GALLERY GRID (12 PLACES) */}
      {filteredSpecimens.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[#8fe38a]/20 bg-[#081410]/60 p-8">
          <ShieldAlert className="w-10 h-10 text-[#e05a3a] mx-auto mb-3 animate-bounce" />
          <h3 className="font-display font-black text-xl text-[#ece6d6] uppercase mb-2">No Jungle Specimens Found</h3>
          <p className="font-mono text-xs text-[#a39d8c] mb-4">No honorary Fangs match your current filter parameters "{searchQuery || selectedRarity}".</p>
          <button 
            onClick={() => { setSelectedRarity("All"); setSearchQuery(""); }}
            className="btn-fang-primary text-xs uppercase font-mono"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpecimens.map((specimen, idx) => (
            <motion.div
              key={specimen.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              onClick={() => setActiveSpecimenModal(specimen)}
              className="cursor-pointer group"
            >
              <GlitchImage 
                src={specimen.src}
                alt={`${specimen.title} Genesis FANG specimen ${specimen.id}`}
                title={specimen.title}
                rarity={specimen.rarity}
                specimenId={specimen.id}
                powerScore={specimen.powerScore}
              />
              <div className="mt-2 flex justify-between items-center font-mono text-[10px] text-[#a39d8c] px-1">
                <span className="text-[#8fe38a] font-bold group-hover:underline flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Inspect Specimen
                </span>
                <span className="text-[#e05a3a] uppercase font-bold">{specimen.element}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* BOTTOM CTA: HUNT IN THE BRUSH PORTAL */}
      <div className="mt-16 p-8 bg-[#0f2418]/90 border border-[#8fe38a]/40 text-center relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
        <div className="relative z-10 max-w-2xl mx-auto font-display">
          <span className="text-xs font-mono font-bold text-[#e05a3a] uppercase tracking-widest block mb-2">READY TO CLAIM YOUR OWN FANG?</span>
          <h2 className="font-black text-2xl sm:text-3xl text-[#ece6d6] uppercase tracking-wide mb-4">Enter the Brush Mint Portal</h2>
          <p className="font-mono text-xs text-[#a39d8c] mb-6">
            Search through bioluminescent bushes in our interactive minting portal to discover undiscovered Genesis FANG specimens.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={onNavigateToPortal}
              className="btn-fang-primary text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <span>GO TO BRUSH MINT PORTAL</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onNavigateHome}
              className="btn-fang-ghost text-xs font-bold uppercase tracking-wider"
            >
              RETURN TO MAIN LANDING
            </button>
          </div>
        </div>
      </div>

      {/* SPECIMEN INSPECTION MODAL */}
      <AnimatePresence>
        {activeSpecimenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#081410] border-2 border-[#8fe38a] shadow-[0_0_50px_rgba(143,227,138,0.3)] overflow-hidden font-display"
            >
              {/* Modal Top Bar */}
              <div className="flex justify-between items-center px-5 py-3.5 bg-[#0f2418] border-b border-[#8fe38a]/30">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#8fe38a]">
                  <Flame className="w-4 h-4 text-[#e05a3a]" />
                  <span>SPECIMEN INSPECTOR // {activeSpecimenModal.id}</span>
                </div>
                <button 
                  onClick={() => setActiveSpecimenModal(null)}
                  className="p-1 text-[#a39d8c] hover:text-[#e05a3a] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-h-[80vh] overflow-y-auto">
                
                {/* Left: Image Preview */}
                <div className="relative aspect-square border border-[#8fe38a]/30 overflow-hidden bg-[#020a04] group">
                  <img 
                    src={activeSpecimenModal.src} 
                    alt={activeSpecimenModal.title}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-3 left-3 font-mono text-[10px] bg-[#e05a3a] text-black px-2 py-0.5 uppercase font-black">
                    {activeSpecimenModal.element}
                  </div>
                  <div className={`absolute top-3 right-3 font-mono text-[10px] px-2 py-0.5 uppercase font-black border ${getRarityBadgeStyle(activeSpecimenModal.rarity)}`}>
                    {activeSpecimenModal.rarity}
                  </div>
                </div>

                {/* Right: Specimen Stats & Lore */}
                <div className="text-left font-display">
                  <div className="font-mono text-xs text-[#8fe38a] font-bold uppercase mb-1">GENESIS JUNGLE HONORARY</div>
                  <h3 className="font-black text-2xl sm:text-3xl text-[#ece6d6] uppercase tracking-wide mb-3">
                    {activeSpecimenModal.title}
                  </h3>

                  <p className="font-mono text-xs text-[#a39d8c] leading-relaxed mb-5 bg-[#020a04] p-3 border border-[rgba(143,227,138,0.15)]">
                    {activeSpecimenModal.description}
                  </p>

                  {/* Combat Stats Progress Bars */}
                  <div className="space-y-2.5 font-mono text-xs mb-6">
                    <div>
                      <div className="flex justify-between text-[10px] text-[#a39d8c] font-bold mb-1">
                        <span className="flex items-center gap-1"><Swords className="w-3 h-3 text-[#e05a3a]" /> ATTACK</span>
                        <span className="text-[#ece6d6]">{activeSpecimenModal.stats.attack} / 100</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#020a04] border border-[#8fe38a]/20 overflow-hidden">
                        <div className="h-full bg-[#e05a3a]" style={{ width: `${activeSpecimenModal.stats.attack}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-[#a39d8c] font-bold mb-1">
                        <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-cyan-400" /> SPEED</span>
                        <span className="text-[#ece6d6]">{activeSpecimenModal.stats.speed} / 100</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#020a04] border border-[#8fe38a]/20 overflow-hidden">
                        <div className="h-full bg-cyan-400" style={{ width: `${activeSpecimenModal.stats.speed}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-[#a39d8c] font-bold mb-1">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-purple-400" /> STEALTH</span>
                        <span className="text-[#ece6d6]">{activeSpecimenModal.stats.stealth} / 100</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#020a04] border border-[#8fe38a]/20 overflow-hidden">
                        <div className="h-full bg-purple-400" style={{ width: `${activeSpecimenModal.stats.stealth}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-[#a39d8c] font-bold mb-1">
                        <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-[#8fe38a]" /> FEROCITY</span>
                        <span className="text-[#ece6d6]">{activeSpecimenModal.stats.ferocity} / 100</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#020a04] border border-[#8fe38a]/20 overflow-hidden">
                        <div className="h-full bg-[#8fe38a]" style={{ width: `${activeSpecimenModal.stats.ferocity}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button 
                      onClick={() => handleCopySpecimen(activeSpecimenModal.id)}
                      className="btn-fang-ghost text-xs font-mono font-bold flex-1 justify-center py-2.5"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-[#8fe38a]" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedId ? "COPIED HASH!" : "COPY SPECIMEN ID"}</span>
                    </button>

                    <button 
                      onClick={() => {
                        setActiveSpecimenModal(null);
                        onNavigateToPortal();
                      }}
                      className="btn-fang-primary text-xs font-mono font-bold flex-1 justify-center py-2.5"
                    >
                      <span>HUNT IN MINT PORTAL</span>
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
