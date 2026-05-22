import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../models/login.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;
  
  // Signal/Observable for auth state
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(request: LoginRequest) {
    return this.http.post<any>(`${this.apiUrl}/login`, request).pipe(
      tap(() => {
        const token = btoa(`${request.username}:${request.password}`);
        localStorage.setItem('basic_auth_token', token);
        this.isLoggedInSubject.next(true);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  logout() {
    localStorage.removeItem('basic_auth_token');
    this.isLoggedInSubject.next(false);
  }

  get token(): string | null {
    return localStorage.getItem('basic_auth_token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('basic_auth_token');
  }
}
