// Firebase
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type User,
  signInWithPopup,
} from "firebase/auth";

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

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    throw error;
  }
};

export const signUp = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Failed to sign up", error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Failed to sign out", error);
    throw error;
  }
};
