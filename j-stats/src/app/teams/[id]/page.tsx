import teamsData from "@/data/teams.json";
import { Team } from "@/types/team";
import TeamStandingChart from "@/components/TeamStandingChart";
import { notFound } from "next/navigation";

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const team = (teamsData as Team[]).find((t) => t.id === id);


  if (!team) notFound();

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mt-4 mb-2">{team.name}</h1>
      <h5 className="text-md font-semibold mb-4">監督: {team.stats[0].coach}</h5>
      <p className="text-sm text-gray-500">ホームスタジアム: {team.stadium}</p>
      <p className="text-sm text-gray-500">ホームタウン: {team.hometown}</p>
      <p className="text-sm text-gray-500 mb-4">創設: {team.since}年</p>
      <div
        className="w-full h-2 mb-4 rounded-full"
        style={{ backgroundColor: team.color }}
      />

      <table className="w-full text-left">
        <thead className="bg-gray-50 dark:bg-zinc-800/50 text-xs font-bold uppercase text-gray-400">
          <tr>
            <th className="w-1/10 pl-2 py-2">シーズン</th>
            <th className="w-1/10 py-2 text-center">カテゴリ</th>
            <th className="w-2/10 py-2 text-center">成績</th>
            <th className="w-2/10 pl-2 py-2">W-D-L</th>
            <th className="w-4/10 pl-2 py-2">監督</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
          {team.stats.map((s) => (
            <tr key={s.year} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors">
              <td className="w-1/10 pl-2 py-2 font-mono">{s.year}</td>
              <td className="w-1/10 py-2 text-sm  text-center">
                <span className={`font-semibold ${
                  s.category === 'J1'
                    ? 'text-red-600 dark:text-red-400'
                    : s.category === 'J2'
                      ? 'text-green-600 dark:text-green-400'
                      : s.category === 'J3'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400' // デフォルト
                }`}>
                  {s.category}
                </span>
              </td>
              <td className="w-2/10 py-2 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                  s.rank === 1 ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 dark:bg-zinc-800"
                }`}>
                  {s.rank === 1 ? "優勝" : s.rank === 0 ? "-" : `${s.rank}位`}
                </span>
              </td>
              <td className="w-2/10 pl-2 py-2 text-gray-500 text-sm font-mono">{s.win}-{s.draw}-{s.loss}</td>
              <td className="w-4/10 pl-2 py-2 text-sm">{s.coach}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TeamStandingChart stats={team.stats} teamColor={team.color} />
    </div>
  );
}
