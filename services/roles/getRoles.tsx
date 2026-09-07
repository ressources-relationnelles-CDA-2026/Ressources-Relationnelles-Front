import { Role } from "@/types/database/roles";
import { apiFetch } from "../apiFetch";

type Collection<T> = {
  member?: T[];
  "hydra:member"?: T[];
};

export default async function getRoles(): Promise<Role[]> {
  const res = await apiFetch("/api/roles_utilisateurs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: Collection<Role> = await res.json();
  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}
