import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-catalog',
  template: `
    <div class="row mb-4">
      <div class="col-md-8">
        <input type="text" class="form-control" placeholder="Search products..." [(ngModel)]="searchQuery" (input)="searchProducts()">
      </div>
      <div class="col-md-4">
        <select class="form-control" [(ngModel)]="selectedCategory" (change)="searchProducts()">
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Apparel">Apparel</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mb-3" *ngFor="let product of products">
        <div class="card h-100">
          <img [src]="product.imageUrl" class="card-img-top" alt="Product Image" style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-muted">
              {{ product.description }}
            </p>
            <p class="card-text fw-bold">
              $
              {{ product.price }}
            </p>
            <div class="mt-auto">
              <button class="btn btn-primary btn-sm me-2" (click)="addToCart(product._id)">Add to Cart</button>
              <button class="btn btn-outline-secondary btn-sm" (click)="toggleWishlist(product._id)">Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductCatalogComponent implements OnInit {
  products: any[] = [];
  searchQuery = '';
  selectedCategory = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.api.getProducts(this.searchQuery, this.selectedCategory).subscribe(data => {
      this.products = data;
    });
  }

  searchProducts(): void {
    this.loadProducts();
  }

  addToCart(productId: string): void {
    this.api.addToCart(productId, 1).subscribe(() => {
      alert('Product added to cart!');
    }, err => {
      alert(err.error?.error || 'Failed to add to cart');
    });
  }

  toggleWishlist(productId: string): void {
    this.api.toggleWishlist(productId).subscribe(() => {
      alert('Wishlist updated!');
    }, err => {
      alert(err.error?.error || 'Failed to update wishlist');
    });
  }
}