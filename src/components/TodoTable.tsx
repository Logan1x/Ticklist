import { TrashIcon } from "./Icons";

interface TodoTableProps {
  todos: { id: string; text: string; completed: boolean }[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoTable({
  todos,
  onToggle,
  onDelete,
}: TodoTableProps) {
  return (
    <div className="flex flex-col gap-3">
      {todos.length > 0 ? (
        todos.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => onToggle(t.id)}
                className="accent-blue-600 cursor-pointer"
              />
              <span className={t.completed ? "text-gray-500 line-through" : ""}>
                {t.text}
              </span>
            </div>
            <button
              onClick={() => onDelete(t.id)}
              className="group rounded-md px-3 py-1.5  cursor-pointer flex justify-center"
              aria-label="Delete todo"
            >
              <TrashIcon />
            </button>
          </div>
        ))
      ) : (
        <div className="px-4 py-6 text-center text-sm text-gray-500">
          No todos yet
        </div>
      )}
    </div>
  );
}
