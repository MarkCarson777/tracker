import { useQuery } from "@tanstack/react-query";
import { useCounterStore } from "../../store";
import { Link } from "react-router-dom";

export function HomePage() {
  // Zustand store
  const { count, increment, decrement } = useCounterStore();

  // React Query fetch
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      return response.json();
    },
  });

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      {/* React Query Data */}
      <h1>Data (React Query)</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {(error as Error).message}</p>}
      {data && (
        <div>
          <p>Title: {data.title}</p>
          <p>Completed: {data.completed ? "Yes" : "No"}</p>
        </div>
      )}
      {/* React Router Test */}
      <Link to="/addWorkout">Go to add workout</Link>
    </div>
  );
}
