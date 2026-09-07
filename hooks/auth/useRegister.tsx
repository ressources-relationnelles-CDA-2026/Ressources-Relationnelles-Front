import { useState } from "react";
import getRegister from "@/services/auth/getRegister";
import { User } from "@/types/database/users";

type RegisterData = {
  message: string;
  user: User;
};

type FormData = {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  telephone: string;
  pseudo: string;
};

export function useRegister() {
  const [data, setData] = useState<RegisterData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getRegister(
        formData.email,
        formData.password,
        formData.nom,
        formData.prenom,
        formData.telephone,
        formData.pseudo,
      );

      setData(result);

      return result;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, registerUser };
}
