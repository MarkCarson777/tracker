// Components
import { AuthRoute } from "./components/AuthRoute";
// React
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Routing
import { Route, Routes } from "react-router-dom";
// Pages
import { WorkoutsPage } from "./pages/WorkoutsPage";
import { LogWorkoutPage } from "./pages/LogWorkoutPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { WorkoutRecordPage } from "./pages/WorkoutRecordPage";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<WorkoutsPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/log-workout"
          element={
            <AuthRoute>
              <LogWorkoutPage />
            </AuthRoute>
          }
        />
        <Route
          path="/workout-record/:workoutId"
          element={
            <AuthRoute>
              <WorkoutRecordPage />
            </AuthRoute>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}
