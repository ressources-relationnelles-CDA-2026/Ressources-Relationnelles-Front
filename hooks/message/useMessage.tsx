
import getMessages from "@/services/messages/getMessage";
import { Message } from "@/types/database/message";
import { useEffect, useState } from "react";


export function useMessages() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  const refreshMessages = async () => {
    
    setLoading(true);
    setError(null);

    try {
     
      const data = await getMessages();
      setMessages(data);


      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      return [];
    } finally {
      
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshMessages();
  }, []);

 
  return {
    messages,
    setMessages,
    loading,
    error,
    refreshMessages,
  };
}