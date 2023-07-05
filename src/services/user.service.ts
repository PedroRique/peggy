import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { User } from "../models/User";

export const createUser = async (user: User) => {
  const { name, email, password } = user;

  const result = await createUserWithEmailAndPassword(
    FIREBASE_AUTH,
    email,
    password
  );

  const userData: Omit<User, "password"> = {
    name,
    email,
    uid: result.user.uid,
  };

  const docRef = await addDoc(collection(FIREBASE_DB, "users"), userData);

  return docRef.id;
};

export const signInUser = async (user: User) => {
  const { email, password } = user;

  const result = await signInWithEmailAndPassword(
    FIREBASE_AUTH,
    email,
    password
  );

  return result;
};
