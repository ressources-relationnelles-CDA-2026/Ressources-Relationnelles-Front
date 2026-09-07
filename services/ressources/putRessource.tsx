import { Ressource } from "@/types/database/ressources";
import { apiFetch } from "../apiFetch";

export default async function putRessource(
  id: string,
  titre: string,
  contenu: string,
  valide: boolean,
  date_creation: string,
  visibilite: string,
  utilisateur: number,
  categorie: string,
  tags: string[],
): Promise<Ressource> {
  const res = await apiFetch(`/api/ressources/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      titre,
      contenu,
      valide,
      date_creation,
      visibilite,
      utilisateur,
      categorie,
      tags,
    }),
  });

  const data: Ressource = await res.json();

  return data;
}
