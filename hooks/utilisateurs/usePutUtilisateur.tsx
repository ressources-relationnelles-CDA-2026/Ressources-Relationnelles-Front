import { useState } from "react";
import putUtilisateurService from "@/services/utilisateurs/putUtilisateur";
import { User } from "@/types/database/users";

type FormData = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  pseudo: string;
  photoProfil: string;
  statusCompte: boolean;
  dateCreation: string;
  role: string;
  plainPassword: string;
};

export function usePutUtilisateur(id: string) {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const putUtilisateur = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await putUtilisateurService(
        id,
        formData.nom,
        formData.prenom,
        formData.telephone,
        formData.email,
        formData.pseudo,
        formData.photoProfil,
        formData.statusCompte,
        formData.dateCreation,
        formData.role,
        formData.plainPassword,
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

  return { data, loading, error, putUtilisateur };
}
