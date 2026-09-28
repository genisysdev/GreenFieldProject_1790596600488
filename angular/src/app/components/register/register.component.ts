import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  template: `
    <h2>Register Account</h2>
    <form (ngSubmit)="onRegister()" class="w-50">
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <input type="email" class="form-control" [(ngModel)]="email" name="email" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Password (min 6 chars)</label>
        <input type="password" class="form-control" [(ngModel)]="password" name="password" required>
      </div>
      <button type="submit" class="btn btn-success">Register</button>
    </form>
  `
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  onRegister(): void {
    this.api.register({ email: this.email, password: this.password }).subscribe(() => {
      alert('Registration successful! Please login.');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.error?.error || 'Registration failed');
    });
  }
}