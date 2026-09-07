import { User } from "@/types/database/users";
import { apiFetch } from "@/services/apiFetch";

type RegisterData = {
  message: string;
  user: User;
};

type ApiResponse = RegisterData;

export default async function getRegister(
  email: string,
  password: string,
  nom: string,
  prenom: string,
  telephone: string,
  pseudo: string,
): Promise<RegisterData> {
  const res = await apiFetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      nom,
      prenom,
      telephone,
      pseudo,
    }),
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: ApiResponse = await res.json();

  return data;
}
