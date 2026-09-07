import { apiFetch } from "@/services/apiFetch";
import { ApiError } from "@/services/apiError";
import { getCsrfToken } from "@/services/csrf";

jest.mock("@/services/csrf", () => ({
  getCsrfToken: jest.fn(),
}));

const mockedGetCsrfToken = jest.mocked(getCsrfToken);
const mockedFetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("apiFetch", () => {
  beforeEach(() => {
    mockedFetch.mockReset();
    mockedGetCsrfToken.mockReset();
    global.fetch = mockedFetch;
  });

  it("ajoute le token CSRF et les cookies pour une requête POST", async () => {
    const response = {
      ok: true,
      status: 201,
    } as Response;

    mockedGetCsrfToken.mockResolvedValue("token-securise");
    mockedFetch.mockResolvedValue(response);

    const result = await apiFetch("/api/ressources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titre: "Test" }),
    });

    expect(mockedGetCsrfToken).toHaveBeenCalledTimes(1);
    expect(result).toBe(response);

    const requestOptions = mockedFetch.mock.calls[0][1];
    const headers = new Headers(requestOptions?.headers);

    expect(requestOptions?.credentials).toBe("include");
    expect(headers.get("csrf-token")).toBe("token-securise");
  });

  it("ne demande pas de token CSRF pour une requête GET", async () => {
    const response = {
      ok: true,
      status: 200,
    } as Response;

    mockedFetch.mockResolvedValue(response);

    await apiFetch("/api/ressources");

    expect(mockedGetCsrfToken).not.toHaveBeenCalled();
    expect(mockedFetch).toHaveBeenCalledWith(
      "/api/ressources",
      expect.objectContaining({
        credentials: "include",
      }),
    );
  });

  it("transforme les violations de l’API en ApiError", async () => {
    const violations = [
      {
        propertyPath: "titre",
        message: "Le titre est obligatoire.",
      },
      {
        propertyPath: "contenu",
        message: "Le contenu est obligatoire.",
      },
    ];

    const response = {
      ok: false,
      status: 422,
      clone: () => ({
        json: async () => ({ violations }),
      }),
    } as unknown as Response;

    mockedGetCsrfToken.mockResolvedValue("token-securise");
    mockedFetch.mockResolvedValue(response);

    const request = apiFetch("/api/ressources", {
      method: "POST",
    });

    await expect(request).rejects.toEqual(
      expect.objectContaining({
        name: "ApiError",
        status: 422,
        message:
          "Le titre est obligatoire.\nLe contenu est obligatoire.",
        violations,
      } satisfies Partial<ApiError>),
    );
  });
});