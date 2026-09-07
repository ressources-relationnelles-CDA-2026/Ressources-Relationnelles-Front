import { Ressource } from "@/types/database/ressources";
import { apiFetch } from "../apiFetch";

export default async function createRessource(
  titre: string,
  contenu: string,
  valide: boolean,
  date_creation: string,
  visibilite: string,
  utilisateur: number,
  categorie: string,
  tags: string[],
): Promise<Ressource> {
  const res = await apiFetch("/api/ressources", {
    method: "POST",
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
