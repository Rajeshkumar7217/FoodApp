import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto, OrderItemDto } from '../model/order-item-dto';
import { ProductDto } from '../model/product-dto';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

 private CART_KEY = 'myfood_cart_v1';
  private items: { product: ProductDto; quantity: number }[] = [];

  constructor() {
    const raw = localStorage.getItem(this.CART_KEY);
    if (raw) this.items = JSON.parse(raw);
  }

  private save() {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.items));
  }

  getItems() {
    return this.items;
  }

  addToCart(product: ProductDto) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) existing.quantity += 1;
    else this.items.push({ product, quantity: 1 });
    this.save();
  }

  updateQuantity(productId: number, qty: number) {
    const it = this.items.find(i => i.product.id === productId);
    if (!it) return;
    it.quantity = qty;
    if (it.quantity <= 0) this.remove(productId);
    else this.save();
  }

  remove(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.save();
  }

  clearCart() {
    this.items = [];
    this.save();
  }

  getTotal(): number {
    return this.items.reduce((s, it) => s + it.product.price * it.quantity, 0);
  }

  toOrderItems() {
    return this.items.map<OrderItemDto>(it => ({
      productId: it.product.id,
      quantity: it.quantity
    }));
  }
}
