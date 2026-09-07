import { useState } from "react";
import deleteUtilisateurService from "@/services/utilisateurs/deleteUtilisateur";

export function useDeleteUtilisateur(id: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUtilisateur = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteUtilisateurService(id);
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUtilisateur, loading, error };
}