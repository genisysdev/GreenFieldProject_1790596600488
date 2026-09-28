import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-checkout',
  template: `
    <h2>Secure Checkout</h2>
    <form (ngSubmit)="onCheckout()" class="w-50">
      <div class="mb-3">
        <label class="form-label">Payment Method / Token</label>
        <input type="text" class="form-control" [(ngModel)]="paymentMethodId" name="paymentMethodId" required placeholder="e.g. pm_card_visa">
      </div>
      <button type="submit" class="btn btn-primary">Complete Payment & Place Order</button>
    </form>
  `
})
export class CheckoutComponent {
  paymentMethodId = 'pm_simulated_token';

  constructor(private api: ApiService, private router: Router) {}

  onCheckout(): void {
    this.api.checkout(this.paymentMethodId).subscribe(res => {
      alert('Order placed successfully! Order ID: ' + res.orderId);
      this.router.navigate(['/']);
    }, err => {
      alert(err.error?.error || 'Checkout failed');
    });
  }
}