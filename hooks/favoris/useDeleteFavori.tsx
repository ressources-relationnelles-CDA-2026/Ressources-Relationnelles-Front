import deleteFavoriAPI from "@/services/favoris/deleteFavoris";
import { useState } from "react";


export function useDeleteFavori() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteFavori = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteFavoriAPI(id);

      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    deleteFavori,
  };
}