import { Commentaire } from "@/types/database/commentaires";
import { apiFetch } from "../apiFetch";

export default async function createCommentaire(
  contenu: string,
  dateCreation: string,
  utilisateur: string,
  resource: string,
  commentaireParent: string | null
): Promise<Commentaire> {
  const res = await apiFetch("/api/commentaires", {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      contenu,
      dateCreation,
      utilisateur,
      resource,
      commentaireParent
    }),
  });

  const data: Commentaire = await res.json();

  return data;
}
