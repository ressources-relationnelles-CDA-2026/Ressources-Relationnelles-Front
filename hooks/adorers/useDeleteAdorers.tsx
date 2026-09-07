import deleteAdorerAPI from "@/services/adorers/deleteAdores";
import { useState } from "react";
;

export function useDeleteAdorer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAdorer = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteAdorerAPI(id);

      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    deleteAdorer,
  };
}