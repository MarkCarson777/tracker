// Routing
import { Navigate, Route, Routes } from "react-router-dom";
// Pages
import { HomePage } from "./pages/HomePage";
import { LogWorkoutPage } from "./pages/LogWorkoutPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { useEffect, useState } from "react";
import { auth } from "./firebase"; // Adjust the import path as necessary
import { onAuthStateChanged } from "firebase/auth";

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/log-workout"
        element={
          isAuthenticated ? <LogWorkoutPage /> : <Navigate to="/sign-in" />
        }
      />
    </Routes>
  );
}
