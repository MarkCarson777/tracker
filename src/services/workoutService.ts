import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import type { Workout } from "../schemas/workoutSchema";

const workoutsCollection = collection(
  db,
  "workouts"
) as CollectionReference<Workout>;

export const addWorkout = async (
  workoutData: Omit<Workout, "id">
): Promise<string> => {
  try {
    const docRef = await addDoc(workoutsCollection, workoutData);
    console.log("Successfully created workout", workoutData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding workout: ", error);
    throw error;
  }
};

export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const querySnapshot = await getDocs(workoutsCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting workouts: ", error);
    throw error;
  }
};

export const getUserWorkout = async (
  workoutId: string
): Promise<Workout | undefined> => {
  try {
    const workoutDocRef = doc(db, "workouts", workoutId);
    const workoutDocSnap = await getDoc(workoutDocRef);

    if (workoutDocSnap.exists()) {
      return { id: workoutDocSnap.id, ...workoutDocSnap.data() } as Workout;
    } else {
      console.log(`Workout: ${workoutId} not found.`);
      return undefined;
    }
  } catch (error) {
    console.error(`Error fetching workout ${workoutId}:`, error);
    throw error;
  }
};

export const getUserWorkouts = async (
  userId: string | undefined
): Promise<Workout[]> => {
  if (!userId) {
    return [];
  }

  const workoutsCollection = collection(db, "workouts");
  const q = query(workoutsCollection, where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    const workouts: Workout[] = [];
    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() } as Workout);
    });
    return workouts;
  } catch (error) {
    console.error("Error fetching user workouts:", error);
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
  } catch (error) {
    console.error(`Error updating workout with ID ${workoutId}: `, error);
    throw error;
  }
};

export const deleteWorkout = async (workoutId: string): Promise<void> => {
  try {
    const workoutDoc = doc(db, "workouts", workoutId);
    await deleteDoc(workoutDoc);
  } catch (error) {
    console.error(`Error deleting workout with ID ${workoutId}: `, error);
    throw error;
  }
};
