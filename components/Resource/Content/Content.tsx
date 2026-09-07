import styles from "@/components/Resource/Content/Content.module.css";
import { ContentProps } from "@/types/components/resource/ContentProps";
import Image from "next/image";

export default function Content({ contenu, medias }: ContentProps) {
  return (
    <div className={styles.resourceContentCol}>
      {medias?.map((media, key) => {
        return (
          <Image key={key} className={styles.resourceImage} src={media} alt="" width={100} height={100} />
        );
      })}

      <div className={styles.resourceContentCard}>{contenu}</div>
    </div>
  );
}
