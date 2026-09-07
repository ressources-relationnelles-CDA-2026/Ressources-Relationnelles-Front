import { useState } from "react";
import putCategorieService from "@/services/categories/putCategorie";
import { Categorie } from "@/types/database/categories";

type FormData = {
  libelle: string;
  couleur: string;
};

export function usePutCategorie(id: string) {
  const [data, setData] = useState<Categorie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const putCategorie = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await putCategorieService(
        id,
        formData.libelle,
        formData.couleur,
      );

      setData(result);

      return result;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, putCategorie };
}
