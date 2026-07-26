import React, { useState } from "react";
import { motion } from "motion/react";
import { Trophy, Shield, Zap, Search, Award, Flame, Crosshair, Users, Sparkles, Filter } from "lucide-react";

export interface LeaderboardEntry {
  rank: number;
  address: string;
  ens?: string;
  title: string;
  capturesCount: number;
  topRarity: "Legendary" | "Epic" | "Rare" | "Common";
  powerScore: number;
  lastMintedSerial: string;
  timeAgo: string;
  avatarBg: string;
  mintStreak?: number;
}

const MOCK_LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    address: "0x71C...982F",
    ens: "wolf_alpha.eth",
    title: "Apex Alpha",
    capturesCount: 42,
    topRarity: "Legendary",
    powerScore: 9850,
    lastMintedSerial: "FANG-0999",
    timeAgo: "12m ago",
    avatarBg: "from-amber-500/30 to-red-600/30",
    mintStreak: 12,
  },
  {
    rank: 2,
    address: "0x39A...881E",
    ens: "cyber_pack.eth",
    title: "Canopy Berserker",
    capturesCount: 31,
    topRarity: "Legendary",
    powerScore: 8420,
    lastMintedSerial: "FANG-0888",
    timeAgo: "28m ago",
    avatarBg: "from-purple-500/30 to-pink-600/30",
    mintStreak: 8,
  },
  {
    rank: 3,
    address: "0xF82...104B",
    ens: "shadow_hunter.eth",
    title: "Shadow Shinobi",
    capturesCount: 27,
    topRarity: "Epic",
    powerScore: 7100,
    lastMintedSerial: "FANG-0542",
    timeAgo: "1h ago",
    avatarBg: "from-cyan-500/30 to-blue-600/30",
    mintStreak: 5,
  },
  {
    rank: 4,
    address: "0x12D...4A90",
    title: "Foliage Stalker",
    capturesCount: 19,
    topRarity: "Epic",
    powerScore: 5240,
    lastMintedSerial: "LUP-0120",
    timeAgo: "2h ago",
    avatarBg: "from-emerald-500/30 to-teal-600/30",
    mintStreak: 4,
  },
  {
    rank: 5,
    address: "0xE44...992C",
    ens: "wildwood.eth",
    title: "Jungle Pioneer",
    capturesCount: 15,
    topRarity: "Rare",
    powerScore: 4180,
    lastMintedSerial: "LUP-0381",
    timeAgo: "3h ago",
    avatarBg: "from-green-500/30 to-emerald-700/30",
    mintStreak: 3,
  },
  {
    rank: 6,
    address: "0x88B...33C1",
    title: "Shrub Striker",
    capturesCount: 12,
    topRarity: "Rare",
    powerScore: 3350,
    lastMintedSerial: "LUP-0240",
    timeAgo: "5h ago",
    avatarBg: "from-slate-700/40 to-slate-900/40",
    mintStreak: 2,
  },
  {
    rank: 7,
    address: "0x44A...77D3",
    title: "Thicket Tracker",
    capturesCount: 9,
    topRarity: "Rare",
    powerScore: 2600,
    lastMintedSerial: "LUP-0199",
    timeAgo: "7h ago",
    avatarBg: "from-slate-700/40 to-slate-900/40",
    mintStreak: 2,
  },
  {
    rank: 8,
    address: "0x99F...11A8",
    title: "Lupine Seeker",
    capturesCount: 7,
    topRarity: "Common",
    powerScore: 1950,
    lastMintedSerial: "LUP-0112",
    timeAgo: "11h ago",
    avatarBg: "from-slate-700/40 to-slate-900/40",
    mintStreak: 1,
  },
  {
    rank: 9,
    address: "0x22C...00E5",
    title: "Wild Scout",
    capturesCount: 5,
    topRarity: "Common",
    powerScore: 1400,
    lastMintedSerial: "LUP-0085",
    timeAgo: "14h ago",
    avatarBg: "from-slate-700/40 to-slate-900/40",
    mintStreak: 1,
  },
  {
    rank: 10,
    address: "0x66D...55B2",
    title: "Bush Initiate",
    capturesCount: 4,
    topRarity: "Common",
    powerScore: 1100,
    lastMintedSerial: "LUP-0042",
    timeAgo: "1d ago",
    avatarBg: "from-slate-700/40 to-slate-900/40",
    mintStreak: 1,
  },
];

interface LeaderboardProps {
  walletAddress?: string | null;
  walletConnected?: boolean;
}

export default function Leaderboard({ walletAddress, walletConnected }: LeaderboardProps) {
  const [filter, setFilter] = useState<"captures" | "power" | "streak" | "recent">("captures");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort entries based on active tab
  const getSortedEntries = () => {
    let entries = [...MOCK_LEADERBOARD_DATA];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      entries = entries.filter(
        (e) =>
          e.address.toLowerCase().includes(q) ||
          (e.ens && e.ens.toLowerCase().includes(q)) ||
          e.title.toLowerCase().includes(q) ||
          e.lastMintedSerial.toLowerCase().includes(q)
      );
    }

    if (filter === "power") {
      entries.sort((a, b) => b.powerScore - a.powerScore);
    } else if (filter === "streak") {
      entries.sort((a, b) => (b.mintStreak || 0) - (a.mintStreak || 0));
    } else if (filter === "recent") {
      // Mock order for recent
      entries.reverse();
    } else {
      // Default: captures
      entries.sort((a, b) => b.capturesCount - a.capturesCount);
    }

    return entries;
  };

  const entries = getSortedEntries();

  // Check if connected wallet is in leaderboard or mock user rank
  const userShortAddress = walletAddress
    ? `${walletAddress.substring(0, 5)}...${walletAddress.substring(walletAddress.length - 4)}`
    : null;

  return (
    <div id="leaderboard-section" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#0d1f14] border-2 border-emerald-500 text-emerald-400 text-xs font-mono font-black uppercase tracking-widest mb-4">
          <Trophy className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>[ PACK_RANKINGS // HALL_OF_ALPHAS ]</span>
        </div>

        <h2 className="font-display font-black text-3xl md:text-5xl text-slate-100 uppercase tracking-tight mb-4">
          WILDWOOD <span className="text-emerald-400 glow-green">LEADERBOARD</span>
        </h2>

        <p className="text-slate-400 text-xs md:text-sm font-mono max-w-xl mx-auto leading-relaxed">
          Tracking top wolf extractors, pack lords, and highest power ratings across the 5,555 Lupine Gen-0 ecosystem.
        </p>
      </div>

      {/* Stats summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-black/90 border-2 border-emerald-500/60 p-4 shadow-[4px_4px_0px_#021f0e] flex items-center gap-3">
          <div className="p-2.5 bg-emerald-950/60 border border-emerald-500 text-emerald-400">
            <Flame className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Top Captures</div>
            <div className="text-xl md:text-2xl font-mono font-black text-slate-100">42 SPECIMENS</div>
          </div>
        </div>

        <div className="bg-black/90 border-2 border-emerald-500/60 p-4 shadow-[4px_4px_0px_#021f0e] flex items-center gap-3">
          <div className="p-2.5 bg-emerald-950/60 border border-emerald-500 text-emerald-400">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Max Power Rating</div>
            <div className="text-xl md:text-2xl font-mono font-black text-slate-100">9,850 PTS</div>
          </div>
        </div>

        <div className="bg-black/90 border-2 border-emerald-500/60 p-4 shadow-[4px_4px_0px_#021f0e] flex items-center gap-3">
          <div className="p-2.5 bg-emerald-950/60 border border-emerald-500 text-emerald-400">
            <Flame className="w-5 h-5 text-red-500 animate-bounce" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Max Mint Streak</div>
            <div className="text-xl md:text-2xl font-mono font-black text-red-400">12x STREAK 🔥</div>
          </div>
        </div>

        <div className="bg-black/90 border-2 border-emerald-500/60 p-4 shadow-[4px_4px_0px_#021f0e] flex items-center gap-3">
          <div className="p-2.5 bg-emerald-950/60 border border-emerald-500 text-emerald-400">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Rarest Find</div>
            <div className="text-xl md:text-2xl font-mono font-black text-amber-400">LUP-0999</div>
          </div>
        </div>
      </div>

      {/* User's rank callout banner if connected */}
      {walletConnected && userShortAddress && (
        <div className="mb-8 p-4 bg-emerald-950/40 border-2 border-emerald-500/80 shadow-[4px_4px_0px_#053618] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 text-black font-black text-xs uppercase px-3">
              YOUR_STATUS
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-bold">{userShortAddress}</span>
              <span className="text-xs text-emerald-400 font-black">[ RANK #14 ]</span>
              <span className="px-2 py-0.5 bg-red-950 border border-red-500 text-red-400 font-black text-[10px] flex items-center gap-1 shadow-[0_0_8px_#ef4444] animate-pulse">
                <Flame className="w-3 h-3 fill-red-400" />
                3x STREAK
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400">Captures: <strong className="text-emerald-400 font-black">2 Lupines</strong></span>
            <span className="text-slate-400">Power: <strong className="text-cyan-400 font-black">680 PTS</strong></span>
          </div>
        </div>
      )}

      {/* Controls & Search bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Filter tabs */}
        <div className="flex bg-black border-2 border-emerald-500/60 p-1 w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setFilter("captures")}
            className={`flex-1 md:flex-initial px-3.5 py-2 font-mono text-xs uppercase font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
              filter === "captures"
                ? "bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Most Captures</span>
          </button>

          <button
            onClick={() => setFilter("streak")}
            className={`flex-1 md:flex-initial px-3.5 py-2 font-mono text-xs uppercase font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
              filter === "streak"
                ? "bg-red-500 text-black shadow-[0_0_12px_#ef4444]"
                : "text-red-400 hover:text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Mint Streaks 🔥</span>
          </button>

          <button
            onClick={() => setFilter("power")}
            className={`flex-1 md:flex-initial px-3.5 py-2 font-mono text-xs uppercase font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
              filter === "power"
                ? "bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Power Score</span>
          </button>

          <button
            onClick={() => setFilter("recent")}
            className={`flex-1 md:flex-initial px-3.5 py-2 font-mono text-xs uppercase font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
              filter === "recent"
                ? "bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Recent Activity</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/70" />
          <input
            type="text"
            placeholder="SEARCH WALLET / ENS / SERIAL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black border-2 border-emerald-500/50 pl-9 pr-4 py-2 font-mono text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-black/95 border-2 border-emerald-500 shadow-[6px_6px_0px_#021c0e] overflow-x-auto">
        <table className="w-full text-left font-mono border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b-2 border-emerald-500 bg-[#041d0e] text-emerald-400 text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4 font-black">RANK</th>
              <th className="py-3 px-4 font-black">HUNTER / PACK</th>
              <th className="py-3 px-4 font-black">TITLE</th>
              <th className="py-3 px-4 font-black text-center">CAPTURES</th>
              <th className="py-3 px-4 font-black text-center">TOP RARITY</th>
              <th className="py-3 px-4 font-black text-right">POWER SCORE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-950 text-xs">
            {entries.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-500 font-mono text-xs">
                  NO MATCHING PACK HUNTERS FOUND.
                </td>
              </tr>
            ) : (
              entries.map((item, index) => {
                const isTop1 = item.rank === 1;
                const isTop2 = item.rank === 2;
                const isTop3 = item.rank === 3;

                return (
                  <tr
                    key={index}
                    className={`hover:bg-emerald-950/30 transition-colors ${
                      isTop1
                        ? "bg-amber-950/10 border-l-4 border-l-amber-500"
                        : isTop2
                        ? "bg-purple-950/10 border-l-4 border-l-purple-500"
                        : isTop3
                        ? "bg-cyan-950/10 border-l-4 border-l-cyan-500"
                        : ""
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 font-black text-sm">
                      <div className="flex items-center gap-2">
                        {isTop1 ? (
                          <span className="px-2 py-0.5 bg-amber-500 text-black font-black text-xs shadow-[0_0_10px_#f59e0b]">
                            🥇 #1
                          </span>
                        ) : isTop2 ? (
                          <span className="px-2 py-0.5 bg-purple-500 text-black font-black text-xs shadow-[0_0_10px_#a855f7]">
                            🥈 #2
                          </span>
                        ) : isTop3 ? (
                          <span className="px-2 py-0.5 bg-cyan-400 text-black font-black text-xs shadow-[0_0_10px_#22d3ee]">
                            🥉 #3
                          </span>
                        ) : (
                          <span className="text-slate-400">#{item.rank}</span>
                        )}
                      </div>
                    </td>

                    {/* Address / ENS */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 bg-gradient-to-br ${item.avatarBg} border border-emerald-500/50 flex items-center justify-center text-[10px] font-black text-emerald-400 shrink-0`}>
                          🐺
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-100">{item.ens || item.address}</span>
                            {item.mintStreak && item.mintStreak > 1 && (
                              <span 
                                title={`${item.mintStreak}x Consecutive Minting Streak!`}
                                className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider border animate-pulse ${
                                  item.mintStreak >= 10
                                    ? "bg-red-950/90 text-red-400 border-red-500 shadow-[0_0_12px_#ef4444]"
                                    : item.mintStreak >= 5
                                    ? "bg-amber-950/90 text-amber-400 border-amber-500 shadow-[0_0_10px_#f59e0b]"
                                    : "bg-emerald-950/90 text-emerald-400 border-emerald-500 shadow-[0_0_8px_#10b981]"
                                }`}
                              >
                                <Flame className="w-3 h-3 fill-current" />
                                <span>{item.mintStreak}x STREAK</span>
                              </span>
                            )}
                          </div>
                          {item.ens && <span className="text-[10px] text-slate-500">{item.address}</span>}
                        </div>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-black border border-emerald-900 text-emerald-400 text-[10px] uppercase font-bold">
                        {item.title}
                      </span>
                    </td>

                    {/* Captures */}
                    <td className="py-3.5 px-4 text-center font-black text-slate-200">
                      {item.capturesCount} 🐺
                    </td>

                    {/* Top Rarity */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 text-[10px] uppercase font-black border ${
                          item.topRarity === "Legendary"
                            ? "bg-amber-950/80 border-amber-500 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                            : item.topRarity === "Epic"
                            ? "bg-purple-950/80 border-purple-500 text-purple-400"
                            : item.topRarity === "Rare"
                            ? "bg-cyan-950/80 border-cyan-500 text-cyan-400"
                            : "bg-emerald-950/80 border-emerald-800 text-emerald-400"
                        }`}
                      >
                        {item.topRarity}
                      </span>
                    </td>

                    {/* Power score */}
                    <td className="py-3.5 px-4 text-right font-black text-emerald-400 text-sm">
                      {item.powerScore.toLocaleString()} PTS
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <div className="mt-4 text-center font-mono text-[10px] text-slate-500 uppercase tracking-widest">
        ⚡ UPDATED REAL-TIME FROM SMART CONTRACT MINTS // REFRESHES ON EVERY BACTERIAL BREED
      </div>
    </div>
  );
}
