// Components
import { Button } from "../Button";
import { FormInput } from "../FormInput";
import { IconButton } from "../IconButton";
// Forms
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
// Types
import { type Style } from "../../types/props";
// Utilities
import { cn } from "../../utils/cn";

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
        "border-2 border-blue-500 p-3 rounded flex flex-col",
        className
      )}
    >
      <IconButton
        className="self-end"
        icon="Close"
        size={10}
        onClick={() => onRemoveExercise(index)}
      />
      <FormInput
        type="text"
        label="Name"
        id={`exerciseName-${index}`}
        name={`exercises.${index}.name`}
        placeholder="Enter an exercise name..."
      />
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
          {fields.map((set, setIndex) => {
            return (
              <div key={set.id}>
                <div className="flex space-x-2">
                  <FormInput
                    type="number"
                    label="Weight"
                    id={`weight-${index}`}
                    name={`exercises.${index}.sets.${setIndex}.weight`}
                    placeholder="Weight"
                  />
                  <FormInput
                    type="number"
                    label="Reps"
                    id={`reps-${index}`}
                    name={`exercises.${index}.sets.${setIndex}.reps`}
                    placeholder="Reps"
                  />
                  <FormInput
                    type="number"
                    label="Rest time"
                    id={`restTime-${index}`}
                    name={`exercises.${index}.sets.${setIndex}.restTime`}
                    placeholder="Rest"
                  />
                  <FormInput
                    type="checkbox"
                    label="Failure"
                    id={`failure-${index}`}
                    name={`exercises.${index}.sets.${setIndex}.failure`}
                  />
                  {fields.length > 1 && (
                    <IconButton
                      className="self-end"
                      icon="Close"
                      size={10}
                      onClick={(e) => {
                        e.preventDefault();
                        remove(setIndex);
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
          {fields.length < 6 && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                append({
                  reps: "",
                  weight: "",
                  restTime: "",
                  failure: false,
                });
              }}
            >
              Add set
            </Button>
          )}
        </div>
      )}
      {exerciseType === "cardio" && (
        <div className="flex space-x-2">
          <FormInput
            type="number"
            label="Distance"
            id={`distance-${index}`}
            name={`exercises.${index}.distance`}
          />
          <FormInput
            type="number"
            label="Duration"
            id={`duration-${index}`}
            name={`exercises.${index}.duration`}
          />
        </div>
      )}
    </div>
  );
};

export { ExerciseForm };
