import { Injectable } from '@angular/core';
import { ProductDto } from '../model/product-dto';
import { OrderDto, OrderItemDto } from '../model/order-item-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
   private baseUrl = 'http://localhost:8080/api/orders';
 constructor(private http: HttpClient) {}

  placeOrder(order: OrderDto): Observable<OrderDto> {
    return this.http.post<OrderDto>(this.baseUrl, order);
  }

  getOrderHistory(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(this.baseUrl);
  }
}
