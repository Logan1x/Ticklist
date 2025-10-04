import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TodoTable from "./TodoTable";

describe("TodoTable", () => {
  it("renders todos as individual cards", () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const todos = [
      { id: "1", text: "First task", completed: false },
      { id: "2", text: "Second task", completed: true },
    ];

    render(
      <TodoTable
        todos={todos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("First task")).toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const todos = [{ id: "1", text: "Task to toggle", completed: false }];

    render(
      <TodoTable
        todos={todos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const todos = [{ id: "1", text: "Task to delete", completed: false }];

    render(
      <TodoTable
        todos={todos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("shows 'No todos yet' when the list is empty", () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoTable todos={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    expect(screen.getByText("No todos yet")).toBeInTheDocument();
  });

  it("applies line-through style for completed todos", () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const todos = [{ id: "1", text: "Completed task", completed: true }];

    render(
      <TodoTable
        todos={todos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const task = screen.getByText("Completed task");
    expect(task).toHaveClass("line-through text-gray-500");
  });
});
