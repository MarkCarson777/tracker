// Components
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { Input } from "../Input";
// Forms
import {
  useFieldArray,
  useFormContext,
  useWatch,
  // useFormState,
} from "react-hook-form";
// Styles
import { cn } from "../../utils/cn";
// Types
import { type Style } from "../../types/props";

interface Props extends Style {
  // The index of the exercise in the list
  index: number;
  // Function to remove the exercise from the LogWorkoutPage
  onRemoveExercise: (index: number) => void;
}

const ExerciseForm: React.FC<Props> = ({
  index,
  onRemoveExercise,
  className,
}) => {
  // Destructure form methods from useFormContext
  const { register, control } = useFormContext();

  // Get the form state to check for errors
  // const { errors } = useFormState();

  // Use useFieldArray to manage the sets for this exercise
  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });

  // Watch the type of exercise to conditionally render the form fields
  const exerciseType = useWatch({ name: `exercises.${index}.type` });

  return (
    <div
      className={cn(
        "bg-blue-200 border-4 border-blue-500 p-3 rounded flex flex-col",
        className
      )}
    >
      <IconButton
        className="self-end"
        icon="Close"
        size={10}
        onClick={() => onRemoveExercise(index)}
      />

      <div className="flex flex-col">
        <label htmlFor={`exerciseName-${index}`}>Name</label>
        <Input
          className="border"
          id={`exerciseName-${index}`}
          {...register(`exercises.${index}.name`)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor={`type-${index}`}>Type</label>
        <select
          className="border"
          id={`type-${index}`}
          {...register(`exercises.${index}.type`)}
        >
          <option value="weights">Weights</option>
          <option value="cardio">Cardio</option>
        </select>
      </div>
      {exerciseType === "weights" && (
        <div>
          {fields.map((_, setIndex) => {
            return (
              <div key={setIndex}>
                <div className="flex space-x-2">
                  <div className="flex flex-col">
                    <label htmlFor={`weight-${index}`}>Weight</label>
                    <Input
                      id={`weight-${index}`}
                      type="number"
                      {...register(
                        `exercises.${index}.sets.${setIndex}.weight`
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor={`reps-${index}`}>Reps</label>
                    <Input
                      id={`reps-${index}`}
                      type="number"
                      {...register(`exercises.${index}.sets.${setIndex}.reps`)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor={`restTime-${index}`}>Rest Time</label>
                    <Input
                      id={`restTime-${index}`}
                      type="number"
                      {...register(
                        `exercises.${index}.sets.${setIndex}.restTime`
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor={`failure-${index}`}>Failure</label>
                    <input
                      type="checkbox"
                      {...register(
                        `exercises.${index}.sets.${setIndex}.failure`
                      )}
                    />
                  </div>
                </div>
                {fields.length > 1 && (
                  <Button onClick={() => remove(setIndex)}>Remove</Button>
                )}
                {fields.length < 6 && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      append({
                        reps: 0,
                        weight: 0,
                        restTime: 0,
                        failure: false,
                      });
                    }}
                  >
                    Add set
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
      {exerciseType === "cardio" && (
        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor={`distance-${index}`}>Distance</label>
            <Input
              id={`distance-${index}`}
              type="number"
              {...register(`exercises.${index}.distance`)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`duration-${index}`}>Duration</label>
            <Input
              id={`duration-${index}`}
              type="number"
              {...register(`exercises.${index}.duration`)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { ExerciseForm };
