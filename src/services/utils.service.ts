import { User } from "firebase/auth";
import { Query, getDocs } from "firebase/firestore";
import { Address } from "../models/Address";
import { LoanStatus, LoanWithInfo } from "../models/Loan";
import { UserData } from "../models/UserData";

export const commonFetch = async <T>(q: Query) => {
  const snap = await getDocs(q);
  return snap.docs.map<T>((doc) => ({ ...doc.data(), uid: doc.id } as T));
};

export const formatAddressLabel = (address: Address): string => {
  return `${address.street} ${address.number}, ${address.complement} - ${address.city}`;
};

export const convertUserToUserData = (user: User | null): UserData | null => {
  if (!user) return null;

  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
};

export const groupLoansBySection = (result: LoanWithInfo[]) => {
  let groups: Record<string, LoanWithInfo[]> = {
    pending: [],
    progress: [],
    other: [],
  };
  const groupedLoans = result.reduce((accumulator, loan) => {
    if (loan.status === LoanStatus.PENDING) {
      accumulator.pending.push(loan);
    } else if (
      loan.status === LoanStatus.PROGRESS ||
      loan.status === LoanStatus.ACCEPTED
    ) {
      accumulator.progress.push(loan);
    } else {
      accumulator.other.push(loan);
    }
    return accumulator;
  }, groups);
  return groupedLoans;
};
