import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  documentId,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { Rating } from "../models/Rating";
import { commonFetch } from "./utils.service";

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

export const getRate = async (ratingIds?: string[]) => {
  try {
    const q = query(
      collection(FIREBASE_DB, "ratings"),
      where(documentId(), "in", ratingIds)
    );
    const ratings = await commonFetch<Rating>(q);

    const rate = ratings
      ? ratings.reduce((acc, r) => acc + r.rate, 0) / ratings.length
      : 0;

    return rate;
  } catch (error) {
    console.error(error);
  }
};
