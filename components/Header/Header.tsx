"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const { isAuth, isAdmin, userId } = useAuth();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (isDark: boolean) => {
      document.documentElement.dataset.theme = isDark ? "dark" : "light";
    };

    applyTheme(mediaQuery.matches);
    mediaQuery.addEventListener("change", (e) => applyTheme(e.matches));

    return () =>
      mediaQuery.removeEventListener("change", (e) => applyTheme(e.matches));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <Image src="/logoRR.png" alt="Logo" width={100} height={100} />
      </div>

      <nav ref={navRef} className={styles.nav}>
        <div className={styles.navContainer}>
          <ul>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            {!isAuth && (
              <li>
                <Link href="/login">Connexion</Link>
              </li>
            )}
            <li>
              <Link href="/resources">Ressources</Link>
            </li>
            {isAuth && (
              <>
                <li>
                  <Link href="/messagerie">Messagerie</Link>
                </li>
              </>
            )}
            {isAuth && (
              <>
                <li>
                  <Link href="/amis">Amis</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <li>
                <Link href="/categories">Catégories</Link>
              </li>
            )}
            {isAuth && (
              <>
                <li>
                  <Link href={`/utilisateur/${userId}`}>
                    Compte utilisateur
                  </Link>
                </li>
              </>
            )}
            {isAuth && (
              <>
                <li>
                  <Link href="/logout">Déconnexion</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <li>
                <Link href="/utilisateurs">Gestion des utilisateurs</Link>
              </li>
            )}
          </ul>

          <button
            className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            type="button"
          >
            ☰
          </button>
        </div>

        <div
          className={`${styles.mobileWrapper} ${menuOpen ? styles.open : ""}`}
        >
          <ul className={styles.mobileMenu}>
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Accueil
              </Link>
            </li>
            {!isAuth && (
              <li>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  Connexion
                </Link>
              </li>
            )}
            <li>
              <Link href="/resources" onClick={() => setMenuOpen(false)}>
                Ressources
              </Link>
            </li>
            {isAuth && (
              <>
                <li>
                  <Link href="/messagerie">Messagerie</Link>
                </li>
              </>
            )}
            {isAuth && (
              <>
                <li>
                  <Link href="/amis">Amis</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <li>
                <Link href="/categories" onClick={() => setMenuOpen(false)}>
                  Catégories
                </Link>
              </li>
            )}
            {isAuth && (
              <>
                <li>
                  <Link
                    href={`/utilisateur/${userId}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Compte utilisateur
                  </Link>
                </li>
                <li>
                  <Link href="/logout" onClick={() => setMenuOpen(false)}>
                    Déconnexion
                  </Link>
                </li>
              </>
            )}
            {isAdmin && (
              <li>
                <Link href="/utilisateurs" onClick={() => setMenuOpen(false)}>
                  Gestion des utilisateurs
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
