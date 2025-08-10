import { Component, EventEmitter, Output } from '@angular/core';
import { ProductDto } from '../../model/product-dto';
import { ProductServiceService } from '../../services/product-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
   searchText = '';
  @Output() searchEvent = new EventEmitter<ProductDto[]>();

  constructor(private productService: ProductServiceService, private router: Router) {}

  onSearch() {
    const q = this.searchText.trim();
    if (!q) {
      this.router.navigate(['/products']);
      return;
    }
    this.productService.searchProducts(q).subscribe(products => {
      this.searchEvent.emit(products);
      this.router.navigate(['/products'], { queryParams: { q } });
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
  clearSearch() {
  this.searchText = '';
  this.router.navigate(['/products']);
}

}
