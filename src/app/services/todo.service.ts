import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoStatus, TodoStats } from '../models/todo.model';
import { TodoDataService } from './todo-data.service';

/**
 * TodoService - Facade Pattern Implementation
 * 
 * This service acts as a facade, providing a simplified interface
 * to the component layer. It delegates data operations to TodoDataService
 * and handles business logic like statistics calculation and ID generation.
 * 
 * Benefits of Facade Pattern:
 * - Simplified interface for components
 * - Encapsulates complex business logic
 * - Easy to extend with additional services (e.g., logging, analytics)
 * - Loose coupling between components and data layer
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private todoDataService: TodoDataService) { }

  // Simplified interface methods for components

  getTodos(): Observable<Todo[]> {
    return this.todoDataService.getAll();
  }

  getTodoById(id: number): Todo | undefined {
    return this.todoDataService.getById(id);
  }

  getTodoStats(): TodoStats {
    const todos = this.todoDataService.getAllSync();
    const total = todos.length;
    const completed = todos.filter(t => t.status === TodoStatus.COMPLETED).length;
    const inProgress = todos.filter(t => t.status === TodoStatus.IN_PROGRESS).length;
    const pending = todos.filter(t => t.status === TodoStatus.PENDING).length;

    return { total, completed, inProgress, pending };
  }

  addTodo(todo: Omit<Todo, 'id'>): void {
    const todos = this.todoDataService.getAllSync();
    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
    const newTodo: Todo = {
      ...todo,
      id: maxId + 1
    };
    this.todoDataService.add(newTodo);
  }

  updateTodoStatus(id: number, status: TodoStatus): void {
    const todo = this.todoDataService.getById(id);
    if (todo) {
      const updatedFields: Partial<Todo> = { status };
      if (status === TodoStatus.COMPLETED) {
        updatedFields.completedDate = new Date();
      }
      this.todoDataService.update(id, updatedFields);
    }
  }

  deleteTodo(id: number): void {
    this.todoDataService.delete(id);
  }

  // Additional facade methods for business logic

  getTodosByStatus(status: TodoStatus): Todo[] {
    return this.todoDataService.filterByStatus(status);
  }

  getCompletionRate(): number {
    const stats = this.getTodoStats();
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  }

  isOverdue(todo: Todo): boolean {
    if (!todo.dueDate || todo.status === TodoStatus.COMPLETED) {
      return false;
    }
    return new Date(todo.dueDate) < new Date();
  }
}
