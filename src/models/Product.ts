export interface Product {
  coordinates:{  latitude: number | null;  longitude: number | null; }
  uid?: string;
  name: string;
  description: string;
  category: string;
  imageUrls: string[];
  mainImageUrl:string;
  userId: string;
  selectedAddress:string;
  price: number;
  ratings?: string[];
  locked?: boolean;
}
