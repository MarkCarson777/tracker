import { create } from "zustand";
import { type Exercise } from "../types/workout";

interface WorkoutState {
  exercises: Exercise[];
  workoutNotes: string;
  addExercise: (exercise: Exercise) => void;
  updateExercise: (index: number, updatedExercise: Exercise) => void;
  removeExercise: (index: number) => void;
  setWorkoutNotes: (notes: string) => void;
  resetWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  exercises: [],
  workoutNotes: "",
  addExercise: (exercise) =>
    set((state) => ({ exercises: [...state.exercises, exercise] })),
  updateExercise: (index, updatedExercise) =>
    set((state) => ({
      exercises: state.exercises.map((ex, i) =>
        i === index ? updatedExercise : ex
      ),
    })),
  removeExercise: (index) =>
    set((state) => ({
      exercises: state.exercises.filter((_, i) => i !== index),
    })),
  setWorkoutNotes: (notes) => set({ workoutNotes: notes }),
  resetWorkout: () => set({ exercises: [], workoutNotes: "" }),
}));
