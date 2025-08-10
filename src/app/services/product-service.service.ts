import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDto } from '../model/product-dto';
import { Observable, map } from 'rxjs';

interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductDto[]> {
    return this.http.get<ServiceResponse<ProductDto[]>>(this.baseUrl)
      .pipe(map(response => response.data));
  }

  searchProducts(query: string): Observable<ProductDto[]> {
    return this.http.get<ServiceResponse<ProductDto[]>>(`${this.baseUrl}/search`, { params: { query } })
      .pipe(map(response => response.data));
  }
}
