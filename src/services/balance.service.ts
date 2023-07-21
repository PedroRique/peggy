import { doc, runTransaction } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";

export const addBalance = async (userId?: string, balance?: number) => {
  try {
    if (userId && balance) {
      const userDoc = doc(FIREBASE_DB, "users", userId);

      await runTransaction(FIREBASE_DB, async (transaction) => {
        const userSnapshot = await transaction.get(userDoc);
        const userData = userSnapshot.data();
        transaction.update(userDoc, { balance: userData?.balance + balance });
      });
    }
  } catch (error) {
    throw error;
  }
};
