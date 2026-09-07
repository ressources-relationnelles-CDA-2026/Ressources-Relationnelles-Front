import { useState } from "react";

import { Adorer } from "@/types/database/adorers";
import createAdorer, { CreateAdorerPayload } from "@/services/adorers/createAdores";

export function useCreateAdorer() {
  const [data, setData] = useState<Adorer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (formData: CreateAdorerPayload) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createAdorer(formData);

      setData(result);

      return result;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    createAdorer: create,
  };
}