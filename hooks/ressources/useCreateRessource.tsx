import { useState } from "react";
import createRessourceService from "@/services/ressources/createRessource";
import { Ressource } from "@/types/database/ressources";

type FormData = {
  titre: string;
  contenu: string;
  valide: boolean;
  date_creation: string;
  visibilite: string;
  utilisateur: number;
  categorie: string;
  tags: string[];
};

export function useCreateRessource() {
  const [data, setData] = useState<Ressource | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRessource = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createRessourceService(
        formData.titre,
        formData.contenu,
        formData.valide,
        formData.date_creation,
        formData.visibilite,
        formData.utilisateur,
        formData.categorie,
        formData.tags,
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

  return { data, loading, error, createRessource };
}
