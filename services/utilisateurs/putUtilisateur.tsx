import { User } from "@/types/database/users";
import { apiFetch } from "../apiFetch";

export default async function putUtilisateur(
  id: string,
  nom: string,
  prenom: string,
  telephone: string,
  email: string,
  pseudo: string,
  photoProfil: string,
  statusCompte: boolean,
  dateCreation: string,
  role: string,
  plainPassword: string
): Promise<User> {
  const res = await apiFetch(`/api/utilisateurs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      nom,
      prenom,
      telephone,
      email,
      pseudo,
      photoProfil,
      statusCompte,
      dateCreation,
      role,
      plainPassword
    }),
  });

  const data: User = await res.json();

  return data;
}
