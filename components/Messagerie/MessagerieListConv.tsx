
import styles from "@/components/Messagerie/Page.module.css";
import { MessagerieListConvProps } from "@/types/components/messagerie/MessagerieListConv";
import Image from "next/image";

export default function MessagerieListConv({conversations,selectedUserId,setSelectedUserId,getAvatarLetter,formatDate}:Readonly<MessagerieListConvProps>){

    return(
        <aside className={styles.conversationList}>
          <div className={styles.panelHeader}>
            <h2>Amis</h2>
            <span>{conversations.length}</span>
          </div>

         
          {conversations.length === 0 ? (
            <p className={styles.emptyText}>Aucun ami pour le moment.</p>
          ) : (
            conversations.map((conversation) => {
           
              const friend = conversation.user;
              const lastMessage = conversation.lastMessage;
              const isActive = selectedUserId === friend.id;

              return (
                <button
                  key={friend.id}
                  type="button"
                  className={`${styles.conversationItem} ${
                    isActive ? styles.conversationItemActive : ""
                  }`}
                  onClick={() => setSelectedUserId(friend.id)}
                >
             
                  {friend.photo_profil ? (
                    <Image
                      src={friend.photo_profil}
                      alt=""
                      className={styles.avatar}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {getAvatarLetter(friend)}
                    </div>
                  )}

                  <div className={styles.conversationInfo}>
                    <div className={styles.conversationTop}>
                      <strong>@{friend.pseudo}</strong>

                      <span>
                        {lastMessage
                          ? formatDate(lastMessage.dateEnvoi)
                          : ""}
                      </span>
                    </div>

                    <p className={styles.friendName}>
                      {friend.pseudo}
                    </p>

                    <p className={styles.lastMessage}>
                      {lastMessage
                        ? lastMessage.contenu
                        : "Aucun message pour le moment"}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </aside>
    )
}