import { useState } from "react";
import styles from "@/components/Resource/Comment/Comment.module.css";
import { CommentProps } from "@/types/components/resource/CommentProps";
import { useCreateCommentaire } from "@/hooks/commentaires/useCreateCommentaire";
import Button from "@/components/ui/Button/Button";
import DeleteButton from "@/components/ui/DeleteButton/DeleteButton";
import { useDeleteCommentaire } from "@/hooks/commentaires/useDeleteCommentaire";
import { useAuth } from "@/hooks/useAuth";

export default function Comment({ commentaires, ressourceId }: CommentProps) {
  const [replyToId, setReplyToId] = useState<number | null>(null);
  const { createCommentaire } = useCreateCommentaire();
  const { deleteCommentaire } = useDeleteCommentaire(0);
  const { isAuth, isModo, userId } = useAuth();

  const parents = commentaires.filter(
    (commentaire) => commentaire.commentaireParentId == null,
  );

  const enfants = commentaires.filter(
    (commentaire) => commentaire.commentaireParentId != null,
  );

  const getEnfants = (id: number) =>
    enfants.filter((commentaire) => commentaire.commentaireParentId === id);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    commentaireParent: number | null = null,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const contenu = String(formData.get("contenu") ?? "");

    if (!contenu) return;

    const res = await createCommentaire({
      contenu,
      dateCreation: new Date().toISOString(),
      utilisateur: `/api/utilisateurs/${userId}`,
      resource: `/api/ressources/${ressourceId}`,
      commentaireParent:
        commentaireParent != null
          ? `/api/commentaires/${commentaireParent}`
          : null,
    });

    if (res) {
      location.reload();
    }
  };

  return (
    <div>
      {isAuth && (
        <div className={styles.resourceComments}>
          <h3>Commentaires</h3>
          <form
            className={styles.commentForm}
            onSubmit={(e) => handleSubmit(e, null)}
          >
            <input
              name="contenu"
              className={styles.commentInput}
              placeholder="Écrire un commentaire..."
            />

            <Button text={"Envoyer"} />
          </form>
        </div>
      )}

      {parents.map((parent) => (
        <div key={parent.id} className={styles.commentCard}>
          <div className={styles.commentRow}>
            <div>{parent.contenu}</div>
            {isAuth && (
              <div>
                <button
                  className={styles.replyBtn}
                  onClick={() =>
                    setReplyToId(replyToId === parent.id ? null : parent.id)
                  }
                  type="button"
                >
                  Répondre
                </button>
                {isModo && (
                  <DeleteButton
                    onConfirm={async () => {
                      await deleteCommentaire(parent.id);
                    }}
                  />
                )}
              </div>
            )}
          </div>
          {replyToId === parent.id && (
            <form
              className={styles.replyForm}
              onSubmit={(e) => handleSubmit(e, parent.id)}
            >
              <input
                name="contenu"
                className={styles.commentInput}
                placeholder="Écrire une réponse..."
              />
              <Button text={"Répondre"} />
            </form>
          )}

          <div className={styles.replies}>
            {getEnfants(parent.id).map((enfant) => (
              <div key={enfant.id} className={styles.replyItem}>
                <div>↳ {enfant.contenu}</div>

                <div className={styles.repliesAction}>
                  {isModo && (
                    <DeleteButton
                      onConfirm={async () => {
                        await deleteCommentaire(enfant.id);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
