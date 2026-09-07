import { apiFetch } from "../apiFetch";

export default async function deleteRessource(id: number | null): Promise<void> {
   await apiFetch(`/api/ressources/${id}`, {
    method: "DELETE",
  });
}