import { User } from "@/types/database/users";
import { apiFetch } from "../apiFetch";

export default async function getUtilisateur(id: string): Promise<User> {
  const res = await apiFetch(`/api/utilisateurs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: User = await res.json();

  return data;
}
