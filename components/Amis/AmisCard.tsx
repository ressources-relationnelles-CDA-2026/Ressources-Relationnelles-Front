import styles from "@/components/Amis/Page.module.css";
import { AmisCardProps } from "@/types/components/amis/AmisCardProps";
import Image from "next/image";

export default function AmisCard({userId,typedUser,getAvatarLetter,adding,handleAddFriend}:AmisCardProps){

    return(
         <article key={userId} className={styles.userCard}>
                <div className={styles.userLeft}>
                  {typedUser.photo_profil ? (
                    <Image
                      src={typedUser.photo_profil}
                      alt=""
                      className={styles.avatar}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {getAvatarLetter(typedUser)}
                    </div>
                  )}

                  <div>
                    <h2>@{typedUser.pseudo}</h2>
                    <span>{typedUser.email}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.addButton}
                  disabled={adding}
                  onClick={() => handleAddFriend(typedUser)}
                >
                  {adding ? "Ajout..." : "Ajouter"}
                </button>
              </article>
    )
}