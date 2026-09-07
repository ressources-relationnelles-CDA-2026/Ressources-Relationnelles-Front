let csrfToken: string | null = null;

export async function getCsrfToken(): Promise<string> {
  if (csrfToken) {
    return csrfToken;
  }

  const response = await fetch("/api/csrf-token", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer le token CSRF: ${response.status}`
    );
  }

  const data: { token: string } = await response.json();

  csrfToken = data.token;

  return csrfToken;
}