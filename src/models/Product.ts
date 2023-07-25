export interface Product {
  uid?: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  userId: string;
  price: number;
  ratings?: string[];
  locked?: boolean;
}
