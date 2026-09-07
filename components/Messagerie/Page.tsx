"use client";

import {  useMemo, useState } from "react";

import { useCreateMessage } from "@/hooks/message/useCreateMessage";
import { User } from "@/types/database/users";
import styles from "@/components/Messagerie/Page.module.css";
import { useMessagerie } from "@/hooks/Messagerie/useMessagerie";
import MessagerieNoUser from "./MessagerieNoUser";
import MessagerieLoading from "./MessagerieLoading";
import MessagerieError from "./MessagerieError";
import MessagerieHeader from "./MessagerieHeader";
import MessagerieListConv from "./MessagerieListConv";
import ConversationEmpty from "./conversation/ConversationEmpty";
import ConversationHeader from "./conversation/ConversationHeader";
import CardMessage from "./conversation/CardMessage";
import ConversationForm from "./conversation/ConversationForm";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {

  const { isAuth, userId: currentUserId } = useAuth();

  const { 
    conversations, 
    messages, 
    setMessages, 
    loading, 
    error } =useMessagerie(currentUserId);


  
  const {
    createMessage,
    loading: sending,
    error: createMessageError,
  } = useCreateMessage();


  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [messageContent, setMessageContent] = useState("");
  
  const selectedConversation = useMemo(() => {

    if (!selectedUserId) return null;

    return (
      conversations.find((conversation) => {
        return conversation.user.id === selectedUserId;
      }) ?? null
    );
  }, [conversations, selectedUserId]);

  const selectedMessages = useMemo(() => {
 
    if (!currentUserId || !selectedUserId) return [];

    return messages
      .filter((message) => {
        const expediteurId = message.expediteur?.id;

        const destinataireId = message.destinataire?.id;

        return (
          (expediteurId === currentUserId &&
            destinataireId === selectedUserId) ||
          (expediteurId === selectedUserId &&
            destinataireId === currentUserId)
        );
      })
      .sort((a, b) => {

        const dateA = new Date(a.dateEnvoi).getTime();
        const dateB = new Date(b.dateEnvoi).getTime();

        return dateA - dateB;
      });
  }, [messages, currentUserId, selectedUserId]);



  async function handleSendMessage() {
   
    if (!currentUserId || !selectedConversation || !messageContent.trim()) return;


    const createdMessage = await createMessage({
      contenu: messageContent.trim(),
      pieceJointe: null,
      dateEnvoie: new Date().toISOString(),
      id_expediteur: currentUserId,
      id_destinataire: selectedConversation.user.id,
    });

    if (!createdMessage) return;

    setMessages((previousMessages) => [...previousMessages, createdMessage]);

    setMessageContent("");
  }




  function getAvatarLetter(user: User) {
    return user.pseudo?.charAt(0)?.toUpperCase() ?? "U";
  }

  function formatDate(date: string) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}


  if (!isAuth) {
    return (
      <MessagerieNoUser/>
    );
  }


  if (loading) {
    return (
     <MessagerieLoading/>
    );
  }


  if (error) {
    return (
    <MessagerieError 
    error={error}/>
    );
  }

  return (
    <main className={styles.messagesPage}>

      
     <MessagerieHeader/>

      
      <section
        className={`${styles.messagesLayout} ${
          selectedConversation ? styles.hasSelectedConversation : ""
        }`}
      >
        
        <MessagerieListConv
        conversations={conversations}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        getAvatarLetter={getAvatarLetter}
        formatDate={formatDate}
        />
        
        <section className={styles.conversationPanel}>
         
          {!selectedConversation ? (
          <ConversationEmpty/>
          ) : (
            <>
             
             <ConversationHeader
             setSelectedUserId={setSelectedUserId}
             selectedConversation={selectedConversation}
             getAvatarLetter={getAvatarLetter}

             />

            
              <div className={styles.messagesContainer}>
                {selectedMessages.length === 0 ? (
                  <p className={styles.emptyText}>
                    Aucun message échangé pour le moment.
                  </p>
                ) : (
                  selectedMessages.map((message) => {
                  
                    const isMine =
                      message.expediteur?.id === currentUserId;

                    return (
                      <CardMessage
                      key={message.id}
                      message={message}
                      IsMine={isMine}
                      formatDate={formatDate}
                      />
                    );
                  })
                )}
              </div>

              <ConversationForm
              handleSendMessage={handleSendMessage}
              messageContent={messageContent}
              setMessageContent={setMessageContent}
              sending={sending}
              createMessageError={createMessageError}
              />
            </>
          )}
        </section>
      </section>
    </main>
  );
}