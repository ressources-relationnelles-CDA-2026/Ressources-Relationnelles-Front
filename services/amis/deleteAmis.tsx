import { apiFetch } from "../apiFetch";


export default async function deleteAmiAPI(id: number): Promise<void> {
  const res = await apiFetch(`/api/amis/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}