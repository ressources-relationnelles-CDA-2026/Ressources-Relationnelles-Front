import { apiFetch } from "../apiFetch";

export async function getLogout(): Promise<boolean> {
  try {
    const response = await apiFetch("/api/logout", {
      method: "POST",
    });

    return response.ok;
  } catch {
    return false;
  }
}
