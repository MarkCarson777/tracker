import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  CollectionReference,
} from "firebase/firestore";
import { type Workout } from "../types/workout";

const workoutsCollection = collection(
  db,
  "workouts"
) as CollectionReference<Workout>;

export const addWorkout = async (
  workoutData: Omit<Workout, "id">
): Promise<string> => {
  try {
    const docRef = await addDoc(workoutsCollection, workoutData);
    return docRef.id;
  } catch (error: any) {
    console.error("Error adding workout: ", error);
    throw error;
  }
};

export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const querySnapshot = await getDocs(workoutsCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error: any) {
    console.error("Error getting workouts: ", error);
    throw error;
  }
};

export const updateWorkout = async (
  workoutId: string,
  workoutData: Omit<Workout, "id">
): Promise<void> => {
  try {
    const workoutDoc = doc(db, "workouts", workoutId);
    await updateDoc(workoutDoc, workoutData);
  } catch (error: any) {
    console.error(`Error updating workout with ID ${workoutId}: `, error);
    throw error;
  }
};

export const deleteWorkout = async (workoutId: string): Promise<void> => {
  try {
    const workoutDoc = doc(db, "workouts", workoutId);
    await deleteDoc(workoutDoc);
  } catch (error: any) {
    console.error(`Error deleting workout with ID ${workoutId}: `, error);
    throw error;
  }
};
