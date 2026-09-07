import { apiFetch } from "../apiFetch";

export default async function deleteAdorerAPI(id: number): Promise<void> {
  const res = await apiFetch(`/api/adorers/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}