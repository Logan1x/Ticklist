import { DragHandleIcon, TrashIcon } from "./Icons";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TodoTableProps {
  todos: { id: string; text: string; completed: boolean }[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (oldIndex: number, newIndex: number) => void;
}

function SortableTodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: { id: string; text: string; completed: boolean };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 shadow hover:shadow-md ${
        isDragging ? "shadow-lg scale-105 border-blue-300" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 p-2 -m-2 touch-none select-none"
          style={{ touchAction: "none" }}
          role="button"
          tabIndex={-1}
          aria-label="Drag todo"
        >
          <DragHandleIcon classes="h-6 w-6 sm:h-5 sm:w-5" />
        </div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="accent-blue-600 cursor-pointer"
        />
        <span className={todo.completed ? "text-gray-500 line-through" : ""}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="group rounded-md px-3 py-1.5 cursor-pointer flex justify-center"
        aria-label="Delete todo"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

export default function TodoTable({
  todos,
  onToggle,
  onDelete,
  onReorder,
}: TodoTableProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(oldIndex, newIndex);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={todos.map((todo) => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <SortableTodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              No todos yet
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
