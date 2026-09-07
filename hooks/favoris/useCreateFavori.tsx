import { useState } from "react";

import { Favori } from "@/types/database/favoris";
import createFavori, { CreateFavoriPayload } from "@/services/favoris/createFavoris";

export function useCreateFavori() {
  const [data, setData] = useState<Favori | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (formData: CreateFavoriPayload) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createFavori(formData);

      setData(result);

      return result;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    createFavori: create,
  };
}