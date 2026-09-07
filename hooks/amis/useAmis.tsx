import { useEffect, useState } from "react";
import getAmis from "@/services/amis/getAmis";
import { Ami } from "@/types/database/amis";

export function useAmis() {

  const [amis, setAmis] = useState<Ami[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAmis = async () => {
 
    setLoading(true);
    setError(null);

    try {
      const data = await getAmis();
      setAmis(data);
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      return [];
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    refreshAmis();
  }, []);


  return {
    amis,
    setAmis,
    loading,
    error,
    refreshAmis,
  };
}