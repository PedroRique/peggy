import { Query, getDocs } from "firebase/firestore";
import { Address } from "../models/Address";
import { User } from "firebase/auth";
import { UserData } from "../models/UserData";

export const commonFetch = async <T>(q: Query) => {
  const snap = await getDocs(q);
  return snap.docs.map<T>((doc) => ({ ...doc.data(), uid: doc.id } as T));
};

export const formatAddressLabel = (address: Address): string => {
  return `${address.street} ${address.number}, ${address.complement} - ${address.city}`;
};

export const convertUserToUserData = (user: User | null): UserData | null => {
  if (!user) return null;

  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
};
