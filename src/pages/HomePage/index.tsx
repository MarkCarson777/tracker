import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function HomePage() {
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
      <Link to="/signIn">Go to sign in</Link>
      <Link to="/logWorkout">Go to log workout</Link>
    </div>
  );
}
