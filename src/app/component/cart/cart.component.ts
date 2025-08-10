import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { OrderServiceService } from '../../services/order-service.service';
import { Router } from '@angular/router';
import { OrderDto } from '../../model/order-item-dto';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
    imports: [
    TableModule ,
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
   items:any = [];
  total = 0;

  constructor(private cart: CartServiceService, private orderService: OrderServiceService, private router: Router) {}

  ngOnInit() {
    this.items = this.cart.getItems();
    this.recalc();
  }

  recalc() { this.total = this.cart.getTotal(); }

  updateQty(item: any, event: any) {
    const qty = +event.target.value;
    this.cart.updateQuantity(item.product.id, qty);
    this.items = this.cart.getItems();
    this.recalc();
  }

  remove(item: any) {
    this.cart.remove(item.product.id);
    this.items = this.cart.getItems();
    this.recalc();
  }

  checkout() {
    if (!this.items.length) return;
    const order: OrderDto = {
      items: this.cart.toOrderItems()
    };
    this.orderService.placeOrder(order).subscribe((resp: any) => {
      // expecting resp.id from backend
      const orderId = resp?.id ?? resp?.data?.id ?? null;
      this.cart.clearCart();
      this.router.navigate(['/order-success', orderId]);
    });
  }

}
