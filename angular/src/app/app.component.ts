import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <main class="container mt-4">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  title = 'mean-ecommerce-app';
}