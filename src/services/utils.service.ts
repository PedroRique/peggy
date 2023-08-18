import { User } from "firebase/auth";
import { Query, getDocs } from "firebase/firestore";
import { Address } from "../models/Address";
import { LoanStatus, LoanWithInfo } from "../models/Loan";
import { UserData } from "../models/UserData";
import { fetchProductCoordinates } from "./product.service";

export const commonFetch = async <T>(q: Query) => {
  const snap = await getDocs(q);
  return snap.docs.map<T>((doc) => ({ ...doc.data(), uid: doc.id } as T));
};

export const formatAddressLabel = (address: Address): string => {
  let addressLabel = `${address.street}, ${address.number}`;

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

export const formatAddressCoordenadas = (address: Address): string => {
  const latitude = `${address.latitude}`;
  const longitude = `${address.longitude}`;

  return `${latitude} ${longitude}`;
};


const calculateDistanceBetweenAddressAndProduct = async (address: Address, productId: string) => {
  try {
    const productCoordinates = await fetchProductCoordinates(productId); 

    if (productCoordinates && address.latitude !== null && address.longitude !== null) {
      const { latitude: lat1, longitude: lon1 } = address;
      const { latitude: lat2, longitude: lon2 } = productCoordinates;

      const distance = calculateDistance(lat1, lon1, lat2, lon2);
      return distance;
    } else {
      console.error("Unable to calculate distance.");
      return null;
    }
  } catch (error) {
    console.error("Error calculating distance:", error);
    return null;
  }
};
export const distance = calculateDistanceBetweenAddressAndProduct


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

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};