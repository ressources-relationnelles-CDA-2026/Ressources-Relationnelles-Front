"use client";

import { ResourcesCardProps } from "@/types/components/ResourcesCardProps";
import Link from "next/link";
import styles from "@/components/ResourcesCard/ResourcesCard.module.css";
import EditButton from "../ui/EditButton/EditButton";
import { useAuth } from "@/hooks/useAuth";
import DeleteButton from "../ui/DeleteButton/DeleteButton";
import { useDeleteRessource } from "@/hooks/ressources/useDeleteRessource";

function truncate(text: string, max: number) {
  return text?.length > max ? text.slice(0, max) + "..." : text;
}

export default function ResourcesCard({
  resources,
}: Readonly<ResourcesCardProps>) {
  const { isAuth, isAdmin, userName, userId } = useAuth();
  const { deleteRessource } = useDeleteRessource(0);

  return (
    <div className={styles.cardGrid}>
      {resources.map((resource) => {
        const isFavorite = resource.favoris.some(
          (favori) => favori.utilisateur.id === userId,
        );

        const isLiked = resource.adorers.some(
          (adorer) => adorer.utilisateur.id === userId,
        );

        return (
          <article
            key={resource.id}
            className={`${styles.card} ${
              isFavorite ? styles.favoriteCard : ""
            } ${isLiked ? styles.likedCard : ""}`}
          >
            <Link
              href={`/resource/${resource.id}`}
              className={styles.cardContent}
            >
              <span
                className={styles.cardLibelleCategorie}
                style={{ color: resource.categorie.couleur }}
              >
                {resource.categorie.libelle +
                  (isFavorite ? " / Favori" : "") +
                  (isLiked ? " / Adoré" : "")}
              </span>

              <h2 className={styles.cardTitre}>{resource.titre}</h2>

              <p className={styles.cardContenu}>
                {truncate(resource.contenu, 35)}
              </p>
            </Link>

            {(isAdmin ||
              (isAuth && userName == resource.utilisateur.pseudo)) && (
              <div className={styles.resourcesActions}>
                <EditButton url={`/resource/edit/${resource.id}`} />

                <DeleteButton
                  onConfirm={async () => {
                    await deleteRessource(resource.id);
                  }}
                />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
