"use client";

import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useCategories } from "@/hooks/categories/useCategories";
import { usePutRessource } from "@/hooks/ressources/usePutRessource";
import { useRessource } from "@/hooks/ressources/useRessource";
import { useAuth } from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function NewResourcePage() {
  const [message, setMessage] = useState("");

  const params = useParams();
  const id = params.id as string;

  const { putRessource, loading, error } = usePutRessource(id);
  const { resource } = useRessource(id);
  const { categories } = useCategories();
  const { isAuth, isModo, userId } = useAuth();

  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await putRessource({
      titre: formData.titre,
      contenu: formData.Contenu,
      valide: isModo
        ? Boolean(Number(formData.valide))
        : (Boolean(resource?.valide) ?? false),
      date_creation: resource?.dateCreation ?? new Date().toISOString(),
      visibilite: formData.visibilite,
      utilisateur: resource?.utilisateur.id ?? Number(userId),
      categorie: formData.categorie,
      tags: resource?.tagsRessources.map((tag) => `/api/tags/${tag.id}`) ?? [
        "",
      ],
    });

    if (res) {
      setMessage("Modification réussie !");
      setTimeout(() => {
        router.push(`/resources`);
      });
    }
  };

  if (!isAuth || (userId != Number(resource?.utilisateur.id) && !isModo)) {
    return <AccessDenied />;
  }

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      {(message || error) && (
        <FormMessage message={message || error || ""} error={!!error} />
      )}

      <div className="page">
        <Form
          titreForm="Modifier une ressource"
          champs={["Titre"]}
          names={["titre"]}
          buttonText={
            loading ? "Modification..." : "Modification de la ressource"
          }
          placeHolders={["Titre"]}
          textAreas={["Contenu"]}
          onSubmit={handleSubmit}
          defaultValues={{
            titre: resource?.titre ?? "",
            Contenu: resource?.contenu ?? "",
          }}
          selects={[
            {
              label: "Visibilité",
              name: "visibilite",
              values: ["public", "friend", "private"],
              texts: ["Public", "Amis", "Privé"],
              selectDefaultValue: resource?.visibilite ?? "public",
            },
            {
              label: "Catégorie",
              name: "categorie",
              values: categories.map((categorie) => String(categorie.id)),
              texts: categories.map((categorie) => categorie.libelle),
              selectDefaultValue: String(categories[0]?.id),
            },
            ...(isModo
              ? [
                  {
                    label: "Validité",
                    name: "valide",
                    values: ["1", "0"],
                    texts: ["Oui", "Non"],
                    selectDefaultValue:
                      Number(resource?.valide) == 0 ? "0" : "1",
                  },
                ]
              : []),
          ]}
        />
      </div>
    </>
  );
}
