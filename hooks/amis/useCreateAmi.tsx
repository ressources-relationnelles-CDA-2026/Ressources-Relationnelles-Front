import { useState } from "react";
import createAmiService, {
  CreateAmiPayload,
} from "@/services/amis/createAmi";
import { Ami } from "@/types/database/amis";

export function useCreateAmi() {
  const [data, setData] = useState<Ami | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAmi = async (formData: CreateAmiPayload) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createAmiService(formData);

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
    createAmi,
  };
}