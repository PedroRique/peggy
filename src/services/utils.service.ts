import { User } from "firebase/auth";
import { Query, doc, getDoc, getDocs } from "firebase/firestore";
import _ from "lodash";
import { FIREBASE_DB } from "../../firebaseConfig";
import { Address, Coordinates } from "../models/Address";
import { LoanStatus, LoanWithInfo } from "../models/Loan";
import { Product } from "../models/Product";
import { UserData } from "../models/UserData";

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

export const getDatesBetween = (startDate: string, endDate: string) => {
  let daysBetween: string[] = [];
  for (
    let currentDate = new Date(startDate);
    currentDate <= new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    daysBetween.push(formattedDate);
  }

  return daysBetween;
};

export const addDistanceToProducts = (
  products: Product[],
  position: Coordinates | null
) => {
  return _.orderBy(
    products.map((p) => {
      return {
        ...p,
        distance: calculateProductDistanceToPosition(p, position),
      };
    }),
    ["distance"]
  );
};

export const calculateProductDistanceToPosition = (
  product: Product,
  position: Coordinates | null
) => {
  if (position) {
    const { latitude, longitude } = position;
    if (latitude && longitude && product) {
      const { coordinates } = product;
      if (
        latitude &&
        longitude &&
        coordinates?.latitude &&
        coordinates?.longitude
      ) {
        return calculateDistance(
          latitude,
          longitude,
          coordinates.latitude,
          coordinates.longitude
        );
      }
    }
  }
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

export const convertFloatToDistance = (floatNumber: number): string => {
  const number = floatNumber * 1000;
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "km";
  } else {
    return number.toFixed(0) + "m";
  }
};

export const fetchUserDataById = async (
  userId: string
): Promise<UserData | null> => {
  try {
    const userDocRef = doc(FIREBASE_DB, "users", userId);

    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      return userDocSnapshot.data() as UserData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar dados de usuário por ID:", error);
    throw error;
  }
};
