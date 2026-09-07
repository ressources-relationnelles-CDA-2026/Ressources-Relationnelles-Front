import { apiFetch } from "../apiFetch";

export default async function deleteCommentaire(id: number | null): Promise<void> {
  await apiFetch(`/api/commentaires/${id}`, {
    method: "DELETE",
  });
}