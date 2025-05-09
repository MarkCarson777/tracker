import { type Style } from "../../types/props";
import { type Exercise, type Set } from "../../types/workout";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import { Input } from "../Input";

interface Props extends Style {
  // The exercise object that contains the details of the exercise
  exercise: Exercise;
  // The index of the exercise in the list
  index: number;
  // Function to update the exercise in the parent component
  onUpdateExercise: (index: number, updatedExercise: Exercise) => void;
  // Function to remove the exercise from the parent component
  onRemoveExercise: (index: number) => void;
}

const ExerciseForm: React.FC<Props> = ({
  exercise,
  index,
  onUpdateExercise,
  onRemoveExercise,
  className,
}) => {
  // Handle Input changes for the exercise form
  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target;
    let updatedValue;

    // Handle the case where the Input is a checkbox
    if (type === "checkbox" && event.target instanceof HTMLInputElement) {
      updatedValue = event.target.checked;
    } else {
      updatedValue = value;
    }

    // Update the exercise object with the new value using the name of the Input
    onUpdateExercise(index, { ...exercise, [name]: updatedValue });
  };

  // Handle adding sets for weights exercises
  const onAddSet = () => {
    if (exercise.type === "weights") {
      // Create a new set object with default values
      const newSet: Set = {
        reps: 0,
        weight: 0,
        restTime: 0,
        failure: false,
      };

      // Update the exercise object with the new set
      const updatedExercise = {
        ...exercise,
        sets: [...exercise.sets, newSet],
      };

      // Call the onUpdateExercise function to update the exercise in the parent component
      onUpdateExercise(index, updatedExercise);
    }
  };

  // Handle removing sets for weights exercises
  const onRemoveSet = () => {
    if (exercise.type === "weights" && exercise.sets.length > 1) {
      // Remove the last set from the sets array
      const updatedExercise = {
        ...exercise,
        sets: exercise.sets.slice(0, -1),
      };

      // Call the onUpdateExercise function to update the exercise in the parent component
      onUpdateExercise(index, updatedExercise);
    }
  };

  // Handle updating individual sets for weights exercises
  const onUpdateSet = (
    setIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (exercise.type === "weights") {
      // Get the name, value, type, and checked properties from the event target
      const { name, value, type, checked } = event.target;
      // Create a new value based on the type of Input
      const newValue = type === "checkbox" ? checked : value;
      // Update the set object with the new value using the name of the Input
      const newSets = exercise.sets.map((set: Set, i: number) =>
        i === setIndex ? { ...set, [name]: newValue } : set
      );

      // Call the onUpdateExercise function to update the exercise in the parent component
      onUpdateExercise(index, { ...exercise, sets: newSets });
    }
  };

  return (
    <div
      className={cn("bg-blue-200 border border-red-500 p-3 rounded", className)}
    >
      <div className="flex flex-col">
        <label htmlFor={`exerciseName-${index}`}>Name</label>
        <Input
          id={`exerciseName-${index}`}
          name="name"
          value={exercise.name}
          className="border"
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor={`type-${index}`}>Type</label>
        <select
          id={`type-${index}`}
          name="type"
          className="border"
          value={exercise.type}
          onChange={onChange}
        >
          <option value="weights">Weights</option>
          <option value="cardio">Cardio</option>
        </select>
      </div>
      {exercise.type === "weights" && (
        <div>
          {exercise.sets.map((set, setIndex) => {
            return (
              <div key={setIndex} className="flex">
                <div className="flex flex-col">
                  <label htmlFor={`weight-${index}`}>Weight</label>
                  <Input
                    id={`weight-${index}`}
                    type="number"
                    className="border"
                    name="weight"
                    value={String(set.weight)}
                    onChange={(e) => onUpdateSet(setIndex, e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`reps-${index}`}>Reps</label>
                  <Input
                    id={`reps-${index}`}
                    type="number"
                    className="border"
                    name="reps"
                    value={set.reps}
                    onChange={(e) => onUpdateSet(setIndex, e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`restTime-${index}`}>Rest Time</label>
                  <Input
                    id={`restTime-${index}`}
                    type="number"
                    className="border"
                    name="restTime"
                    value={set.restTime}
                    onChange={(e) => onUpdateSet(setIndex, e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`failure-${index}`}>Failure</label>
                  <Input
                    id={`failure-${index}`}
                    type="checkbox"
                    name="failure"
                    checked={set.failure || false}
                    onChange={(e) => onUpdateSet(setIndex, e)}
                  />
                </div>
              </div>
            );
          })}
          {exercise.sets.length > 1 && (
            <Button onClick={onRemoveSet}>Remove</Button>
          )}
          {exercise.sets.length < 6 && (
            <Button onClick={onAddSet}>Add Set</Button>
          )}
        </div>
      )}
      {exercise.type === "cardio" && (
        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor={`distance-${index}`}>Distance</label>
            <Input
              id={`distance-${index}`}
              type="number"
              className="border"
              name="distance"
              value={exercise.distance || 0}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`duration-${index}`}>Duration</label>
            <Input
              id={`duration-${index}`}
              type="number"
              className="border"
              name="duration"
              value={exercise.duration || 0}
              onChange={onChange}
            />
          </div>
        </div>
      )}
      <Button onClick={() => onRemoveExercise(index)}>Remove Exercise</Button>
    </div>
  );
};

export { ExerciseForm };
