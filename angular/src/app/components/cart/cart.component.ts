import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  template: `
    <h2>Shopping Cart</h2>
    <div *ngIf="cart?.items?.length === 0" class="alert alert-info">Your cart is empty.</div>
    <table class="table" *ngIf="cart?.items?.length > 0">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of cart.items">
          <td>{{ item.productId.name }}</td>
          <td>$
          {{ item.productId.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>$
          {{ item.productId.price * item.quantity }}</td>
          <td>
            <button class="btn btn-danger btn-sm" (click)="removeItem(item.productId._id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div *ngIf="cart?.items?.length > 0" class="text-end">
      <button class="btn btn-success" routerLink="/checkout">Proceed to Checkout</button>
    </div>
  `
})
export class CartComponent implements OnInit {
  cart: any = { items: [] };

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.api.getCart().subscribe(data => {
      this.cart = data;
    });
  }

  removeItem(productId: string): void {
    this.api.removeFromCart(productId).subscribe(data => {
      this.cart = data;
    });
  }
}