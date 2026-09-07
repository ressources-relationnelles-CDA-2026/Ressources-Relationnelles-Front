import { Ami } from "@/types/database/amis";
import { apiFetch } from "../apiFetch";

type Collection<T> = {
  member?: T[];
  "hydra:member"?: T[];
};

export default async function getAmis(): Promise<Ami[]> {
 const res = await apiFetch("/api/amis/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: Collection<Ami> = await res.json();

  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}