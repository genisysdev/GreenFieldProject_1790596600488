import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="onLogin()" class="w-50">
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <input type="email" class="form-control" [(ngModel)]="email" name="email" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" [(ngModel)]="password" name="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  onLogin(): void {
    this.api.login({ email: this.email, password: this.password }).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.router.navigate(['/']);
    }, err => {
      alert(err.error?.error || 'Login failed');
    });
  }
}