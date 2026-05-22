import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-dashboard',
  standalone: false,
  templateUrl: './task-dashboard.html',
  styleUrls: ['./task-dashboard.scss']
})
export class TaskDashboardComponent implements OnInit {
  private taskService = inject(TaskService);
  
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  isCreating = false;
  toastMessage: string | null = null;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        this.showToast('Failed to load tasks', true);
        console.error(err);
      }
    });
  }

  onSelectTask(task: Task) {
    this.selectedTask = task;
    this.isCreating = false;
  }

  onNewTask() {
    this.selectedTask = null;
    this.isCreating = true;
  }

  onTaskSaved() {
    this.isCreating = false;
    this.selectedTask = null;
    this.showToast('Task saved successfully!');
    this.loadTasks();
  }
  
  onTaskDeleted(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.showToast('Task deleted successfully!');
        if (this.selectedTask?.id === taskId) {
          this.selectedTask = null;
        }
        this.loadTasks();
      }
    });
  }

  onTaskStatusChanged(task: Task) {
    this.taskService.updateTask(task.id, {
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted,
      priority: task.priority,
      dueDate: task.dueDate
    }).subscribe({
      next: () => {
        this.showToast('Task status updated');
        this.loadTasks();
      }
    });
  }

  showToast(message: string, isError = false) {
    this.toastMessage = message;
    setTimeout(() => {
      this.toastMessage = null;
    }, 3000);
  }
}
