import { ProductDto } from './product-dto';

export interface OrderItemDto {
  productId: number;
  product?: ProductDto;
  quantity: number;
  totalPrice?: number;
}

export interface OrderDto {
  id?: number;
  items: OrderItemDto[];
  total?: number;
  orderTime?: string;
}
