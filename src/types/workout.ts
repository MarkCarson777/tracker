export interface Set {
  reps: number;
  weight: number;
  restTime?: number;
  failure?: boolean;
}

export interface Weights {
  name: string;
  type: "weights";
  sets: Set[];
}

export interface Cardio {
  name: string;
  type: "cardio";
  distance?: number;
  duration: number;
}

export type Exercise = Weights | Cardio;

export interface Workout {
  id?: string;
  userId: string;
  name: string;
  date: string;
  exercises: Exercise[];
  notes: string;
}
