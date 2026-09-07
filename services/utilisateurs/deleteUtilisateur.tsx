import { apiFetch } from "../apiFetch";

export default async function deleteUtilisateur(id: number | null): Promise<void> {
  await apiFetch(`/api/utilisateurs/${id}`, {
    method: "DELETE",
  });
}