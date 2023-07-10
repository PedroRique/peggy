import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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

export const fetchLoansWithProductInfo = async () => {
  const loansQuery = collection(FIREBASE_DB, "loans");
  const loansSnapshot = await getDocs(loansQuery);
  const loanData = loansSnapshot.docs.map((doc) => doc.data());

  const productIds = loanData.map((loan) => loan.productId);
  const productsQuery = query(
    collection(FIREBASE_DB, "products"),
    where("productId", "in", productIds)
  );
  const productsSnapshot = await getDocs(productsQuery);
  const productData = productsSnapshot.docs.map((doc) => doc.data());

  const mergedData = loanData.map((loan) => {
    const product = productData.find(
      (product) => product.productId === loan.productId
    );
    return { ...loan, product };
  });

  return mergedData;
};
