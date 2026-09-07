import { apiFetch } from "../apiFetch";
import { Favori } from "@/types/database/favoris";

export type CreateFavoriPayload = {
  utilisateur: string;
  resource: string;
};

export default async function createFavori(
  payload: CreateFavoriPayload
): Promise<Favori> {
  const res = await apiFetch("/api/favoris", {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify(payload),
  });

  return await res.json();
}