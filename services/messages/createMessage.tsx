import { Message } from "@/types/database/message";
import { apiFetch } from "../apiFetch";

export type CreateMessagePayload = {
  contenu: string;
  pieceJointe?: string | null;
  dateEnvoie: string;
  id_expediteur: number;
  id_destinataire: number;
};

export default async function createMessage(
  payload: CreateMessagePayload
): Promise<Message> {

  const response = await apiFetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
     await response.text();

    throw new Error("Impossible d’envoyer le message.");
  }

  const data = await response.json();

  return data;
}