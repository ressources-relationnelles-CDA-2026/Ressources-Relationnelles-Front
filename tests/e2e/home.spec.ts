import { test, expect } from "@playwright/test";

test("la page d’accueil permet d’accéder à la connexion", async ({
  page,
}) => {
  const response = await page.goto("/", {
    waitUntil: "domcontentloaded",
  });


  expect(response).not.toBeNull();
  expect(response?.ok()).toBe(true);

  await expect(
    page.getByRole("heading", {
      name: "Ressources Relationnelles",
    }),
  ).toBeVisible();

  const loginLink = page.getByRole("link", {
    name: "Se connecter",
  });

  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await expect(page).toHaveURL(/\/login$/);

  await expect(
    page.getByRole("heading", { name: "Connexion" }),
  ).toBeVisible();

  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Mot de passe")).toBeVisible();
});

test("les en-têtes HTTP de sécurité sont présents", async ({ page }) => {
  const response = await page.goto("/");

  expect(response).not.toBeNull();
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response?.headers()["x-frame-options"]).toBe("DENY");
  expect(response?.headers()["referrer-policy"]).toBe(
    "strict-origin-when-cross-origin",
  );
  expect(response?.headers()["permissions-policy"]).toContain(
    "camera=()",
  );
  expect(response?.headers()["content-security-policy"]).toContain(
    "default-src 'self'",
  );
});