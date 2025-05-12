import { Button } from "../../components/Button";
import { type Exercise } from "../../types/workout";
import { ExerciseForm } from "../../components/ExerciseForm";
import { addWorkout } from "../../services/workoutService";
import { Input } from "../../components/Input";
import { useWorkoutStore } from "../../store/workoutStore";

export const LogWorkoutPage: React.FC = () => {
  const workoutName = useWorkoutStore((state) => state.workoutName);
  const setWorkoutName = useWorkoutStore((state) => state.setWorkoutName);
  const exercises = useWorkoutStore((state) => state.exercises);
  const addExercise = useWorkoutStore((state) => state.addExercise);
  const updateExercise = useWorkoutStore((state) => state.updateExercise);
  const removeExercise = useWorkoutStore((state) => state.removeExercise);
  const workoutNotes = useWorkoutStore((state) => state.workoutNotes);
  const setWorkoutNotes = useWorkoutStore((state) => state.setWorkoutNotes);

  const onAddExercise = () => {
    addExercise({
      type: "weights",
      name: "",
      sets: [{ reps: 0, weight: 0, restTime: 0, failure: false }],
    });
  };

  const onChangeWorkoutNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorkoutNotes(e.target.value);
  };

  const onSaveWorkout = async () => {
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
    updateExercise(index, updatedExercise);
  };

  const onRemoveExercise = (index: number) => {
    removeExercise(index);
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
