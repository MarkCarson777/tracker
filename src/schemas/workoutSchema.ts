import { z } from "zod";

const setSchema = z.object({
  reps: z.string().min(1),
  weight: z.string().min(1),
  restTime: z.string().min(1),
  failure: z.boolean(),
});

const exerciseSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("weights"),
    name: z.string().min(1),
    sets: z.array(setSchema).min(1),
  }),
  z.object({
    type: z.literal("cardio"),
    name: z.string().min(1),
    distance: z.string().min(1).optional(),
    duration: z.string().min(1),
  }),
]);

export const workoutSchema = z.object({
  workoutName: z.string().min(1),
  exercises: z.array(exerciseSchema).min(1),
  workoutNotes: z.string().optional(),
});

export type Workout = z.infer<typeof workoutSchema>;
