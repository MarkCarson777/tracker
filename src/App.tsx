// Routing
import { Route, Routes } from "react-router-dom";
// Pages
import { HomePage } from "./pages/HomePage";
import { LogWorkoutPage } from "./pages/LogWorkoutPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/logWorkout" element={<LogWorkoutPage />} />
    </Routes>
  );
}
