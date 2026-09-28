import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <h2>Admin Dashboard</h2>
    <h3>Orders Management</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>User</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let order of orders">
          <td>{{ order._id }}</td>
          <td>{{ order.userId?.email }}</td>
          <td>$
          {{ order.totalAmount }}</td>
          <td>{{ order.status }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class AdminDashboardComponent implements OnInit {
  orders: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.api.adminGetOrders().subscribe(data => {
      this.orders = data;
    });
  }
}