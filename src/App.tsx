import { AddWorkoutPage } from "./pages/AddWorkoutPage";
import { HomePage } from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addWorkout" element={<AddWorkoutPage />} />
    </Routes>
  );
}
