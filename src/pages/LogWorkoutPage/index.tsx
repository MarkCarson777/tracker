import { useState } from "react";
import { Button } from "../../components/Button";
import { type Exercise, type Weights } from "../../types/workout";
import { ExerciseForm } from "../../components/ExerciseForm";
import { addWorkout } from "../../services/workoutService";
import { Input } from "../../components/Input";

export const LogWorkoutPage: React.FC = () => {
  const [workoutName, setWorkoutName] = useState<string>("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutNotes, setWorkoutNotes] = useState<string>("");

  console.log("exercises", exercises);

  const onAddExercise = () => {
    const newExercise: Weights = {
      type: "weights",
      name: "",
      sets: [{ reps: 0, weight: 0, restTime: 0, failure: false }],
    };

    setExercises([...exercises, newExercise]);
  };

  const onChangeWorkoutNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorkoutNotes(e.target.value);
  };

  const onSaveWorkout = async () => {
    console.log("saving");
    try {
      const workoutData = {
        name: workoutName,
        userId: "testUserId",
        date: new Date().toISOString(),
        exercises,
        notes: workoutNotes,
      };
      await addWorkout(workoutData);
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  const onUpdateExercise = (index: number, updatedExercise: Exercise) => {
    const newExercises = [...exercises];
    newExercises[index] = updatedExercise;
    setExercises(newExercises);
  };

  const onRemoveExercise = (index: number) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  return (
    <div className="m-10 space-y-4">
      <div className="flex flex-col">
        <label htmlFor="workoutName">Workout name</label>
        <Input
          id="workoutName"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
      </div>
      <Button onClick={onAddExercise}>Add exercise</Button>
      <div className="space-y-4">
        {exercises.map((exercise, index) => {
          return (
            <ExerciseForm
              key={index}
              exercise={exercise}
              index={index}
              onUpdateExercise={onUpdateExercise}
              onRemoveExercise={onRemoveExercise}
            />
          );
        })}
      </div>
      <div>
        <label htmlFor="workoutNotes">Notes</label>
        <textarea
          id="workoutNotes"
          className="border rounded flex w-full"
          value={workoutNotes}
          rows={3}
          onChange={onChangeWorkoutNotes}
        />
      </div>
      <Button onClick={onSaveWorkout}>Save workout</Button>
    </div>
  );
};
