import { getCsrfToken } from "./csrf";
import { ApiError } from "./apiError";

const METHODS_REQUIRING_CSRF = ["POST", "PUT", "DELETE"];

export async function apiFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const method = (init.method ?? "GET").toUpperCase();

  const headers = new Headers(init.headers);

  if (METHODS_REQUIRING_CSRF.includes(method)) {
    const csrfToken = await getCsrfToken();

    headers.set("csrf-token", csrfToken);
  }

  try {
    const response = await fetch(input, {
      ...init,
      headers,
      credentials: "include",
    });

    if (response.ok) {
      return response;
    }

    let message = "";
    let violations:
      | {
          propertyPath: string;
          message: string;
        }[]
      | undefined;

    try {
      const data = await response.clone().json();

      if (Array.isArray(data?.violations)) {
        message = data.violations
          .map((violation: { message?: string }) => violation.message)
          .filter(Boolean)
          .join("\n");
      } else {
        message =
          data?.message ??
          data?.detail ??
          data?.["hydra:description"] ??
          `Une erreur est survenue (${response.status}).`;
      }

      violations = data?.violations;
    } catch {
      message = `Une erreur est survenue (${response.status}).`;
    }

    throw new ApiError(message, response.status, violations);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Une erreur réseau est survenue.");
  }
}
