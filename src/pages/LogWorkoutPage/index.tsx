import { Button } from "../../components/Button";

export function LogWorkoutPage() {
  return (
    <div>
      <p>Log Workout</p>
      <Button onClick={() => console.log("addWorkout")}>Add exercise</Button>
    </div>
  );
}
