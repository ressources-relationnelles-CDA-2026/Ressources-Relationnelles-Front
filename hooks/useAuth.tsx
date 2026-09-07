import { useEffect, useState } from "react";
import { apiFetch } from "@/services/apiFetch";

interface User {
  id: number;
  email: string;
  pseudo: string;
  nom: string;
  prenom: string;
  telephone: string;
  roles: string[];
}

export function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModo, setIsModo] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const syncAuth = async () => {
    try {
      const response = await apiFetch("/api/me");

      if (!response.ok) {
        setIsAuth(false);
        setIsAdmin(false);
        setIsModo(false);
        setUserName(null);
        setUserId(null);
        return;
      }

      const user: User = await response.json();

      setIsAuth(true);
      setIsAdmin(user.roles.includes("ROLE_ADMIN"));
      setIsModo(
        user.roles.includes("ROLE_MODERATEUR") ||
        user.roles.includes("ROLE_ADMIN")
      );
      setUserName(user.pseudo);
      setUserId(user.id);
    } catch {
      setIsAuth(false);
      setIsAdmin(false);
      setIsModo(false);
      setUserName(null);
      setUserId(null);
    }
  };

  useEffect(() => {
  const initialSync = window.setTimeout(() => {
    void syncAuth();
  }, 0);

  window.addEventListener("auth-change", syncAuth);

  return () => {
    window.clearTimeout(initialSync);
    window.removeEventListener("auth-change", syncAuth);
  };
}, []);

  return {
    isAuth,
    isAdmin,
    isModo,
    userName,
    userId,
  };
}