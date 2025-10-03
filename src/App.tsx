import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "todos_v1";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const ordered = useMemo(() => {
    const copy = [...todos];
    copy.sort((a, b) => Number(a.completed) - Number(b.completed));
    return copy;
  }, [todos]);

  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false },
    ]);
    setText("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  const toggle = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const removeOne = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Todos</h1>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Add a todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 active:bg-blue-800"
        >
          Add
        </button>
      </form>

      <ul className="mt-4 space-y-2">
        {ordered.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"
          >
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggle(t.id)}
              className="size-5 accent-blue-600"
            />
            <span
              className={`flex-1 ${
                t.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {t.text}
            </span>
            <button
              onClick={() => removeOne(t.id)}
              className="rounded-md bg-red-500 px-3 py-1.5 text-white hover:bg-red-600 active:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
