import React from "react";

interface PineTreeProps {
  key?: React.Key;
  className?: string;
  type?: "tall" | "spruce" | "dense" | "canopy";
  style?: React.CSSProperties;
}

export default function PineTreeSvg({ className = "w-32 h-64 text-[#011a0b]", type = "tall", style }: PineTreeProps) {
  if (type === "spruce") {
    // Detailed organic Spruce with layered drooping needle branches
    return (
      <svg className={className} style={style} viewBox="0 0 100 200" fill="currentColor">
        <path d="M 50 0 
                 C 48 6, 46 14, 44 20 
                 C 40 18, 36 21, 32 25 
                 C 37 26, 42 24, 45 27 
                 C 39 31, 31 34, 26 42 
                 C 33 41, 41 38, 44 42 
                 C 36 48, 24 51, 18 62 
                 C 27 60, 38 56, 43 61 
                 C 33 69, 18 73, 10 86 
                 C 22 83, 37 77, 42 83 
                 C 30 93, 12 98, 2 114 
                 C 16 110, 35 103, 42 110 
                 C 28 122, 8 129, 0 148 
                 C 18 142, 38 135, 43 144 
                 L 43 200 L 57 200 L 57 144 
                 C 62 135, 82 142, 100 148 
                 C 92 129, 72 122, 58 110 
                 C 65 103, 84 110, 98 114 
                 C 88 98, 70 93, 58 83 
                 C 63 77, 78 83, 90 86 
                 C 82 73, 67 69, 57 61 
                 C 62 56, 73 60, 82 62 
                 C 76 51, 64 48, 56 42 
                 C 59 38, 67 41, 74 42 
                 C 69 34, 61 31, 55 27 
                 C 58 24, 63 26, 68 25 
                 C 64 21, 60 18, 56 20 
                 C 54 14, 52 6, 50 0 Z" />
      </svg>
    );
  }

  if (type === "dense") {
    // Dense wild pine tree with irregular natural needle clusters
    return (
      <svg className={className} style={style} viewBox="0 0 100 200" fill="currentColor">
        <path d="M 50 2 
                 C 49 8, 47 16, 43 22 
                 C 38 19, 33 22, 28 28 
                 C 34 29, 40 26, 44 31 
                 C 36 36, 26 39, 20 48 
                 C 28 47, 38 43, 42 48 
                 C 33 55, 20 58, 12 70 
                 C 22 68, 35 63, 41 69 
                 C 29 78, 14 82, 5 98 
                 C 18 94, 34 88, 41 95 
                 C 28 106, 10 112, 1 130 
                 C 16 125, 34 118, 42 125 
                 C 26 139, 6 146, 0 166 
                 C 17 159, 36 151, 42 159 
                 L 42 200 L 58 200 L 58 159 
                 C 64 151, 83 159, 100 166 
                 C 94 146, 74 139, 58 125 
                 C 66 118, 84 125, 99 130 
                 C 90 112, 72 106, 59 95 
                 C 66 88, 82 94, 95 98 
                 C 86 82, 71 78, 59 69 
                 C 65 63, 78 68, 88 70 
                 C 80 58, 67 55, 58 48 
                 C 62 43, 72 47, 80 48 
                 C 74 39, 64 36, 56 31 
                 C 60 26, 66 29, 72 28 
                 C 67 22, 62 19, 57 22 
                 C 53 16, 51 8, 50 2 Z" />
      </svg>
    );
  }

  if (type === "canopy") {
    // Overhanging canopy branch silhouette for top corners
    return (
      <svg className={className} style={style} viewBox="0 0 200 200" fill="currentColor">
        <path d="M 0 0 L 200 0 L 200 20 
                 C 180 30, 160 45, 140 38 
                 C 155 50, 170 58, 185 62 
                 C 160 70, 135 72, 115 60 
                 C 130 75, 145 88, 160 92 
                 C 130 102, 100 98, 80 80 
                 C 95 98, 110 115, 130 120 
                 C 95 132, 65 125, 45 105 
                 C 60 125, 75 145, 95 152 
                 C 60 162, 30 152, 10 130 
                 C 20 150, 35 172, 50 180 
                 C 25 185, 10 178, 0 165 Z" />
      </svg>
    );
  }

  // Default: Tall Slim Alpine Pine
  return (
    <svg className={className} style={style} viewBox="0 0 100 200" fill="currentColor">
      <path d="M 50 0 
               C 49 5, 47 12, 45 18 
               C 41 16, 37 19, 33 23 
               C 38 24, 43 22, 45 25 
               C 39 30, 31 33, 26 40 
               C 33 39, 41 36, 44 40 
               C 36 46, 25 49, 18 60 
               C 27 58, 38 54, 43 59 
               C 34 67, 20 71, 11 83 
               C 23 80, 38 75, 43 81 
               C 31 91, 13 96, 3 111 
               C 17 107, 36 100, 43 107 
               C 29 119, 9 125, 0 144 
               C 18 138, 38 131, 44 140 
               L 44 200 L 56 200 L 56 140 
               C 62 131, 82 138, 100 144 
               C 91 125, 71 119, 57 107 
               C 64 100, 83 107, 97 111 
               C 87 96, 69 91, 57 81 
               C 62 75, 77 80, 89 83 
               C 80 71, 66 67, 57 59 
               C 62 54, 73 58, 82 60 
               C 75 49, 64 46, 56 40 
               C 59 36, 67 39, 74 40 
               C 69 33, 61 30, 55 25 
               C 57 22, 62 24, 67 23 
               C 63 19, 59 16, 55 18 
               C 53 12, 51 5, 50 0 Z" />
    </svg>
  );
}
