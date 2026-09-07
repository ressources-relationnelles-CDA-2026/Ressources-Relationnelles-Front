import { User } from "@/types/database/users";
import { apiFetch } from "../apiFetch";

type Collection<T> = {
  member?: T[];
  "hydra:member"?: T[];
};

export default async function getUtilisateurs(): Promise<User[]> {
  const res = await apiFetch("/api/utilisateurs/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: Collection<User> = await res.json();
  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}
