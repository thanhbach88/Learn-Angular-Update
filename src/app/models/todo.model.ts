export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  createdDate: Date;
  dueDate?: Date;
  completedDate?: Date;
}

export enum TodoStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

export interface TodoStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}
