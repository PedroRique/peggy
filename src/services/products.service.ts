import { addDoc, collection, getDocs, query } from "firebase/firestore";
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

export const addProduct = async (name: string) => {
  const docRef = await addDoc(collection(FIREBASE_DB, "products"), {
    name,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/peggy-app.appspot.com/o/images%2Fproducts%2Fgo-pro.jpg?alt=media&token=ba61ea42-072e-4b09-a512-1dedd9119fa2",
  });

  return docRef.id;
};
