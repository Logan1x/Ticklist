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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Done
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Task
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {todos.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => onToggle(t.id)}
                  className="size-5 accent-blue-600"
                />
              </td>
              <td className="px-4 py-3">
                <span
                  className={t.completed ? "text-gray-500 line-through" : ""}
                >
                  {t.text}
                </span>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onDelete(t.id)}
                  className="rounded-md px-3 py-1.5  hover:text-red-400 active:text-red-700 cursor-pointer"
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
          {todos.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-6 text-center text-sm text-gray-500"
              >
                No todos yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
