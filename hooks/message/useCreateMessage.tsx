import { useState } from "react";
import createMessageService, {
  CreateMessagePayload,
} from "@/services/messages/createMessage";
import { Message } from "@/types/database/message";

export function useCreateMessage() {
  const [data, setData] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMessage = async (formData: CreateMessagePayload) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createMessageService(formData);

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
    createMessage,
  };
}