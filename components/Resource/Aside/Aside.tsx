"use client";

import styles from "@/components/Resource/Aside/Aside.module.css";
import { AsideProps } from "@/types/components/resource/AsideProps";

import { useCreateFavori } from "@/hooks/favoris/useCreateFavori";
import { useDeleteFavori } from "@/hooks/favoris/useDeleteFavori";
import { useCreateAdorer } from "@/hooks/adorers/useCreateAdorers";
import { useDeleteAdorer } from "@/hooks/adorers/useDeleteAdorers";
import { useAuth } from "@/hooks/useAuth";

export default function Aside({
  resourceId,
  adorers,
  favoris,
  partages,
  consultations,
  isLiked,
  isFavoris,
  setIsLiked,
  setIsFavoris,
  adorerId,
  favoriId,
  setAdorerId,
  setFavoriId,
  setAdorersCount,
  setFavorisCount,
  tags,
  categorie,
}: Readonly<AsideProps>) {
  const { createAdorer } = useCreateAdorer();
  const { deleteAdorer } = useDeleteAdorer();

  const { createFavori } = useCreateFavori();
  const { deleteFavori } = useDeleteFavori();

  const { isAuth, userId } = useAuth();

  async function handleToggleLike() {
    if (!isAuth || !userId) {
      return;
    }

    if (isLiked && adorerId) {
      const deleted = await deleteAdorer(adorerId);

      if (deleted) {
        setIsLiked(false);
        setAdorerId(null);
        setAdorersCount((prev) => Math.max(prev - 1, 0));
      }

      return;
    }

    const payload = {
      dateAdorer: new Date().toISOString(),
      utilisateur: `/api/utilisateurs/${userId}`,
      resource: `/api/ressources/${resourceId}`,
    };

    const created = await createAdorer(payload);

    if (created) {
      setIsLiked(true);
      setAdorerId(created.id);
      setAdorersCount((prev) => prev + 1);
    }
  }

  async function handleToggleFavori() {
    if (!isAuth || !userId) {
      return;
    }

    if (isFavoris && favoriId) {
        const deleted = await deleteFavori(favoriId);

        if (deleted) {
          setIsFavoris(false);
          setFavoriId(null);
          setFavorisCount((prev) => Math.max(prev - 1, 0));
        }

      return;
    }

    const payload = {
      utilisateur: `/api/utilisateurs/${userId}`,
      resource: `/api/ressources/${resourceId}`,
    };
    const created = await createFavori(payload);

    if (created) {
      setIsFavoris(true);
      setFavoriId(created.id);
      setFavorisCount((prev) => prev + 1);
    }
  }

  return (
    <aside className={styles.resourceAside}>
      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.actionBtn} ${
            isLiked ? styles.actionBtnActive : ""
          }`}
          onClick={handleToggleLike}
        >
          <span>{isLiked ? "❤️" : "🤍"}</span>
          <span>{adorers}</span>
        </button>

        <button type="button" className={styles.actionBtn}>
          <span>👁️</span>
          <span>{consultations}</span>
        </button>

        <button
          type="button"
          className={`${styles.actionBtn} ${
            isFavoris ? styles.actionBtnActive : ""
          }`}
          onClick={handleToggleFavori}
        >
          <span>{isFavoris ? "⭐" : "☆"}</span>
          <span>{favoris}</span>
        </button>
      </div>

      <div className={styles.resourceCard}>
        <strong>Tags</strong>

        <div className={styles.tags}>
          {tags.map((tag, i) => (
            <span key={i} className={styles.tag} style={{ color: tag.couleur }}>
              #{tag.libelle}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.resourceCard}>
        <strong>Catégories</strong>
        <p style={{ color: categorie.couleur }}>{categorie.libelle}</p>
      </div>
    </aside>
  );
}
