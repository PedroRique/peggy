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
import {
  Loan,
  LoanRequest,
  LoanStatus,
  LoanType,
  LoanWithInfo,
} from "../models/Loan";
import { Product } from "../models/Product";
import { UserData } from "../models/UserData";
import { commonFetch } from "./utils.service";

export const createLoan = async (loanRequest: LoanRequest) => {
  const loan: Loan = {
    ...loanRequest,
    status: LoanStatus.PENDING,
    hasLenderRate: false,
    hasBorrowerRate: false
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
  type: LoanType
): Promise<LoanWithInfo[]> => {
  const currentUserId = FIREBASE_AUTH.currentUser?.uid || "";

  const loanData = await commonFetch<Loan>(
    query(
      collection(FIREBASE_DB, "loans"),
      where(
        type === "lend" ? "lenderUserId" : "borrowerUserId",
        "==",
        currentUserId
      )
    )
  );

  if (!loanData.length) {
    return [];
  }

  const productIds = loanData.map(({ productId }) => productId);
  const borrowerUserIds = loanData.map(({ borrowerUserId }) => borrowerUserId);
  const lenderUserIds = loanData.map(({ lenderUserId }) => lenderUserId);

  const [productData, borrowerUserData, lenderUserData] = await Promise.all([
    commonFetch<Product>(
      query(
        collection(FIREBASE_DB, "products"),
        where(documentId(), "in", productIds)
      )
    ),
    commonFetch<UserData>(
      query(
        collection(FIREBASE_DB, "users"),
        where(documentId(), "in", borrowerUserIds)
      )
    ),
    commonFetch<UserData>(
      query(
        collection(FIREBASE_DB, "users"),
        where(documentId(), "in", lenderUserIds)
      )
    ),
  ]);

  const productLookup = Object.fromEntries(
    productData.map((product) => [product.uid, product])
  );
  const borrowerLookup = Object.fromEntries(
    borrowerUserData.map((borrower) => [borrower.uid, borrower])
  );
  const lenderLookup = Object.fromEntries(
    lenderUserData.map((lender) => [lender.uid, lender])
  );

  const dataWithProduct = loanData.map((loan) => ({
    ...loan,
    product: productLookup[loan.productId],
  }));

  const dataWithProductBorrowerType = dataWithProduct.map((loan) => ({
    ...loan,
    borrower: borrowerLookup[loan.borrowerUserId],
    type,
  }));

  const dataWithProductBorrowerLenderType = dataWithProductBorrowerType.map(
    (loan) => ({
      ...loan,
      lender: lenderLookup[loan.lenderUserId],
      type,
    })
  );

  return dataWithProductBorrowerLenderType;
};
