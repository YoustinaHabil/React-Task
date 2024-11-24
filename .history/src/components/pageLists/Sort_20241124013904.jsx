import React from "react";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import styles from "./Sort.module.css";

const Sort = ({ handleSort }) => {
  const { t } = useTranslation(); 

  return (
    <div className={styles.container}>
      <select
        onChange={(e) => {
          const [field, order] = e.target.value.split("-");
          handleSort(field, order);
        }}
      >
        <option value="id-asc">{t("sortByIdAsc")}</option>
        <option value="id-desc">{t("sortByIdDesc")}</option>
        <option value="title-asc">{t("sortByTitleAsc")}</option>
        <option value="title-desc">{t("sortByTitleDesc")}</option>
      </select>
    </div>
  );
};

export default Sort;
