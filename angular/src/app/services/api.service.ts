import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  getProducts(search?: string, category?: string): Observable<any> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (category) params = params.set('category', category);
    return this.http.get(`${this.baseUrl}/products`, { params });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart`);
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart`, { productId, quantity });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/${productId}`);
  }

  getWishlist(): Observable<any> {
    return this.http.get(`${this.baseUrl}/wishlist`);
  }

  toggleWishlist(productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist`, { productId });
  }

  checkout(paymentMethodId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/checkout`, { paymentMethodId });
  }

  getReviews(productId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/reviews/${productId}`);
  }

  addReview(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reviews`, data);
  }

  adminCreateProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/products`, data);
  }

  adminUpdateInventory(id: string, stock: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/admin/products/${id}/inventory`, { stock });
  }

  adminGetOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/orders`);
  }
}