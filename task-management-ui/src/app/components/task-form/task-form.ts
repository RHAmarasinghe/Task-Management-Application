import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.scss']
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() saved = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private datePipe = inject(DatePipe);

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: [''],
    priority: [1, Validators.required],
    dueDate: [''],
    isCompleted: [false]
  });

  isSubmitting = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task']) {
      this.initForm();
    }
  }

  initForm() {
    if (this.task) {
      let formattedDate = '';
      if (this.task.dueDate) {
        formattedDate = this.datePipe.transform(this.task.dueDate, 'yyyy-MM-dd') || '';
      }
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority,
        dueDate: formattedDate,
        isCompleted: this.task.isCompleted
      });
    } else {
      this.taskForm.reset({ priority: 1, isCompleted: false });
    }
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.taskForm.value;
    
    // Parse back date
    let parsedDate: string | undefined = undefined;
    if (formValue.dueDate) {
      parsedDate = new Date(formValue.dueDate).toISOString();
    }

    if (this.task) { // Update
      const req = {
        title: formValue.title!,
        description: formValue.description || undefined,
        priority: Number(formValue.priority),
        isCompleted: formValue.isCompleted!,
        dueDate: parsedDate as any
      };
      
      this.taskService.updateTask(this.task.id, req).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.saved.emit();
        },
        error: () => this.isSubmitting = false
      });
    } else { // Create
      const req = {
        title: formValue.title!,
        description: formValue.description || undefined,
        priority: Number(formValue.priority),
        dueDate: parsedDate as any
      };
      
      this.taskService.createTask(req).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.saved.emit();
        },
        error: () => this.isSubmitting = false
      });
    }
  }
}
