// Components
import { Button } from "../../components/Button";
import { ExerciseForm } from "../../components/ExerciseForm";
import { FormInput } from "../../components/FormInput";
// Firebase
import { auth } from "../../firebase";
import { addWorkout } from "../../services/workoutService";
// Forms
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Routing
import { useNavigate } from "react-router-dom";
// Types
import { type Workout, workoutSchema } from "../../schemas/workoutSchema";

export const LogWorkoutPage: React.FC = () => {
  const navigate = useNavigate();

  // Form setup
  const formMethods = useForm<Workout>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      workoutName: "",
      exercises: [
        {
          type: "weights",
          name: "",
          sets: [{ reps: "", weight: "", restTime: "", failure: false }],
        },
      ],
      workoutNotes: "",
    },
  });

  // Destructure form methods
  const { handleSubmit, formState, control } = formMethods;

  // Field array for exercises
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "exercises",
  });

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
      const userId = auth.currentUser?.uid;

      // Check if user is logged in
      if (!userId) {
        console.error("User not authenticated");
        return;
      }

      const workoutData = {
        workoutName: data.workoutName,
        userId: userId,
        date: new Date().toISOString(),
        exercises: data.exercises,
        notes: data.workoutNotes,
      };
      await addWorkout(workoutData);
      navigate("/");
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
      <div className="h-svh p-10">
        <form onSubmit={handleSubmit(onSaveWorkout)}>
          <FormInput
            id="workoutName"
            name="workoutName"
            label="Workout name"
            type="text"
            placeholder="Enter a workout name..."
          />
          <div className="space-y-4">
            {fields.map((exercise, index) => {
              return (
                <ExerciseForm
                  key={exercise.id}
                  index={index}
                  onRemoveExercise={onRemoveExercise}
                />
              );
            })}
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onAddExercise();
            }}
          >
            Add exercise
          </Button>
          <div>
            <FormInput
              id="workoutNotes"
              name="workoutNotes"
              label="Notes"
              type="textarea"
              placeholder="Add some notes..."
            />
          </div>
          <Button>
            {formState.isSubmitting ? "Saving..." : "Save workout"}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};
