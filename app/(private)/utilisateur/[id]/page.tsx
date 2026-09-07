"use client";

import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import BackButton from "@/components/ui/BackButton/BackButton";
import UtilisateurView from "@/components/UtilisateurView/UtilisateurView";
import { useAuth } from "@/hooks/useAuth";
import { useUtilisateur } from "@/hooks/utilisateurs/useUtilisateur";
import { useParams } from "next/navigation";

export default function ViewUtilisateur() {
  const params = useParams();
  const id = params.id as string;

  const { utilisateur, loading, error } = useUtilisateur(id);
  const { isAdmin, userId } = useAuth();

  if (id !== String(userId) && !isAdmin) return <AccessDenied />;

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="page">
      {isAdmin && <BackButton href="/utilisateurs" />}
      <UtilisateurView utilisateur={utilisateur} id={id} />
    </main>
  );
}