export interface Product {
  uid?: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  userId: string;
  selectedAddress:string;
  latitude: number | null; 
  longitude: number | null; 
  price: number;
  ratings?: string[];
  locked?: boolean;
}
