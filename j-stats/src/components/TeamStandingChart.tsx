"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';

interface Stat {
  year: number;
  rank: number;
  category: string;
}

interface Props {
  stats: Stat[];
  teamColor: string;
}

export default function TeamStandingChart({ stats, teamColor }: Props) {
  const renderCustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const { actualRank, category } = payload;

    if (actualRank === 1) {
      const goldColor = '#FFD700';
      return (
        <g>
          <circle cx={cx} cy={cy} r={3} fill={goldColor} stroke="red" strokeWidth={1} />
          <text
            x={cx}
            y={cy - 10}
            fill={goldColor}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '10px', fontWeight: 'bold' }}
          >
            🏆
          </text>
        </g>
      );
    }

    return (
      <circle cx={cx} cy={cy} r={3} fill={teamColor} stroke="#fff" strokeWidth={1} />
    );
  };
  const chartData = [...stats]
    .filter(s => s.rank > 0)
    .sort((a, b) => a.year - b.year)
    .map(s => {
      let displayRank = s.rank;
      if (s.category === "J2") displayRank = s.rank + 22;
      if (s.category === "J3") displayRank = s.rank + 44;
      if (s.category === "JFL" ) displayRank = s.rank = 0; // 表示しない

      return { ...s, displayRank, actualRank: s.rank };
    });

  return (
    <div className="w-full h-[500px] mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

          <ReferenceArea y1={1} y2={20} fill="red" fillOpacity={0.2} />
          <ReferenceArea y1={23} y2={42} fill="green" fillOpacity={0.2} />
          <ReferenceArea y1={45} y2={64} fill="blue" fillOpacity={0.2} />

          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999' }} />

          <YAxis
            reversed
            domain={[1, 66]}
            axisLine={false}
            tickLine={false}
            ticks={[1, 23, 45]}
            tickFormatter={(value) => {
              if (value === 1) return "J1";
              if (value === 23) return "J2";
              if (value === 45) return "J3";
              return "";
            }}
            tick={{ fontSize: 12, fontWeight: 'bold', fill: '#666' }}
            width={40}
          />

          <Tooltip
            cursor={{ stroke: teamColor, strokeWidth: 1 }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-zinc-900 p-3 shadow-xl rounded-xl border border-gray-100 dark:border-zinc-800 text-sm">
                    <p className="font-bold text-gray-400 mb-1">{data.year}年</p>
                    <p className="text-lg font-black" style={{ color: teamColor }}>
                      {data.category} {data.actualRank}位
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Line
            type="monotone"
            dataKey="displayRank"
            stroke={teamColor}
            strokeWidth={4}
            dot={renderCustomDot}
            activeDot={{ r: 7, strokeWidth: 0 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
