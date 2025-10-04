import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
  it("renders input field and submit button", () => {
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    expect(screen.getByPlaceholderText("Add a todo")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("updates input field when user types", async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Add a todo");
    await user.type(input, "New todo item");

    expect(input).toHaveValue("New todo item");
  });

  it("calls onAdd with input text when form is submitted with valid text", async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Add a todo");
    await user.type(input, "New todo item");

    const button = screen.getByText("Add");
    await user.click(button);

    expect(mockOnAdd).toHaveBeenCalledWith("New todo item");
  });

  it("does not call onAdd when form is submitted with empty text", async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const button = screen.getByText("Add");
    await user.click(button);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it("does not call onAdd when form is submitted with whitespace-only text", async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Add a todo");
    await user.type(input, "   ");

    const button = screen.getByText("Add");
    await user.click(button);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it("clears input field after submitting a todo", async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Add a todo");
    await user.type(input, "New todo item");

    const button = screen.getByText("Add");
    await user.click(button);

    expect(input).toHaveValue("");
  });
});
