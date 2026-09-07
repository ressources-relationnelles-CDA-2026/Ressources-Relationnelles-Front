"use client";

import { useEffect, useRef, useState } from "react";

import BackButton from "@/components/ui/BackButton/BackButton";
import Header from "@/components/Resource/Header/Header";
import Aside from "@/components/Resource/Aside/Aside";
import Content from "@/components/Resource/Content/Content";
import Comment from "@/components/Resource/Comment/Comment";

import { PageProps } from "@/types/components/resource/PageProps";
import { useCreateConsultation } from "@/hooks/consultations/useCreateConsultation";

import styles from "@/components/Resource/Page/Page.module.css";
import { useAuth } from "@/hooks/useAuth";

export default function Page({ resource }: Readonly<PageProps>) {
  const { isAuth, userId } = useAuth();
  const existingLike =
      isAuth && userId
       ? resource.adorers.find(
        (adorer) => adorer.utilisateur.id === userId,
      )
      : undefined;

    const existingFavori =
    isAuth && userId
    ? resource.favoris.find(
        (favori) => favori.utilisateur.id === userId,
      )
    : undefined;

   const interactionKey = [
  resource.id,
  userId ?? "anonymous",
  existingLike?.id ?? "no-like",
  existingFavori?.id ?? "no-favori",
].join(":");

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavoris, setIsFavoris] = useState<boolean>(false);

  const [adorerId, setAdorerId] = useState<number | null>(null);
  const [favoriId, setFavoriId] = useState<number | null>(null);

  const [previousInteractionKey, setPreviousInteractionKey] =useState(interactionKey);

  const [adorersCount, setAdorersCount] = useState(resource.adorers.length);
  const [favorisCount, setFavorisCount] = useState(resource.favoris.length);
  const [consultationsCount, setConsultationsCount] = useState(
    resource.consultations.length,
  );

  const { createConsultation } = useCreateConsultation();

  const consultationCreated = useRef(false);

  useEffect(() => {
    async function addConsultation() {
      if (consultationCreated.current) return;

      consultationCreated.current = true;

      const consultation = await createConsultation({
        utilisateur: isAuth && userId ? `/api/utilisateurs/${userId}` : null,
        resource: `/api/ressources/${resource.id}`,
      });

      if (consultation) {
        setConsultationsCount((prev) => prev + 1);
      }
    }

    addConsultation();
  }, [createConsultation, resource.id, isAuth, userId]);

  if (interactionKey !== previousInteractionKey) {
  setPreviousInteractionKey(interactionKey);
  setIsLiked(Boolean(existingLike));
  setAdorerId(existingLike?.id ?? null);
  setIsFavoris(Boolean(existingFavori));
  setFavoriId(existingFavori?.id ?? null);
}

  return (
    <div className={styles.resourcePage}>
      <BackButton href="/resources" />

      <Header
        titre={resource.titre}
        utilisateur={`${resource.utilisateur.prenom} ${resource.utilisateur.nom}`}
        dateCreation={resource.dateCreation}
        vues={consultationsCount}
      />

      <div className={styles.resourceLayout}>
        <Content contenu={resource.contenu} medias={resource.medias} />

        <Aside
          resourceId={resource.id}
          adorers={adorersCount}
          partages={resource.partages.length}
          consultations={consultationsCount}
          favoris={favorisCount}
          isLiked={isLiked}
          isFavoris={isFavoris}
          setIsLiked={setIsLiked}
          setIsFavoris={setIsFavoris}
          adorerId={adorerId}
          favoriId={favoriId}
          setAdorerId={setAdorerId}
          setFavoriId={setFavoriId}
          setAdorersCount={setAdorersCount}
          setFavorisCount={setFavorisCount}
          tags={resource.tagsRessources}
          categorie={resource.categorie}
        />

        <Comment
          commentaires={resource.commentaires}
          ressourceId={resource.id}
        />
      </div>
    </div>
  );
}
