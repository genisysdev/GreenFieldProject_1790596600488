import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a class="navbar-brand" routerLink="/">MEAN E-Commerce</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" routerLink="/">Products</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/cart">Cart</a></li>
          <li class="nav-item" *ngIf="isAdmin()"><a class="nav-link" routerLink="/admin">Admin</a></li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item" *ngIf="!isLoggedIn()"><a class="nav-link" routerLink="/login">Login</a></li>
          <li class="nav-item" *ngIf="!isLoggedIn()"><a class="nav-link" routerLink="/register">Register</a></li>
          <li class="nav-item" *ngIf="isLoggedIn()"><button class="btn btn-outline-light btn-sm mt-1" (click)="logout()">Logout</button></li>
        </ul>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'admin';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}