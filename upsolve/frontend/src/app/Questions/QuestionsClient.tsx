"use client";

import React, { useState } from "react";
import { LeetCodeQuestion } from "../../types/questions";

export default function QuestionsClient({ questions }: { questions: LeetCodeQuestion[] }) {
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = questions.filter((q) => {
    const searchLower = search.toLowerCase();
    return (
      q.title.toLowerCase().includes(searchLower) ||
      q.id.toString().includes(searchLower)
    );
  });

  return (
    <div className="p-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform">
          {toastMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">LeetCode Questions</h1>
      <input
        type="text"
        placeholder="Search questions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 w-full rounded-md mb-4"
      />
      <ul className="space-y-2">
        {filtered.slice(0, 50).map((q) => (
          <li
            key={q.id}
            className="flex justify-between items-center border p-3 rounded-md"
          >
            <div>
              <p className="font-medium">
                {q.id}. {q.title}
              </p>
              <span
                className={`text-sm ${
                  q.difficulty === "Easy"
                    ? "text-green-500"
                    : q.difficulty === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {q.difficulty}
              </span>
            </div>
            <button
              onClick={() => showToast(`Added "${q.title}" to your practice list!`)}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
