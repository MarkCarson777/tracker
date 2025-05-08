import { useState } from "react";
import { Button } from "../../components/Button";
import { type Exercise, type Weights } from "../../types/workout";
import { ExerciseForm } from "../../components/ExerciseForm";

export const LogWorkoutPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutNotes, setWorkoutNotes] = useState<string>("");

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

  const onSaveWorkout = () => {
    console.log("Workout saved", { exercises, workoutNotes });
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
    <div>
      <p>Log Workout</p>
      <Button onClick={onAddExercise}>Add exercise</Button>
      <div>
        <label htmlFor="exercises">Exercises</label>
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
          className="border rounded w-full p-3"
          value={workoutNotes}
          rows={3}
          onChange={onChangeWorkoutNotes}
        />
      </div>
      <Button onClick={onSaveWorkout}>Save workout</Button>
    </div>
  );
};
