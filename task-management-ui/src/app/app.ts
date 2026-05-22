import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  authService = inject(AuthService);
  isLoggedIn$ = this.authService.isLoggedIn$;

  logout() {
    this.authService.logout();
  }
}
