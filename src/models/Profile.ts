import { User } from "firebase/auth";

export interface Profile extends Pick<User, "email" | "uid" | "displayName"> {
  photoURL: string | null;
}
