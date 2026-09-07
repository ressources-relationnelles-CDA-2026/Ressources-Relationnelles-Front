"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { useAmis } from "@/hooks/amis/useAmis";
import { useCreateAmi } from "@/hooks/amis/useCreateAmi";
import { useDeleteAmi } from "@/hooks/amis/useDeleteAmi";
import { useUtilisateurs } from "@/hooks/utilisateurs/useUtilisateurs";

import { User } from "@/types/database/users";

import styles from "@/components/Amis/Page.module.css";

import AmisNoLogin from "./AmisNoLogin";
import AmisError from "./AmisError";
import AmisCard from "./AmisCard";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const {
    utilisateurs: users,
    loading: loadingUsers,
    error: errorUsers,
  } = useUtilisateurs();

  const {
    amis,
    loading: loadingAmis,
    error: errorAmis,
    refreshAmis,
  } = useAmis();

  const {
    createAmi,
    loading: adding,
    error: errorCreateAmi,
  } = useCreateAmi();

  const {
    deleteAmi,
    loading: deleting,
    error: errorDeleteAmi,
  } = useDeleteAmi();
  const [search, setSearch] = useState("");

  const { isAuth, userId: currentUserId } = useAuth();

  function getAvatarLetter(user: User) {
    return user.pseudo?.charAt(0)?.toUpperCase() ?? "U";
  }

  function getFullName(user: User) {
    const fullName = `${user.prenom ?? ""} ${user.nom ?? ""}`.trim();

    return fullName || "Utilisateur";
  }

  const usersAlreadyFriendsIds = useMemo(() => {
    if (!currentUserId) return [];

    return amis
      .map((relation) => {
        const demandeurId = relation.demandeur.id;
        const amiId = relation.ami.id;

        if (demandeurId === currentUserId) return amiId;
        if (amiId === currentUserId) return demandeurId;

        return null;
      })
      .filter((id): id is number => id !== null);
  }, [amis, currentUserId]);

  const currentFriends = useMemo(() => {
    if (!currentUserId) return [];

    return amis
      .map((relation) => {
        const demandeurId = relation.demandeur.id;
        const amiId = relation.ami.id;

        if (demandeurId === currentUserId) {
          return {
            relationId: relation.id,
            user: relation.ami,
          };
        }

        if (amiId === currentUserId) {
          return {
            relationId: relation.id,
            user: relation.demandeur,
          };
        }

        return null;
      })
      .filter((friend): friend is { relationId: number; user: User } => {
        return friend !== null;
      });
  }, [amis, currentUserId]);

  const availableUsers = useMemo(() => {
    if (!currentUserId) return [];

    const searchLower = search.toLowerCase();

    return users.filter((user) => {
      const typedUser = user as User;
      const userId = typedUser.id;

      if (!userId) return false;

      const isCurrentUser = userId === currentUserId;
      const isAlreadyFriend = usersAlreadyFriendsIds.includes(userId);

      const pseudo = typedUser.pseudo?.toLowerCase() ?? "";
      const nom = typedUser.nom?.toLowerCase() ?? "";
      const prenom = typedUser.prenom?.toLowerCase() ?? "";
      const email = typedUser.email?.toLowerCase() ?? "";

      const matchesSearch =
        pseudo.includes(searchLower) ||
        nom.includes(searchLower) ||
        prenom.includes(searchLower) ||
        email.includes(searchLower);

      return !isCurrentUser && !isAlreadyFriend && matchesSearch;
    });
  }, [users, currentUserId, usersAlreadyFriendsIds, search]);

  async function handleAddFriend(typedUser: User) {
    if (!currentUserId) return;

    const userToAddId = typedUser.id;

    if (!userToAddId) return;

    const result = await createAmi({
      statut: "accepte",
      dateAction: new Date().toISOString(),
      demandeur: currentUserId,
      ami: userToAddId,
    });

    if (result) {
      await refreshAmis();
    }
  }

  async function handleDeleteFriend(relationId: number) {
    const result = await deleteAmi(relationId);

    if (result) {
      await refreshAmis();
    }
  }

  const loading = loadingUsers || loadingAmis;
  const error = errorUsers ?? errorAmis ?? errorCreateAmi ?? errorDeleteAmi;

  if (!isAuth) {
    return <AmisNoLogin />;
  }

  if (!currentUserId) {
    return <AmisNoLogin />;
  }

  if (loading) {
    return <AmisNoLogin />;
  }

  if (error) {
    return <AmisError error={error} />;
  }

  return (
    <main className={styles.friendsPage}>
      <section className={styles.friendsHeader}>
        <h1>Ajouter des amis</h1>
        <p>Recherchez des utilisateurs et gérez votre liste d’amis.</p>
      </section>

      <section className={styles.searchCard}>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Rechercher par pseudo, nom ou email..."
          className={styles.searchInput}
        />
      </section>

      <section className={styles.usersList}>
        <h2 className={styles.sectionTitle}>Mes amis</h2>

        {currentFriends.length === 0 ? (
          <p className={styles.emptyText}>Vous n’avez pas encore d’amis.</p>
        ) : (
          currentFriends.map((friend) => (
            <article key={friend.relationId} className={styles.userCard}>
              <div className={styles.userLeft}>
                {friend.user.photo_profil ? (
                  <Image
                    src={friend.user.photo_profil}
                    alt=""
                    className={styles.avatar} 
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {getAvatarLetter(friend.user)}
                  </div>
                )}

                <div>
                  <h2>@{friend.user.pseudo}</h2>
                  <p>{getFullName(friend.user)}</p>
                  <span>{friend.user.email}</span>
                </div>
              </div>

              <button
                type="button"
                className={styles.deleteButton}
                disabled={deleting}
                onClick={() => handleDeleteFriend(friend.relationId)}
              >
                {deleting ? "Suppression..." : "Supprimer"}
              </button>
            </article>
          ))
        )}
      </section>

      <section className={styles.usersList}>
        <h2 className={styles.sectionTitle}>Utilisateurs disponibles</h2>

        {availableUsers.length === 0 ? (
          <p className={styles.emptyText}>
            Aucun utilisateur disponible pour le moment.
          </p>
        ) : (
          availableUsers.map((user) => {
            const typedUser = user as User;
            const userId = typedUser.id;

            if (!userId) return null;

            return (
              <AmisCard
                key={userId}
                userId={userId}
                typedUser={typedUser}
                getAvatarLetter={getAvatarLetter}
                adding={adding}
                handleAddFriend={handleAddFriend}
              />
            );
          })
        )}
      </section>
    </main>
  );
}