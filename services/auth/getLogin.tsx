import { User } from "@/types/database/users";
import { Token } from "@/types/database/tokens";
import { apiFetch } from "../apiFetch";

type LoginData = {
  token: Token;
  user: User;
};

type ApiResponse = {
  data: LoginData;
};

export default async function getLogin(
  email: string,
  password: string
): Promise<LoginData> {
  const res = await apiFetch("/api/login_check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Email ou mot de passe incorrect");
    }
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: ApiResponse = await res.json();

  return data.data;
}
