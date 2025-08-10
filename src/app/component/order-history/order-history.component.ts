import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { OrderDto } from '../../model/order-item-dto';
import { OrderServiceService } from '../../services/order-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
    imports: [
    TableModule,
    CommonModule
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
orders: OrderDto[] = [];

  constructor(private orderService: OrderServiceService) {}

ngOnInit() {
  this.orderService.getOrderHistory().subscribe(response => {
    this.orders = response || [];
  });
}
}
