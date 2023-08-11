export interface Product {
  uid?: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  userId: string;
  selectedAddress:string;
  coordinates: number | null; 
  price: number;
  ratings?: string[];
  locked?: boolean;
}
