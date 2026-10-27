import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from '../Todos/Todo';
import { describe, expect, it, vi } from 'vitest';

describe('Todo', () => {
  it('should render todo', () => {
    const todo = {
      // _id: '1',
      text: 'Test todo',
      done: false
    }

    render(<Todo todo={todo} />)
    const element = screen.getByText('Test todo');
    expect(element).toBeDefined();
  });

  it('should toggle todo', async () => {
    const todo = {
      // _id: '1',
      text: 'Test todo toggle',
      done: false
    }

    const mockToggleTodo = vi.fn();
    render(<Todo todo={todo} completeTodo={mockToggleTodo} />)
    const element = screen.getByText('Set as done');
    await userEvent.click(element);
    expect(mockToggleTodo).toHaveBeenCalledTimes(1);
  });

  it('should delete todo', async () => {
    const todo = {
      // _id: '1',
      text: 'Test todo delete',
      done: false
    }

    const mockDeleteTodo = vi.fn();
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} />)
    const element = screen.getByText('Delete');
    await userEvent.click(element);
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
  });
});