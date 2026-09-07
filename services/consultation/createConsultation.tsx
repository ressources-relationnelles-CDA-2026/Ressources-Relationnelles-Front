import { apiFetch } from "../apiFetch";
import { Consultation } from "@/types/database/consultations";

export type CreateConsultationPayload = {
  utilisateur: string | null;
  resource: string;
};

export default async function createConsultation(
  payload: CreateConsultationPayload
): Promise<Consultation> {
  const res = await apiFetch("/api/consultations", {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify(payload),
  });

  return await res.json();
}