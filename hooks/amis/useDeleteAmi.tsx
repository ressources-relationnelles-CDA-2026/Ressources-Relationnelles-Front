import deleteAmiAPI from "@/services/amis/deleteAmis";
import { useState } from "react";



export function useDeleteAmi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAmi = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteAmiAPI(id);
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    deleteAmi,
  };
}