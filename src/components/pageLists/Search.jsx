import React from "react";
import { useTranslation } from "react-i18next"; 
import styles from "./Search.module.css";

const Search = ({ handleSearch }) => {
  const { t } = useTranslation(); 

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={t("searchPlaceholder")} 
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
