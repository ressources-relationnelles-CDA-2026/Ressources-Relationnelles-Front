
import styles from "@/components/Messagerie/Page.module.css"
import { ConversationHeaderProps } from "@/types/components/messagerie/ConversationHeader";
import Image from "next/image";


export default function ConversationHeader({setSelectedUserId,selectedConversation,getAvatarLetter}:Readonly<ConversationHeaderProps>){

    return(
         <div className={styles.conversationHeader}>
                <button
                  type="button"
                  className={styles.backMobileButton}
                  onClick={() => setSelectedUserId(null)}
                >
                  ←
                </button>

                
                {selectedConversation.user.photo_profil ? (
                  <Image
                    src={selectedConversation.user.photo_profil}
                    alt=""
                    className={styles.avatar}
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {getAvatarLetter(selectedConversation.user)}
                  </div>
                )}

                <div>
                  <h2>@{selectedConversation.user.pseudo}</h2>
                  <p>{selectedConversation.user.pseudo}</p>
                </div>
              </div>
    )
}