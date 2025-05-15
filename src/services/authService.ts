// Firebase
import { auth } from "../firebase";
import { signInWithEmailAndPassword, type User } from "firebase/auth";

export const signIn = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Failed to sign in", error);
    throw error;
  }
};
