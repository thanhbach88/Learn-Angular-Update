import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo, TodoStatus } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the todo dashboard',
      status: TodoStatus.IN_PROGRESS,
      createdDate: new Date('2024-01-10'),
      dueDate: new Date('2024-01-20')
    },
    {
      id: 2,
      title: 'Review pull requests',
      description: 'Review and merge pending pull requests',
      status: TodoStatus.PENDING,
      createdDate: new Date('2024-01-12'),
      dueDate: new Date('2024-01-18')
    },
    {
      id: 3,
      title: 'Update dependencies',
      description: 'Update Angular and other npm packages',
      status: TodoStatus.COMPLETED,
      createdDate: new Date('2024-01-08'),
      dueDate: new Date('2024-01-15'),
      completedDate: new Date('2024-01-14')
    },
    {
      id: 4,
      title: 'Fix bug in login module',
      description: 'Resolve authentication issues',
      status: TodoStatus.COMPLETED,
      createdDate: new Date('2024-01-05'),
      dueDate: new Date('2024-01-12'),
      completedDate: new Date('2024-01-11')
    },
    {
      id: 5,
      title: 'Implement dashboard charts',
      description: 'Add visualization charts for todo statistics',
      status: TodoStatus.IN_PROGRESS,
      createdDate: new Date('2024-01-13'),
      dueDate: new Date('2024-01-22')
    },
    {
      id: 6,
      title: 'Write unit tests',
      description: 'Increase test coverage to 80%',
      status: TodoStatus.PENDING,
      createdDate: new Date('2024-01-14'),
      dueDate: new Date('2024-01-25')
    },
    {
      id: 7,
      title: 'Setup CI/CD pipeline',
      description: 'Configure automated deployment',
      status: TodoStatus.PENDING,
      createdDate: new Date('2024-01-15'),
      dueDate: new Date('2024-01-30')
    },
    {
      id: 8,
      title: 'Optimize performance',
      description: 'Improve application load time',
      status: TodoStatus.COMPLETED,
      createdDate: new Date('2024-01-06'),
      dueDate: new Date('2024-01-10'),
      completedDate: new Date('2024-01-09')
    }
  ];

  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);
  public todos$ = this.todosSubject.asObservable();

  constructor() { }

  getAll(): Observable<Todo[]> {
    return this.todos$;
  }

  getAllSync(): Todo[] {
    return this.todos;
  }

  getById(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  add(todo: Todo): void {
    this.todos.push(todo);
    this.todosSubject.next(this.todos);
  }

  update(id: number, updatedTodo: Partial<Todo>): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...updatedTodo };
      this.todosSubject.next(this.todos);
    }
  }

  delete(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.todosSubject.next(this.todos);
  }

  filterByStatus(status: TodoStatus): Todo[] {
    return this.todos.filter(t => t.status === status);
  }
}
