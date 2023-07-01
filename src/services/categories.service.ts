import { collection, getDocs, query } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";

export interface Category {
  icon: string;
  imageUrl: string;
  name: string;
}

export const fetchCategories = async () => {
  const q = query(collection(FIREBASE_DB, "categories"));
  const snap = await getDocs(q);
  let result: Category[] = [];
  snap.forEach((doc) => {
    if (doc.exists()) {
      result.push(doc.data() as Category);
    }
  });
  return result;
};
