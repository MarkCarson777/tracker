import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { signOut } from "../../services/authService";

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
      <Button onClick={() => signOut()}>Sign out</Button>
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
      <Link to="/sign-in">Go to sign in</Link>
      <Link to="/log-workout">Go to log workout</Link>
    </div>
  );
}
