"use client";

import ResourcesCard from "@/components/ResourcesCard/ResourcesCard";
import CreateButton from "@/components/ui/CreateButton/CreateButton";
import Filter from "@/components/ui/Filter/Filter";
import { useRessources } from "@/hooks/ressources/useRessources";
import { useAuth } from "@/hooks/useAuth";
import {  useState } from "react";

export default function ResourcesPage() {
  const { resources, loading, error } = useRessources();
  const { isAuth, isModo, userId } = useAuth();

  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const currentUserId = userId ? Number(userId) : null;

  const filteredResources = resources
    .filter((resource) => {
      if (!isModo && !resource.valide) {
        return false;
      }

      const searchLower = search.toLowerCase();

      const matchTitre = resource.titre
        .toLowerCase()
        .includes(searchLower);

      const matchCategorie = resource.categorie.libelle
        .toLowerCase()
        .includes(searchLower);

      if (filterBy === "titre") return matchTitre;

      if (filterBy === "categorie") return matchCategorie;

      return matchTitre || matchCategorie;
    })
    .sort((a, b) => {
      const aAdore = a.adorers.some(
        (adorer) => adorer.utilisateur.id === currentUserId,
      );

      const bAdore = b.adorers.some(
        (adorer) => adorer.utilisateur.id === currentUserId,
      );

      if (aAdore && !bAdore) return -1;

      if (!aAdore && bAdore) return 1;

      return 0;
    });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="page">
      <h1 className="pageTitle">Ressources</h1>

      <Filter
        value={search}
        onChange={setSearch}
        filterBy={filterBy}
        onFilterByChange={setFilterBy}
        options={[
          { label: "Tout", value: "all" },
          { label: "Titre", value: "titre" },
          { label: "Catégorie", value: "categorie" },
        ]}
      />

      <ResourcesCard resources={filteredResources} />

      {isAuth && <CreateButton url="/resource/new" />}
    </main>
  );
}
