# Facade Pattern Implementation

## Overview

The TodoService has been refactored to follow the **Facade Pattern**, providing a simplified and unified interface to the component layer while delegating data operations to specialized services.

## Architecture

### Before (Monolithic Service)
```
Component → TodoService (handles everything)
                ├── Data storage
                ├── Business logic
                └── State management
```

### After (Facade Pattern)
```
Component → TodoService (Facade)
                └── TodoDataService (Data Layer)
                      ├── Data storage
                      ├── CRUD operations
                      └── State management
```

## Components

### 1. TodoDataService (`todo-data.service.ts`)
**Responsibility**: Data layer - manages the actual todo data storage and basic CRUD operations

**Key Methods**:
- `getAll()`: Returns observable stream of all todos
- `getAllSync()`: Returns current todos array (for stats calculation)
- `getById(id)`: Retrieves a specific todo
- `add(todo)`: Adds a new todo
- `update(id, data)`: Updates a todo
- `delete(id)`: Removes a todo
- `filterByStatus(status)`: Filters todos by status

### 2. TodoService (`todo.service.ts`) - **Facade**
**Responsibility**: Provides simplified interface to components and handles business logic

**Key Methods**:
- `getTodos()`: Get all todos (delegates to TodoDataService)
- `getTodoById(id)`: Get specific todo
- `getTodoStats()`: Calculate statistics (business logic)
- `addTodo(todo)`: Add todo with auto-generated ID (business logic)
- `updateTodoStatus(id, status)`: Update status with completion logic
- `deleteTodo(id)`: Delete todo
- `getTodosByStatus(status)`: Filter todos
- `getCompletionRate()`: Calculate completion percentage
- `isOverdue(todo)`: Check if todo is overdue

## Benefits

1. **Separation of Concerns**: Data layer separated from business logic
2. **Single Responsibility**: Each service has one clear purpose
3. **Easier Testing**: Can mock TodoDataService when testing TodoService
4. **Flexibility**: Easy to swap data source (e.g., from memory to HTTP API)
5. **Scalability**: Easy to add more services (logging, analytics, notifications) behind the facade
6. **Clean Interface**: Components interact with a simple, intuitive API

## Usage Example

```typescript
// Component only knows about TodoService (facade)
constructor(private todoService: TodoService) {}

ngOnInit() {
  // Get todos - facade handles delegation
  this.todoService.getTodos().subscribe(todos => {
    this.todos = todos;
  });
  
  // Get stats - facade handles business logic
  this.stats = this.todoService.getTodoStats();
}
```

## Future Extensions

The facade pattern makes it easy to add new features:

```typescript
// Add logging service
export class TodoService {
  constructor(
    private todoDataService: TodoDataService,
    private loggingService: LoggingService  // New service
  ) {}
  
  addTodo(todo: Omit<Todo, 'id'>): void {
    this.loggingService.log('Adding todo', todo);  // Cross-cutting concern
    const newTodo = this.generateTodo(todo);
    this.todoDataService.add(newTodo);
    this.loggingService.log('Todo added', newTodo);
  }
}
```

## Design Pattern References

- **Facade Pattern**: Provides a unified interface to a set of interfaces in a subsystem
- **Repository Pattern**: TodoDataService acts as a repository for todo data
- **Service Layer**: TodoService acts as the service layer with business logic
