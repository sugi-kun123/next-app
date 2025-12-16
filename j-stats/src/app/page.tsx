// j-stats/src/app/page.tsx
"use client";

import { useState, useMemo } from "react";
import teamsData from "@/data/teams.json";
import { Team } from "@/types/team";
import Link from "next/link";
import { House } from 'lucide-react';
import { truncateString } from '@/utils/string';

export default function Home() {
  const teams = teamsData as Team[];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredTeams = useMemo(() => {
    const filtered = teams.filter((team) => {
      const matchesSearch =
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.stadium.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <main>
      <div className="px-4 py-8 max-w-6xl mx-auto min-h-screen">
        <ul className="list-disc list-inside mb-8 text-xs text-gray-500">
          <li>2ステージ制は合算と最終順位で表示してます。</li>
          <li>データは随時更新しています。</li>
        </ul>
        <h2 className="text-xl font-bold mb-4">チーム一覧</h2>

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

        <div className="grid grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <Link href={`/teams/${team.id}`} key={team.id}>
                <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl px-2 py-4 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer bg-white dark:bg-zinc-900 h-full flex flex-col">
                  <div
                    className="w-full h-1.5 mb-5 rounded-full"
                    style={{ backgroundColor: team.color }}
                  />
                  <h3 className="text-l font-bold mb-1">{team.name}</h3>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <House className="inline mr-2 w-1/10" size={16} />
                    <div className="inline-block align-middle w-9/10">
                      <p className="text-gray-400 text-xs mb-1">{truncateString(team.stadium, 15)}</p>
                      <p className="text-gray-400 text-xs">{truncateString(team.hometown, 15)}</p>
                    </div>
                  </div>
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
      </div>
    </main>
  );
}
