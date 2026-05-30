"use client";

import type { FC, SVGProps } from "react";
import { LeetCodeProfile } from "../../types/leetcode";

interface Props {
  profile1: LeetCodeProfile;
  profile2: LeetCodeProfile;
}

// A small, self-contained icon for highlighting the winner.
const TrophyIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);


export default function ComparisonSummary({ profile1, profile2 }: Props) {
  const getCount = (profile: LeetCodeProfile, difficulty: string) =>
    profile.submitStats.acSubmissionNum.find((x) => x.difficulty === difficulty)?.count || 0;

  const getAccuracy = (profile: LeetCodeProfile) => {
    const accepted = profile.submitStats.acSubmissionNum.find((x) => x.difficulty === "All")?.count || 0;
    const total = profile.submitStats.totalSubmissionNum.find((x) => x.difficulty === "All")?.submissions || 1; // Avoid division by zero
    return (accepted / total) * 100;
  };

  const statsToCompare = [
    {
      label: "Total Solved",
      val1: getCount(profile1, "All"),
      val2: getCount(profile2, "All"),
      isPercentage: false,
    },
    {
      label: "Easy Solved",
      val1: getCount(profile1, "Easy"),
      val2: getCount(profile2, "Easy"),
      isPercentage: false,
    },
    {
      label: "Medium Solved",
      val1: getCount(profile1, "Medium"),
      val2: getCount(profile2, "Medium"),
      isPercentage: false,
    },
    {
      label: "Hard Solved",
      val1: getCount(profile1, "Hard"),
      val2: getCount(profile2, "Hard"),
      isPercentage: false,
    },
    {
      label: "Accuracy",
      val1: getAccuracy(profile1),
      val2: getAccuracy(profile2),
      isPercentage: true,
    },
  ];

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-white mb-6 text-center">
        Head-to-Head Comparison
      </h3>

      <div className="space-y-5">
        {/* User Headers */}
        <div className="flex justify-between items-center px-2">
          <span className="font-semibold text-cyan-400">@{profile1.profile.userSlug}</span>
          <span className="font-semibold text-purple-400">@{profile2.profile.userSlug}</span>
        </div>

        {statsToCompare.map(({ label, val1, val2, isPercentage }) => {
          const total = val1 + val2;
          // Calculate percentage widths for the visual bar
          const p1_percent = total > 0 ? (val1 / total) * 100 : 50;
          const p2_percent = total > 0 ? (val2 / total) * 100 : 50;
          
          const p1_wins = val1 > val2;
          const p2_wins = val2 > val1;

          // Format displayed values
          const displayVal1 = isPercentage ? `${val1.toFixed(1)}%` : val1.toLocaleString();
          const displayVal2 = isPercentage ? `${val2.toFixed(1)}%` : val2.toLocaleString();
          
          return (
            <div key={label}>
              {/* Labels and Values */}
              <div className="flex justify-between items-center mb-1.5 text-sm font-medium text-gray-300 px-1">
                <div className="flex items-center gap-2">
                  {p1_wins && <TrophyIcon className="w-4 h-4 text-cyan-400" />}
                  <span className={p1_wins ? 'text-white font-bold' : ''}>{displayVal1}</span>
                </div>
                <span className="text-gray-400 uppercase text-xs tracking-wider">{label}</span>
                <div className="flex items-center gap-2">
                  <span className={p2_wins ? 'text-white font-bold' : ''}>{displayVal2}</span>
                  {p2_wins && <TrophyIcon className="w-4 h-4 text-purple-400" />}
                </div>
              </div>
              {/* Combined Progress Bar */}
              <div className="flex w-full h-2.5 bg-gray-700/50 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500" 
                  style={{ width: `${p1_percent}%` }}
                ></div>
                <div 
                  className="bg-gradient-to-l from-purple-500 to-purple-400 transition-all duration-500" 
                  style={{ width: `${p2_percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}