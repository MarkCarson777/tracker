import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { type User } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsAuthenticated(!!authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isAuthenticated, loading };
};
