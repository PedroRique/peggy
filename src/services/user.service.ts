import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

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
    await addDoc(collection(FIREBASE_DB, "users"), {
      name,
      email,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUserPhotoURL = async (photoURL: string | null) => {
  const user = FIREBASE_AUTH.currentUser;
  if (user) {
    await updateProfile(user, { photoURL });
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
