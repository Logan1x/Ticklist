import { useState } from "react";
import { PlusIcon } from "./Icons";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={submit} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Drink water, walk the dog, code..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        required
      />
      <button
        type="submit"
        aria-label="Add todo"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 active:bg-blue-800"
      >
        <div className="flex items-center gap-2">
          <PlusIcon />
          <span className="hidden sm:inline">Add</span>
        </div>
      </button>
    </form>
  );
}
