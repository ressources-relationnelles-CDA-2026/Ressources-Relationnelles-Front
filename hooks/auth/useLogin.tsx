import { useState } from "react";
import getLogin from "@/services/auth/getLogin";
import { User } from "@/types/database/users";
import { Token } from "@/types/database/tokens";

type LoginData = {
  token: Token;
  user: User;
};

type FormData = {
  email: string;
  password: string;
};

export function useLogin() {
  const [data, setData] = useState<LoginData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getLogin(
        formData.email,
        formData.password
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

  return { data, loading, error, loginUser };
}