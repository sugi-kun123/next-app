"use client";

import { useState, useEffect } from "react";
import {
  getTodosByDate,
  addTodo,
  toggleTodoComplete,
  deleteTodo,
  getTodayStr,
  TodoItem
} from "../../lib/firestore";
import TodoList from "../components/TodoList";
import Link from "next/link";

export default function TodoPage() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [currentDate, setCurrentDate] = useState(getTodayStr());

  const fetchTodos = async (date: string) => {
    console.log(date, " のデータを取得開始します");
    const data = await getTodosByDate(date);
    console.log("取得したデータ: ", data);
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos(currentDate);
  }, [currentDate]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    await addTodo(inputText);
    setInputText("");
    const today = getTodayStr();
    setCurrentDate(today);
    await fetchTodos(today);
  };

  const handleToggle = async (id: string, completed: boolean) => {
    await toggleTodoComplete(id, completed);
    fetchTodos(currentDate);
  };

  const handleDelete = async (id: string) => {
    if (confirm("本当に削除しますか？")) {
      await deleteTodo(id);
      fetchTodos(currentDate);
    }
  };

  return (
    <main className="flex min-h-screen w-full max-w-4xl flex-col items-center py-20 px-8 mx-auto bg-white dark:bg-black">
      <h1 className="text-3xl font-bold mb-4">📝 TODO LOG</h1>
      <Link href="./history" className="w-full text-right text-blue-500 hover:underline">
        過去のTODO一覧へ →
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <input
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
          className="border p-2 rounded dark:text-black"
        />
      </div>

      <form onSubmit={handleAdd} className="w-full flex gap-2 mb-10">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="新しいTODOを入力..."
          className="flex-1 border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 text-black dark:text-white"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          追加
        </button>
      </form>

      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </main>
  );
}
