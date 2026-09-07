import { Categorie } from "@/types/database/categories";
import { apiFetch } from "../apiFetch";

export default async function putCategorie(
  id: string,
  libelle: string,
  couleur: string,
): Promise<Categorie> {
  const res = await apiFetch(`/api/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      libelle,
      couleur,
    }),
  });

  const data: Categorie = await res.json();

  return data;
}
