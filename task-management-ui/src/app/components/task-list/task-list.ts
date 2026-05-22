import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskListComponent implements OnChanges {
  @Input() tasks: Task[] = [];
  @Input() selectedTaskId?: number;

  @Output() selectTask = new EventEmitter<Task>();
  @Output() toggleStatus = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();

  filterStatus: 'all' | 'completed' | 'active' = 'all';
  sortBy: 'dueDate' | 'priority' | 'created' = 'created';
  
  filteredTasks: Task[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      this.applyFiltersAndSort();
    }
  }

  onFilterChange() {
    this.applyFiltersAndSort();
  }

  onSortChange() {
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort() {
    // 1. Filter
    let result = [...this.tasks];
    if (this.filterStatus === 'completed') {
      result = result.filter(t => t.isCompleted);
    } else if (this.filterStatus === 'active') {
      result = result.filter(t => !t.isCompleted);
    }

    // 2. Sort
    result.sort((a, b) => {
      if (this.sortBy === 'priority') {
        return b.priority - a.priority; // higher priority first
      } else if (this.sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        // created
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      }
    });

    this.filteredTasks = result;
  }
}
