import { useEffect, useMemo } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoTable from "./components/TodoTable.jsx";
import { GithubIcon, RedoIcon, UndoIcon } from "./components/Icons.js";
import { useUndoRedo } from "./hooks/useUndoRedo"; // <-- new import

const STORAGE_KEY = "todos_v1";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const {
    present: todos,
    set,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo<Todo[]>(
    (() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    })()
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const ordered = useMemo(() => {
    const copy = [...todos];
    copy.sort((a, b) => Number(a.completed) - Number(b.completed));
    return copy;
  }, [todos]);

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    set([
      ...todos,
      { id: crypto.randomUUID(), text: trimmed, completed: false },
    ]);
  };

  const toggleTodo = (id: string) => {
    set(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    set(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="mx-auto p-3 md:p-6 h-screen bg-neutral-900">
      <div className="h-full w-full bg-neutral-50 rounded-lg p-2 sm:p-6">
        <div className="max-w-3xl p-4 mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <h1 className="mb-4 text-2xl font-bold">Ticklist.</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={undo}
                disabled={!canUndo}
                className=" disabled:opacity-40 cursor-pointer"
              >
                <UndoIcon />
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className="disabled:opacity-40 cursor-pointer"
              >
                <RedoIcon />
              </button>
              <a
                href="https://github.com/Logan1x/Ticklist"
                aria-label="GitHub repository"
                className="cursor-pointer group hover:text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
              </a>
            </div>
          </div>

          <TodoForm onAdd={addTodo} />
          <TodoTable
            todos={ordered}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}
