import { act, renderHook, waitFor } from "@testing-library/react";

import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/services/apiFetch";

jest.mock("@/services/apiFetch", () => ({
  apiFetch: jest.fn(),
}));

const mockedApiFetch = jest.mocked(apiFetch);

function createResponse(
   ok: boolean,
  data: unknown = null,
): Response {
  return {
    ok,
    json: jest.fn().mockResolvedValue(data),
  } as unknown as Response;
}

describe("useAuth", () => {
  beforeEach(() => {
    mockedApiFetch.mockReset();
  });

  it("charge l’utilisateur puis détecte la déconnexion", async () => {
    mockedApiFetch.mockResolvedValueOnce(
      createResponse(true, {
        id: 12,
        email: "celeste@example.com",
        pseudo: "Celeste",
        nom: "Test",
        prenom: "Celeste",
        telephone: "0612345678",
        roles: ["ROLE_ADMIN"],
      }),
    );

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isAuth).toBe(true);
    });

    expect(result.current.userId).toBe(12);
    expect(result.current.userName).toBe("Celeste");
    expect(result.current.isAdmin).toBe(true);
    expect(result.current.isModo).toBe(true);

    mockedApiFetch.mockResolvedValueOnce(
      createResponse(false),
    );

    act(() => {
      window.dispatchEvent(new Event("auth-change"));
    });

    await waitFor(() => {
      expect(result.current.isAuth).toBe(false);
    });

    expect(result.current.userId).toBeNull();
    expect(result.current.userName).toBeNull();
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isModo).toBe(false);
  });
});