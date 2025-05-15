// Routing
import { Route, Routes } from "react-router-dom";
// Pages
import { HomePage } from "./pages/HomePage";
import { LogWorkoutPage } from "./pages/LogWorkoutPage";
import { SignInPage } from "./pages/SignInPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/logWorkout" element={<LogWorkoutPage />} />
    </Routes>
  );
}
