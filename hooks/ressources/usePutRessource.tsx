import { useState } from "react";
import putRessourceService from "@/services/ressources/putRessource";
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

export function usePutRessource(id: string) {
  const [data, setData] = useState<Ressource | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const putRessource = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await putRessourceService(
        id,
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

  return { data, loading, error, putRessource };
}
