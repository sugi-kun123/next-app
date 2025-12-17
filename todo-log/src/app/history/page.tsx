"use client";

import { useState, useEffect } from "react";
import { getActiveDates, getTodosByDate, TodoItem } from "@/../lib/firestore";
import TodoList from "@/components/TodoList";
import Link from "next/link";

export default function HistoryPage() {
  const [activeDates, setActiveDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDates = async () => {
      const dates = await getActiveDates();
      setActiveDates(dates);
    };
    fetchDates();
  }, []);

  const handleDateClick = async (date: string) => {
    setSelectedDate(date);
    setLoading(true);
    const data = await getTodosByDate(date);
    setTodos(data);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen w-full max-w-4xl flex-col py-8 px-4 mx-auto bg-white dark:bg-black">
      <h1 className="text-2xl font-bold mb-10">📜 過去のTODO一覧</h1>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 space-y-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">活動ログがある日</p>
          <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2">
            {activeDates.map(date => (
              <button
                key={date}
                onClick={() => handleDateClick(date)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedDate === date
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-gray-50 hover:bg-gray-300 dark:bg-zinc-900 dark:border-zinc-800"
                }`}
              >
                <span className="font-mono">{date}</span>
              </button>
            ))}
            {activeDates.length === 0 && (
              <p className="text-gray-400 text-sm">履歴はまだありません。</p>
            )}
          </div>
        </div>

        <div className="w-full md:w-3/4">
          {selectedDate ? (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 p-6">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">{selectedDate} の記録</h2>
              {loading ? (
                <p className="text-gray-500">読み込み中...</p>
              ) : (
                <TodoList
                  todos={todos}
                  onToggle={async () => {}}
                  onDelete={async () => {}}
                />
              )}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-2xl">
              <p className="text-gray-400">日付を選択してログを表示します</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
