import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../model/product-dto';
import { ProductServiceService } from '../../services/product-service.service';
import { CartServiceService } from '../../services/cart-service.service';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-product-list',
  standalone: true,
    imports: [
    ProgressSpinnerModule,
    CommonModule,
    CardModule             
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: ProductDto[] = [];
  filtered: ProductDto[] = [];
  loading = false;

  constructor(
    private productService: ProductServiceService,
    private cartService: CartServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log("HII")
    this.loadAll();
    // detect query param search
    this.route.queryParams.subscribe(params => {
      const q = params['q'];
      if (q) this.search(q);
      else this.filtered = this.products;
    });
  }

  loadAll() {
    this.loading = true;
    this.productService.getAllProducts().subscribe(data => {
      this.products = data || [];
      this.filtered = this.products;
      this.loading = false;
    });
  }

  search(q: string) {
    this.loading = true;
    this.productService.searchProducts(q).subscribe(results => {
      this.filtered = results;
      this.loading = false;
    });
  }

  addToCart(p: ProductDto) {
    this.cartService.addToCart(p);
    alert("Item added Sucessfully!!")
  }

  asImageSrc(p: ProductDto) {
    if (!p.image) return 'assets/placeholder.png';
    // If backend returns raw base64 (no prefix)
    return `data:image/jpeg;base64,${p.image}`;
  }

}
