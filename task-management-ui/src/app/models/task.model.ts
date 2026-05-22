export interface Task {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: number;
  dueDate?: Date;
  createdDate: Date;
}

export interface CreateTask {
  title: string;
  description?: string;
  priority: number;
  dueDate?: Date;
}

export interface UpdateTask {
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: number;
  dueDate?: Date;
}
