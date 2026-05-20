import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo, TodoStatus, TodoStats } from '../../models/todo.model';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})
export class HomeDashboardComponent implements OnInit {
  todos: Todo[] = [];
  stats: TodoStats = {
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0
  };
  
  TodoStatus = TodoStatus;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.stats = this.todoService.getTodoStats();
    });
  }

  getStatusClass(status: TodoStatus): string {
    switch (status) {
      case TodoStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case TodoStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case TodoStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusLabel(status: TodoStatus): string {
    switch (status) {
      case TodoStatus.COMPLETED:
        return 'Completed';
      case TodoStatus.IN_PROGRESS:
        return 'In Progress';
      case TodoStatus.PENDING:
        return 'Pending';
      default:
        return status;
    }
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }

  getCompletionPercentage(): number {
    if (this.stats.total === 0) return 0;
    return Math.round((this.stats.completed / this.stats.total) * 100);
  }
}
