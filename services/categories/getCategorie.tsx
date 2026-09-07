import { Categorie } from "@/types/database/categories";
import { apiFetch } from "../apiFetch";

export default async function getCategorie(
  id: string
): Promise<Categorie> {
  const res = await apiFetch(`/api/categories/${id}`);

  const data: Categorie = await res.json();

  return data;
}