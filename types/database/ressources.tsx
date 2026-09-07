import { Adorer } from "./adorers";
import { Categorie } from "./categories";
import { Commentaire } from "./commentaires";
import { Consultation } from "./consultations";
import { Favori } from "./favoris";
import { Partage } from "./partages";
import { Tag } from "./tags";
import { User } from "./users";


export type Ressource = {
  "@id": string;
  "@type": string;
  id: number;
  titre: string;
  contenu: string;
  categorie: Categorie;
  medias: string[];
  consultations: Consultation[];
  commentaires: Commentaire[];
  partages: Partage[];
  adorers: Adorer[];
  favoris : Favori[];
  tagsRessources: Tag[];
  utilisateur: User;
  dateCreation: string;
  estVisible: boolean;
  valide: boolean;
  visibilite: string;
};
