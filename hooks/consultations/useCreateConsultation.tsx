import { useState } from "react";

import { Consultation } from "@/types/database/consultations";
import createConsultation, { CreateConsultationPayload } from "@/services/consultation/createConsultation";

export function useCreateConsultation() {
  const [data, setData] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (formData: CreateConsultationPayload) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createConsultation(formData);

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
    createConsultation: create,
  };
}