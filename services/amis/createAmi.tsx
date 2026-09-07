import { Ami } from "@/types/database/amis";
import { apiFetch } from "../apiFetch";

export type CreateAmiPayload = {
  statut: string;
  dateAction: string;
  demandeur: number;
  ami: number;
};



export default async function createAmi(
  payload: CreateAmiPayload
): Promise<Ami> {
  const res = await apiFetch("/api/amis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return await res.json();
}