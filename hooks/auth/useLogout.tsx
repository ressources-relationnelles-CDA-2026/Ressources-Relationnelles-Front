import { useState } from "react";
import { getLogout } from "@/services/auth/getLogout";

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogout() {
    setLoading(true);
    setError(null);

    const success = await getLogout();

    if (!success) {
      setError("Une erreur est survenue lors de la déconnexion.");
    }

    setLoading(false);

    return success;
  }

  return {
    error,
    loading,
    logout: handleLogout,
  };
}
