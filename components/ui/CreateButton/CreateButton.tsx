"use client";

import Link from "next/link";
import styles from "./CreateButton.module.css";
import { CreateButtonProps } from "@/types/components/ui/CreateButtonProps";

export default function CreateButton({ url }: CreateButtonProps) {
  return (
    <Link href={url} className={styles.link}>
      <button className={styles.button} type="button">
        +
      </button>
    </Link>
  );
}