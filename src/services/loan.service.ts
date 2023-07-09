import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { Loan, LoanRequest, LoanStatus } from "../models/Loan";

export const createLoan = async (loanRequest: LoanRequest) => {
  const loan: Loan = {
    ...loanRequest,
    status: LoanStatus.REQUESTING,
  };
  const docRef = await addDoc(collection(FIREBASE_DB, "loans"), loan);

  return docRef.id;
};
