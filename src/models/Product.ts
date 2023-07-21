export interface Product {
  uid?: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  userId: string;
  ratings?: string[];
}
