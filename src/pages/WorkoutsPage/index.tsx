// Components
import { Button } from "../../components/Button";
// Firebase
import { getUserWorkouts } from "../../services/workoutService";
import { signOut } from "../../services/authService";
// Hooks
import { useAuth } from "../../hooks/useAuth";
// React Query
import { useQuery } from "@tanstack/react-query";
// Routing
import { Link, useNavigate } from "react-router-dom";
// Types
import type { Workout } from "../../schemas/workoutSchema";

const WorkoutsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    data: workouts,
    isLoading,
    isError,
    error,
  } = useQuery<Workout[], Error>({
    queryKey: ["workouts", user?.uid],
    queryFn: () => getUserWorkouts(user?.uid),
    enabled: !!user?.uid,
  });

  if (isLoading) {
    return <div>Loading workouts...</div>;
  }

  if (isError) {
    return <div>Error fetching workouts: {error.message}</div>;
  }

  if (!workouts || workouts.length === 0) {
    return (
      <>
        <Button
          variant="primary"
          onClick={() => {
            signOut();
            navigate("/sign-in");
          }}
        >
          Sign out
        </Button>
        <div>No workouts logged yet.</div>
        <Link to="/log-workout">Go to log workout</Link>
      </>
    );
  }

  return (
    <div>
      <Button onClick={() => signOut()}>Sign out</Button>
      <div>
        <h2>Your Workouts</h2>
        <ul>
          {workouts.map((workout) => (
            <Link to={`/workout-record/${workout.id}`} key={workout.id}>
              {workout.workoutName}
            </Link>
          ))}
        </ul>
      </div>
      <Link to="/log-workout">Go to log workout</Link>
    </div>
  );
};

export { WorkoutsPage };
