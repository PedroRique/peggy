import {
  addDoc,
  and,
  collection,
  endAt,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { Product } from "../models/Product";
import { commonFetch } from "./utils.service";

export const fetchProducts = async () => {
  const q = query(
    collection(FIREBASE_DB, "products"),
    where("userId", "!=", FIREBASE_AUTH.currentUser?.uid)
  );
  return await commonFetch<Product>(q);
};

export const searchProducts = async (searchKey: string) => {
  const q = query(
    collection(FIREBASE_DB, "products"),
    orderBy("name"),
    startAt(searchKey),
    endAt(searchKey + "\uf8ff")
  );
  return await commonFetch<Product>(q);
};

export const fetchProductsById = async (userId?: string) => {
  const finalUserId = userId || FIREBASE_AUTH.currentUser?.uid;
  const q = query(
    collection(FIREBASE_DB, "products"),
    where("userId", "==", finalUserId)
  );
  return await commonFetch<Product>(q);
};

export const fetchProductsByCategory = async (categoryId: string) => {
  const q = query(
    collection(FIREBASE_DB, "products"),
    and(
      where("category", "==", categoryId),
      where("userId", "!=", FIREBASE_AUTH.currentUser?.uid)
    )
  );
  return await commonFetch<Product>(q);
};

export const addProduct = async (product: Omit<Product, "userId">) => {
  try {
    const finalProduct: Product = {
      ...product,
      userId: FIREBASE_AUTH.currentUser?.uid || "",
    };
    const docRef = await addDoc(
      collection(FIREBASE_DB, "products"),
      finalProduct
    );

    return docRef.id;
  } catch (error) {
    throw error;
  }
};
