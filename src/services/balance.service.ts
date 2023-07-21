import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { UserData } from "../models/UserData";

export const addBalance = async (userId?: string, balance?: number) => {
  try {
    if (userId && balance) {
      const userDoc = doc(FIREBASE_DB, "users", userId);
      const userSnapshot = await getDoc<UserData>(userDoc);
      const user = userSnapshot.data();

      if (user) {
        const updatedUser = {
          ...user,
          balance: user.balance ? user.balance + balance : balance,
        };

        await updateDoc(userDoc, updatedUser);
      }
    }
  } catch (error) {
    throw error;
  }
};
