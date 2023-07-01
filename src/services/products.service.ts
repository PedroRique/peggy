import { collection, getDocs, query } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";

export interface Product {
  imageUrl: string;
  name: string;
}

export const fetchProducts = async () => {
  const q = query(collection(FIREBASE_DB, "products"));
  const snap = await getDocs(q);
  let result: Product[] = [];
  snap.forEach((doc) => {
    if (doc.exists()) {
      result.push(doc.data() as Product);
    }
  });
  return result;
};
