import {
  addDoc,
  collection,
  doc,
  documentId,
  getDocs,
  query,
  runTransaction,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import {
  Loan,
  LoanDate,
  LoanRequest,
  LoanStatus,
  LoanType,
  LoanWithInfo,
} from "../models/Loan";
import { Product } from "../models/Product";
import { UserData } from "../models/UserData";
import { addBalance } from "./balance.service";
import { commonFetch } from "./utils.service";

export const createLoan = async (
  loanRequest: LoanRequest,
  product?: Product
) => {
  try {
    const loan: Loan = {
      ...loanRequest,
      status: LoanStatus.PENDING,
      hasLenderRate: false,
      hasBorrowerRate: false,
    };
    const productCost = Number(product?.price);

    await runTransaction(FIREBASE_DB, async () => {
      try {
        const loanDoc = await addDoc(collection(FIREBASE_DB, "loans"), loan);
        if (!loanDoc.id) return null;

        await addBalance(loan.borrowerUserId, -productCost);
      } catch (error) {
        return null;
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateLoanStatus = async (
  loanId: string,
  status: LoanStatus,
  productId: string
) => {
  try {
    await updateDoc(doc(FIREBASE_DB, "loans", loanId), { status });
    if (status === LoanStatus.ACCEPTED) {
      updateDoc(doc(FIREBASE_DB, "products", productId), { locked: true });
    }
    if (status === LoanStatus.RETURNED) {
      updateDoc(doc(FIREBASE_DB, "products", productId), { locked: false });
    }
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

export const fetchAcceptedLoanDatesForProduct = async (productId: string) => {
  const q = query(
    collection(FIREBASE_DB, "loans"),
    where("status", "==", LoanStatus.ACCEPTED && LoanStatus.PROGRESS),
    where("productId", "==", productId)
  );

  const querySnapshot = await getDocs(q);
  const loanDates: LoanDate[] = [];
  querySnapshot.forEach((doc) => {
    const loanData = doc.data();
    loanDates.push({
      startDate: loanData.startDate,
      endDate: loanData.endDate,
    });
  });

  return loanDates;
};
