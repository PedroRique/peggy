import {
  addDoc,
  and,
  arrayRemove,
  collection,
  deleteDoc, doc, 
  endAt,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { Product } from "../models/Product";
import { ADD_PRODUCT_BONUS } from "../shared/Constants";
import { addBalance } from "./balance.service";
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

    await addBalance(FIREBASE_AUTH.currentUser?.uid, ADD_PRODUCT_BONUS);

    return docRef.id;
  } catch (error) {
    throw error;
  }
};



export const removeProduct = async (userId: string) => {
  try {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const productRef = doc(FIREBASE_DB, "products", userId);
      await deleteDoc(productRef);
    } 
  } catch (error) {
    console.error(error);
  }
};