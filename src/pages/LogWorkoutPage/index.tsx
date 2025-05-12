// Components
import { Button } from "../../components/Button";
import { ExerciseForm } from "../../components/ExerciseForm";
import { Input } from "../../components/Input";
// Firebase
import { addWorkout } from "../../services/workoutService";
// Forms
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Types
import { type Workout, workoutSchema } from "../../schemas/workoutSchema";

export const LogWorkoutPage: React.FC = () => {
  // Form setup
  const formMethods = useForm<Workout>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      workoutName: "",
      exercises: [
        {
          type: "weights",
          name: "",
          sets: [{ reps: "0", weight: "0", restTime: "0", failure: false }],
        },
      ],
      workoutNotes: "",
    },
  });

  // Destructure form methods
  const { handleSubmit, register, formState, control } = formMethods;

  // Field array for exercises
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "exercises",
  });

  console.log("errors", formState.errors);

  // Function to add a new exercise
  const onAddExercise = () => {
    append({
      type: "weights",
      name: "",
      sets: [{ reps: "0", weight: "0", restTime: "0", failure: false }],
    });
  };

  // Function to save the workout
  const onSaveWorkout = async (data: Workout) => {
    try {
      const workoutData = {
        workoutName: data.workoutName,
        userId: "testUserId",
        date: new Date().toISOString(),
        exercises: data.exercises,
        notes: data.workoutNotes,
      };
      await addWorkout(workoutData);
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  // Function to remove an exercise
  const onRemoveExercise = (index: number) => {
    remove(index);
  };

  return (
    <FormProvider {...formMethods}>
      <div className="m-10 space-y-4">
        <form onSubmit={handleSubmit(onSaveWorkout)}>
          <div className="flex flex-col">
            <label htmlFor="workoutName">Workout name</label>
            <Input
              id="workoutName"
              placeholder="Enter a workout name..."
              {...register("workoutName")}
            />
            {formState.errors.workoutName && (
              <span className="text-xs text-red-500">
                {formState.errors.workoutName.message}
              </span>
            )}
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onAddExercise();
            }}
          >
            Add exercise
          </Button>
          <div className="space-y-4">
            {fields.map((_, index) => {
              return (
                <ExerciseForm
                  key={index}
                  index={index}
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
              rows={3}
              {...register("workoutNotes")}
            />
            {formState.errors.workoutNotes && (
              <span className="text-xs text-red-500">
                {formState.errors.workoutNotes.message}
              </span>
            )}
          </div>
          <Button>Save workout</Button>
        </form>
      </div>
    </FormProvider>
  );
};
