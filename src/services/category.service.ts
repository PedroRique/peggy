import { collection, getDocs, query } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { Category } from "../models/Category";

export const fetchCategories = async () => {
  const q = query(collection(FIREBASE_DB, "categories"));
  const snap = await getDocs(q);
  let result: Category[] = [];
  snap.forEach((doc) => {
    if (doc.exists()) {
      result.push({ ...doc.data(), id: doc.id } as Category);
    }
  });
  return result;
};
