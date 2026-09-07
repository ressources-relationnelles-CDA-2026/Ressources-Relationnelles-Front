"use client";

import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import BackButton from "@/components/ui/BackButton/BackButton";
import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useCreateCategorie } from "@/hooks/categories/useCreateCategorie";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCategorie() {
  const [message, setMessage] = useState("");
  const { createCategorie, loading, error } = useCreateCategorie();
  const router = useRouter();
  const { isAdmin } = useAuth(); 

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await createCategorie({
      libelle: formData.libelle,
      couleur: formData.couleur
    });

    if (res) {
      setTimeout(() => {
        setMessage("Modification réussie !");
        router.push("/categories");
      }, 1500);
    }
  };

  if (!isAdmin) return <AccessDenied/>;

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      {(message || error) && (
        <FormMessage message={message || error || ""} error={!!error} />
      )}
      <div className="page">
        <BackButton href="/categories"/>
        <Form
          titreForm="Création d'une catégorie"
          champs={[
            "Libellé",
            "Couleur"
          ]}
          names={[
            "libelle",
            "couleur"
          ]}
          buttonText={loading ? "Création..." : "Créer la catégorie"}
          placeHolders={[
            "Libellé",
            "#FFFFFF"
          ]}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
