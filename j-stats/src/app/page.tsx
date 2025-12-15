// j-stats/src/app/page.tsx
"use client";

import { useState, useMemo } from "react";
import teamsData from "@/data/teams.json";
import { Team } from "@/types/team";
import Link from "next/link";

export default function Home() {
  const teams = teamsData as Team[];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredTeams = useMemo(() => {
    const filtered = teams.filter((team) => {
      const matchesSearch =
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.hometown.toLowerCase().includes(searchTerm.toLowerCase());

      const latestCategory = team.stats[0]?.category;
      const matchesCategory = filterCategory === "All" || latestCategory === filterCategory;

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      const aStat = a.stats[0];
      const bStat = b.stats[0];

      const categoryOrder: { [key: string]: number } = { "J1": 1, "J2": 2, "J3": 3 };
      const aCatRank = categoryOrder[aStat?.category] || 99;
      const bCatRank = categoryOrder[bStat?.category] || 99;

      if (aCatRank !== bCatRank) {
        return aCatRank - bCatRank;
      }

      const aRank = aStat?.rank === 0 ? 999 : aStat?.rank || 999;
      const bRank = bStat?.rank === 0 ? 999 : bStat?.rank || 999;

      return aRank - bRank;
    });
  }, [searchTerm, filterCategory, teams]);

  return (
    <main className="p-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-4">J-Stats: チーム一覧</h1>
      <p className="text-gray-500 mb-8">
        J1-3に所属するチームのリーグ成績を年度別にまとめています。
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="チーム名やホームタウンで検索..."
            className="w-full px-4 py-2 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl">
          {["All", "J1", "J2", "J3"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                filterCategory === cat
                  ? "bg-white dark:bg-zinc-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <Link href={`/teams/${team.id}`} key={team.id}>
              <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer bg-white dark:bg-zinc-900 h-full flex flex-col">
                <div
                  className="w-full h-1.5 mb-5 rounded-full"
                  style={{ backgroundColor: team.color }}
                />
                <h2 className="text-xl font-bold mb-1">{team.name}</h2>
                <p className="text-gray-400 text-xs mb-4">{team.hometown}</p>

                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-zinc-800">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{team.stats[0]?.category} 順位</span>
                    <span className="font-bold">{team.stats[0]?.rank === 0 ? "-" : `${team.stats[0]?.rank}位`}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-1 font-mono text-gray-400">
                    <span>戦績</span>
                    <span>{team.stats[0]?.win}勝-{team.stats[0]?.draw}分-{team.stats[0]?.loss}負</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            一致するチームが見つかりませんでした。
          </div>
        )}
      </div>
    </main>
  );
}
