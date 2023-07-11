import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { Address } from "../models/Address";
import { UserData } from "../models/UserData";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface SignInUserRequest {
  email: string;
  password: string;
}

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserRequest) => {
  try {
    const result = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    await updateProfile(result.user, { displayName: name });
    await setDoc(doc(FIREBASE_DB, "users", result.user.uid), {
      name,
      email,
      photoURL: null,
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserPhotoURL = async (photoURL: string | null) => {
  try {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      await updateProfile(user, { photoURL });
      await updateDoc(doc(FIREBASE_DB, "users", user.uid), { photoURL });
    }
  } catch (error) {
    console.error(error);
  }
};

export const addAddress = async (address: Address) => {
  try {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const ref = doc(FIREBASE_DB, "users", user.uid);
      updateDoc(ref, { addresses: arrayUnion(address) });
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeAddress = async (address: Address) => {
  try {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const ref = doc(FIREBASE_DB, "users", user.uid);
      updateDoc(ref, { addresses: arrayRemove(address) });
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateAddress = async (address: Address) => {
  try {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const ref = doc(FIREBASE_DB, "users", user.uid);
      const docSnapshot = await getDoc(ref);
      const addresses = docSnapshot.data()?.addresses || [];
      const addressIndex = addresses.findIndex(
        (a: Address) => a.street === address.street
      );

      if (addressIndex !== -1) {
        addresses[addressIndex] = address;
        await updateDoc(ref, { addresses });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserData = async (
  uid?: string
): Promise<UserData | undefined> => {
  try {
    if (uid) {
      const result = await getDoc(doc(FIREBASE_DB, "users", uid));
      return result.data() as UserData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const signInUser = async ({ email, password }: SignInUserRequest) => {
  try {
    const result = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
