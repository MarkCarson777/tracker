// React
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Hooks
import { useAuth } from "./hooks/useAuth";
// Routing
import { Navigate, Route, Routes } from "react-router-dom";
// Pages
import { WorkoutsPage } from "./pages/WorkoutsPage";
import { LogWorkoutPage } from "./pages/LogWorkoutPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";

const queryClient = new QueryClient();

export function App() {
  const { isAuthenticated } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<WorkoutsPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/log-workout"
          element={
            isAuthenticated ? <LogWorkoutPage /> : <Navigate to="/sign-in" />
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}
