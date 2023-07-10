import { Query, getDocs } from "firebase/firestore";
import { Address } from "../models/Address";

export const commonFetch = async <T>(q: Query) => {
  const snap = await getDocs(q);
  return snap.docs.map<T>((doc) => doc.data() as T);
};

export const formatAddressLabel = (address: Address): string => {
  return `${address.street} ${address.number}, ${address.complement} - ${address.city}`;
};
