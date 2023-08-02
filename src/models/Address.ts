export interface Address {
  street: string;
  number: string;
  complement: string | null;
  referencePoint: string | null;
  city?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}