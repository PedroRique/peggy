import { addDoc, collection, query } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { Loan, LoanRequest, LoanStatus } from "../models/Loan";
import { commonFetch } from "./utils.service";

export const createLoan = async (loanRequest: LoanRequest) => {
  const loan: Loan = {
    ...loanRequest,
    status: LoanStatus.REQUESTING,
  };
  const docRef = await addDoc(collection(FIREBASE_DB, "loans"), loan);

  return docRef.id;
};

export const fetchLoans = async () => {
  const q = query(collection(FIREBASE_DB, "loans"));
  return await commonFetch<Loan>(q);
};
