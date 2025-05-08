import { useState } from "react";
import { Button } from "../../components/Button";
import { type Exercise, type Weights } from "../../types/workout";

export const LogWorkoutPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutNotes, setWorkoutNotes] = useState<string>("");

  const onAddExercise = () => {
    const newExercise: Weights = {
      type: "weights",
      name: "",
      sets: [{ reps: 0, weight: 0, failure: false }],
      notes: "",
    };

    setExercises([...exercises, newExercise]);
  };

  const onChangeWorkoutNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorkoutNotes(e.target.value);
  };

  const onSaveWorkout = () => {
    console.log("Workout saved", { exercises, workoutNotes });
  };

  return (
    <div>
      <p>Log Workout</p>
      <Button onClick={onAddExercise}>Add exercise</Button>
      <div>
        <label htmlFor="exercises">Exercises</label>
        {exercises.map((exercise, index) => {
          return (
            <div key={index}>
              <p>Exercise {index + 1}</p>
              <span>{exercise.type}</span>
            </div>
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
