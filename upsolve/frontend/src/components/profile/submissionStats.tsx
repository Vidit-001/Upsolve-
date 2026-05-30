"use client";

import { LeetCodeProfile } from "../../types/leetcode";

interface Props {
  profileData: LeetCodeProfile;
}

export default function SubmissionStats({ profileData }: Props) {
  const { acSubmissionNum } = profileData.submitStats;

  // Find the total solved problems to use as the baseline for percentages
  const totalSolved = acSubmissionNum.find(s => s.difficulty === "All")?.count || 0;

  // Structure the data for easy mapping, excluding the "All" category from the list itself
  const difficultyStats = [
    {
      difficulty: "Easy",
      count: acSubmissionNum.find(s => s.difficulty === "Easy")?.count || 0,
      color: "bg-green-500",
    },
    {
      difficulty: "Medium",
      count: acSubmissionNum.find(s => s.difficulty === "Medium")?.count || 0,
      color: "bg-yellow-500",
    },
    {
      difficulty: "Hard",
      count: acSubmissionNum.find(s => s.difficulty === "Hard")?.count || 0,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="flex flex-col p-6 h-full">
      <h3 className="text-xl font-bold text-white mb-4 text-center">
        Problems Solved Breakdown
      </h3>

      {/* Hero stat: Total Solved */}
      <div className="text-center my-4">
        <p className="text-5xl font-bold text-white">
          {totalSolved.toLocaleString()}
        </p>
        <p className="text-sm text-gray-400 uppercase tracking-wider mt-1">
          Total Solved
        </p>
      </div>

      {/* Divider */}
      <hr className="w-full border-t border-gray-700/50 my-4" />

      {/* Stats List with Progress Bars */}
      <div className="space-y-5">
        {difficultyStats.map(({ difficulty, count, color }) => {
          // Calculate the percentage width for the progress bar
          const percentage = totalSolved > 0 ? (count / totalSolved) * 100 : 0;
          
          return (
            <div key={difficulty}>
              {/* Labels: Difficulty and Count */}
              <div className="flex justify-between items-center mb-1.5 text-sm">
                <span className="font-semibold text-gray-300">{difficulty}</span>
                <span className="text-gray-400">{count.toLocaleString()}</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div
                  className={`${color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}