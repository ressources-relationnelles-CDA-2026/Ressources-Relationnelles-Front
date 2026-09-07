"use client";

import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import BackButton from "@/components/ui/BackButton/BackButton";
import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useCategorie } from "@/hooks/categories/useCategorie";
import { usePutCategorie } from "@/hooks/categories/usePutCategorie";
import { useAuth } from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EditCategorie() {
  const [message, setMessage] = useState("");
  const params = useParams();
  const id = params.id as string;
  const { categorie } = useCategorie(id);
  const { putCategorie, loading, error } = usePutCategorie(id);
  const router = useRouter();
  const { isAdmin } = useAuth();

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await putCategorie({
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
          titreForm={`Modifier ${categorie?.libelle}`}
          champs={[
            "Libellé",
            "Couleur"
          ]}
          names={[
            "libelle",
            "couleur"
          ]}
          buttonText={loading ? "Mise à jour..." : "Mettre à jour les données"}
          placeHolders={[
            "Libellé",
            "#FFFFFF"
          ]}
          defaultValues={{
            libelle: categorie?.libelle ?? "",
            couleur: categorie?.couleur ?? ""
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
