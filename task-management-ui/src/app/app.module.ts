import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app';
import { LoginComponent } from './components/login/login';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskFormComponent } from './components/task-form/task-form';

import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskDashboardComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    TaskService,
    DatePipe,
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
