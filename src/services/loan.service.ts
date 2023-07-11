import {
  addDoc,
  collection,
  doc,
  documentId,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { Loan, LoanRequest, LoanStatus, LoanWithInfo } from "../models/Loan";
import { Product } from "../models/Product";
import { UserData } from "../models/UserData";
import { commonFetch } from "./utils.service";

export const createLoan = async (loanRequest: LoanRequest) => {
  const loan: Loan = {
    ...loanRequest,
    status: LoanStatus.PENDING,
  };
  const docRef = await addDoc(collection(FIREBASE_DB, "loans"), loan);

  return docRef.id;
};

export const updateLoanStatus = async (loanId: string, status: LoanStatus) => {
  try {
    await updateDoc(doc(FIREBASE_DB, "loans", loanId), { status });
  } catch (error) {
    console.error(error);
  }
};

export const fetchLoans = async () => {
  const q = query(collection(FIREBASE_DB, "loans"));
  return await commonFetch<Loan>(q);
};

export const fetchLoansWithProductInfo = async (
  type: "lender" | "borrower"
): Promise<LoanWithInfo[]> => {
  const currentUserId = FIREBASE_AUTH.currentUser?.uid || "";
  const loanData = await commonFetch<Loan>(
    query(
      collection(FIREBASE_DB, "loans"),
      where(
        type === "lender" ? "lenderUserId" : "borrowerUserId",
        "==",
        currentUserId
      )
    )
  );

  if (!loanData.length) {
    return [];
  }

  const productIds = loanData.map((loan) => loan.productId);
  const borrowerUserIds = loanData.map((loan) => loan.borrowerUserId);
  const productData = await commonFetch<Product>(
    query(
      collection(FIREBASE_DB, "products"),
      where(documentId(), "in", productIds)
    )
  );

  const borrowerUserData = await commonFetch<UserData>(
    query(
      collection(FIREBASE_DB, "users"),
      where(documentId(), "in", borrowerUserIds)
    )
  );

  const dataWithProduct = loanData.map((loan) => {
    const product = productData.find(
      (product) => product.uid === loan.productId
    );
    return { ...loan, product };
  });

  const dataWithProductAndBorrower = dataWithProduct.map((loan) => {
    const borrower = borrowerUserData.find(
      (borrower) => borrower.uid === loan.borrowerUserId
    );
    return { ...loan, borrower };
  });

  return dataWithProductAndBorrower;
};
