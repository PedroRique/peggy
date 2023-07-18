import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { Rating } from "../models/Rating";

export const updateRatings = async (
  rating: Rating,
  collec: "users" | "products"
) => {
  try {
    if (rating) {
      const ref = collection(FIREBASE_DB, "ratings");
      const result = await addDoc(ref, rating);

      const userRef = doc(FIREBASE_DB, collec, rating.ratedId);
      await updateDoc(userRef, {
        ratings: arrayUnion(result.id),
      });

      return result.id;
    }
  } catch (error) {
    console.error(error);
  }
};

export const checkLenderRate = async (loanId?: string) => {
  try {
    if (loanId) {
      const loanRef = doc(FIREBASE_DB, "loans", loanId);
      await updateDoc(loanRef, {
        hasLenderRate: true,
      });
    }
  } catch (error) {}
};

export const checkBorrowerRate = async (loanId?: string) => {
  try {
    if (loanId) {
      const loanRef = doc(FIREBASE_DB, "loans", loanId);
      await updateDoc(loanRef, {
        hasBorrowerRate: true,
      });
    }
  } catch (error) {}
};
