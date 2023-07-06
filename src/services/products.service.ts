import {
  Query,
  addDoc,
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";
import { FIREBASE_DB, FIREBASE_STORAGE } from "../../firebaseConfig";
import { Product } from "../models/Product";

export const fetchProducts = async () => {
  const q = query(collection(FIREBASE_DB, "products"));
  return await commonFetchProducts(q);
};

export const searchProducts = async (searchKey: string) => {
  const q = query(
    collection(FIREBASE_DB, "products"),
    orderBy("name"),
    startAt(searchKey),
    endAt(searchKey + "\uf8ff")
  );
  return await commonFetchProducts(q);
};

export const fetchProductsById = async (userId: string) => {
  const q = query(
    collection(FIREBASE_DB, "products"),
    where("userId", "==", userId)
  );
  return await commonFetchProducts(q);
};

export const addProduct = async (product: Product) => {
  const docRef = await addDoc(collection(FIREBASE_DB, "products"), product);

  return docRef.id;
};

export const uploadProductImage = async (uri: string) => {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(
    FIREBASE_STORAGE,
    "images/products/" + uuid.v4() + ".jpg"
  );
  await uploadBytes(fileRef, blob);
  return await getDownloadURL(fileRef);
};

const commonFetchProducts = async (q: Query) => {
  const snap = await getDocs(q);
  let result: Product[] = [];
  snap.forEach((doc) => {
    if (doc.exists()) {
      result.push(doc.data() as Product);
    }
  });
  return result;
};
