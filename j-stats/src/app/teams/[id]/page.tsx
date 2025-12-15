import teamsData from "@/data/teams.json";
import { Team } from "@/types/team";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const team = (teamsData as Team[]).find((t) => t.id === id);

  if (!team) notFound();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-500 hover:underline">← 一覧に戻る</Link>
      <h1 className="text-4xl font-bold mt-4">{team.name}</h1>
      <p className="text-gray-500 mb-4">創設: {team.since}年 | 本拠地: {team.hometown}</p>
      <div
        className="w-full h-2 mb-4 rounded-full"
        style={{ backgroundColor: team.color }}
      />

      <table className="w-full text-left">
        <thead className="bg-gray-50 dark:bg-zinc-800/50 text-xs font-bold uppercase text-gray-400">
          <tr>
            <th className="px-6 py-4">シーズン</th>
            <th className="px-6 py-4">カテゴリ</th>
            <th className="px-6 py-4 text-center">成績</th>
            <th className="px-6 py-4">W-D-L</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
          {team.stats.map((s) => (
            <tr key={s.year} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors">
              <td className="px-6 py-4 font-mono">{s.year}</td>
              <td className="px-6 py-4 text-sm">{s.category}</td>
              <td className="px-6 py-4 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                  s.rank === 1 ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 dark:bg-zinc-800"
                }`}>
                  {s.rank === 1 ? "🏆優勝" : s.rank === 0 ? "-" : `${s.rank}位`}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm font-mono">{s.win}-{s.draw}-{s.loss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
