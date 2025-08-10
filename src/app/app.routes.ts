import { Routes } from '@angular/router';

import { WelcomeComponent } from './component/welcome/welcome.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderSuccessComponent } from './component/order-success/order-success.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order-success/:id', component: OrderSuccessComponent },
  { path: 'orders', component: OrderHistoryComponent },
  { path: '**', redirectTo: '' }
];
