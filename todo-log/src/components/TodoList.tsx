// src/components/TodoList.tsx
import { TodoItem } from '../../lib/firestore';

interface TodoListProps {
  todos: TodoItem[];
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="text-center text-gray-500 mt-10">この日のTODOはありません。</p>;
  }

  return (
    <div className="w-full space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id, todo.completed)}
              className="w-5 h-5 cursor-pointer"
            />
            <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
              {todo.text}
            </span>
          </div>

          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-500 hover:text-red-700 p-2 transition"
            aria-label="削除"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}
