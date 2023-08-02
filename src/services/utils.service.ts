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
  let addressLabel = `${address.street} ${address.number}`;

  if (address.complement) {
    addressLabel += `, ${address.complement}`;
  }

  if (address.referencePoint) {
    addressLabel += ` - ${address.referencePoint}`;
  }

  if (address.city) {
    addressLabel += ` - ${address.city}`;
  }

  return addressLabel;
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

export const getDateObject = (date: string): Date | null => {
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = date.match(dateRegex);

  if (!match) {
    return null;
  }

  const [, day, month, year] = match;
  const numericDay = parseInt(day, 10);
  const numericMonth = parseInt(month, 10);
  const numericYear = parseInt(year, 10);

  if (
    isNaN(numericDay) ||
    isNaN(numericMonth) ||
    isNaN(numericYear) ||
    numericMonth < 1 ||
    numericMonth > 12 ||
    numericDay < 1 ||
    numericDay > 31
  ) {
    return null;
  }

  const dateObject = new Date(numericYear, numericMonth - 1, numericDay);
  return dateObject;
};
