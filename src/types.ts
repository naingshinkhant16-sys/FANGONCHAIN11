export interface NFTItem {
  id: number;
  name: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  image: string;
  stats: {
    attack: number;
    speed: number;
    stealth: number;
    wisdom: number;
  };
  description: string;
  serial: string;
}

export interface WalletRecord {
  address: string;
  xHandle?: string;
  walletType: string;
  timestamp: string;
  sheetSynced: boolean;
  sheetError: string | null;
}

export interface RoadmapMilestone {
  phase: string;
  title: string;
  status: "Completed" | "In Progress" | "Upcoming" | "Coming Soon";
  percentage: string;
  description: string;
  deliverables: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
