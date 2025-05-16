import { useParams } from "react-router-dom";
import { getUserWorkout } from "../../services/workoutService";
import { useQuery } from "@tanstack/react-query";

const WorkoutRecordPage: React.FC = () => {
  const { workoutId } = useParams();
  const {
    data: workout,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["workoutRecord"],
    queryFn: () => getUserWorkout(workoutId ? workoutId : ""),
  });

  console.log("data", workout);

  if (isLoading) {
    return <div>Loading workout...</div>;
  }

  if (isError) {
    return <div>Error fetching workout: {error.message}</div>;
  }

  return <div>WorkoutRecordPage</div>;
};

export { WorkoutRecordPage };
