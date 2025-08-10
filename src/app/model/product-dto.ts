export interface ProductDto {
  id: number;
  name: string;
  description?: string;
  price: number;
  // backend should send base64 string of image bytes (no prefix) or an URL
  image?: string; 
}