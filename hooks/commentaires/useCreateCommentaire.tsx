import { useState } from "react";
import createCommentaireService from "@/services/commentaires/createCommentaire";
import { Commentaire } from "@/types/database/commentaires";

type FormData = {
  contenu: string;
  dateCreation: string;
  utilisateur: string;
  resource: string;
  commentaireParent: string | null;
};

export function useCreateCommentaire() {
  const [data, setData] = useState<Commentaire | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCommentaire = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createCommentaireService(
        formData.contenu,
        formData.dateCreation,
        formData.utilisateur,
        formData.resource,
        formData.commentaireParent
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

  return { data, loading, error, createCommentaire };
}