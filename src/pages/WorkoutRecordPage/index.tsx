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

  if (isLoading) {
    return <div>Loading workout...</div>;
  }

  if (isError) {
    return <div>Error fetching workout: {error.message}</div>;
  }

  return (
    <div>
      <h2>Workout Record</h2>
      <div>
        <h3>{workout?.workoutName}</h3>
        <div>
          {workout?.exercises.map((exercise, index) => {
            return (
              <div key={index}>
                <h4>{exercise.name}</h4>
                <p>Type: {exercise.type}</p>
                {exercise.type === "weights" && (
                  <div>
                    {exercise.sets.map((set, setIndex) => {
                      return (
                        <div key={setIndex}>
                          <div className="flex flex-col">
                            <span>Set {setIndex + 1}</span>
                            <span>Weight: {set.weight}</span>
                            <span>Reps: {set.reps}</span>
                            <span>RPE: {set.failure}</span>
                            <span>Rest: {set.restTime}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p>Notes: {workout?.workoutNotes}</p>
      </div>
    </div>
  );
};

export { WorkoutRecordPage };
