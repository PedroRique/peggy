import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { LoanRequest } from "../models/Loan";

export const createLoan = async (loan: LoanRequest) => {
  try {
    await setDoc(doc(FIREBASE_DB, "loans"), loan);
  } catch (error) {
    console.error(error);
  }
};
