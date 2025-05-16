import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { type User } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    !!auth.currentUser
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsAuthenticated(!!authUser);
    });

    return () => unsubscribe();
  }, []);

  return { user, isAuthenticated };
};
