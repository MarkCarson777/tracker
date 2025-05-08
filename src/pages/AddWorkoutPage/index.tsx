import { Button } from "../../components/Button";

export function AddWorkoutPage() {
  return (
    <div>
      <p>Add Workout Page</p>
      <Button onClick={() => console.log("addWorkout")}>Save workout</Button>
    </div>
  );
}
