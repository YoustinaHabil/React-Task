import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css"; 
import { useTranslation } from "react-i18next";

const Header = () => {
  const { i18n } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>MyReactApp</div>
      <nav className={styles.navbar}>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive ? `${styles["nav-link"]} ${styles.active}` : styles["nav-link"]
          }
        >
          Posts
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? `${styles["nav-link"]} ${styles.active}` : styles["nav-link"]
          }
        >
          Users
        </NavLink>
      </nav>
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={styles.languageButton}
      >
        English
      </button>
      <button
        onClick={() => i18n.changeLanguage("ar")}
        className={styles.languageButton}
      >
        عربي
      </button>
    </header>
  );
};

export default Header;
