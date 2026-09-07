import { useState } from "react";
import createCategorieService from "@/services/categories/createCategorie";
import { Categorie } from "@/types/database/categories";

type FormData = {
  libelle: string;
  couleur: string;
};

export function useCreateCategorie() {
  const [data, setData] = useState<Categorie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategorie = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createCategorieService(
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

  return { data, loading, error, createCategorie };
}