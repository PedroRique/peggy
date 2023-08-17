export interface Product {
  uid?: string;
  name: string;
  description: string;
  category: string;
  imageUrls: string[];
  mainImageUrl:string;
  userId: string;
  price: number;
  ratings?: string[];
  locked?: boolean;
}
