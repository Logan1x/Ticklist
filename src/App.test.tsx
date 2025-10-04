import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "./App";

vi.stubGlobal("crypto", { randomUUID: () => "test-id" });

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a new todo", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText("Add a todo");
    const button = screen.getByText("Add");

    await user.type(input, "New Task");
    await user.click(button);

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(localStorage.getItem("todos_v1")).toContain("New Task");
  });

  it("does not add empty or whitespace-only todos", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText("Add a todo");
    const button = screen.getByText("Add");

    await user.type(input, "   ");
    await user.click(button);

    expect(screen.queryByText("   ")).not.toBeInTheDocument();
    expect(localStorage.getItem("todos_v1")).toBe("[]");
  });

  it("toggles a todo", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText("Add a todo");
    const button = screen.getByText("Add");

    await user.type(input, "Toggle Task");
    await user.click(button);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    expect(screen.getByText("Toggle Task")).toHaveClass("line-through");
  });

  it("deletes a todo", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText("Add a todo");
    const button = screen.getByText("Add");

    await user.type(input, "Delete Task");
    await user.click(button);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(screen.queryByText("Delete Task")).not.toBeInTheDocument();
    expect(localStorage.getItem("todos_v1")).toBe("[]");
  });
});
