import { LogWorkoutPage } from "./pages/LogWorkoutPage";
import { HomePage } from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/logWorkout" element={<LogWorkoutPage />} />
    </Routes>
  );
}
