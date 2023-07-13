import { Address } from "./Address";

export interface UserData {
  uid?: string;
  name?: string | null;
  email?: string | null;
  photoURL?: string | null;
  addresses?: Address[];
  rate?: number;
}
