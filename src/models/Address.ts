export interface Address {
  street: string;
  number: string;
  complement: string;
  city?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}
