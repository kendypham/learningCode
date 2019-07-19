export class Product {
  id: string;
  index: number;
  name: string;
  categoryId: string;
  price: number;
  description: string;
  images: any;
  createdAt: number;
  updatedAt: number;
  quantity: number;
  rating: number;
  favourite: boolean;
  seller: string;
  oldPrice: number;
  buyerNum: number;
  showHot: number;
  showHome: number;
  width: number;
  height: number;
  warrantyMonth: number;
  imageLinks: string;
  weight: number;
}
export class ProductDetail {
  imageLinks: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  seller: string;
  categoryId: string;
  rating: string;
}
