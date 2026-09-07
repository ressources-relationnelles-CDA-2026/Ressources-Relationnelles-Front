import { Message } from "@/types/database/message";
import { apiFetch } from "../apiFetch";


export default async function getMessages(): Promise<Message[]> {
 const res = await apiFetch("/api/messages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return Array.isArray(data) ? data : data.member ?? data["hydra:member"] ?? [];
}