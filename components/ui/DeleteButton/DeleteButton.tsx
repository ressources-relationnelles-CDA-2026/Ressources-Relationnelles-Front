"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/components/ui/DeleteButton/DeleteButton.module.css";
import { DeleteButtonProps } from "@/types/components/ui/DeleteButtonProps";

export default function DeleteButton({ onConfirm }: DeleteButtonProps) {
  const [confirm, setConfirm] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleClick = async () => {
    if (!confirm) {
      setConfirm(true);
      return;
    }

    await onConfirm();
    location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={`${styles.deleteButton} ${confirm ? styles.confirm : ""}`}
      type="button"
    >
      {confirm ? "Confirmer ?" : "X"}
    </button>
  );
}