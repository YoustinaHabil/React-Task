import React from "react";
import styles from "./Sort.module.css";

const Sort = ({ handleSort }) => (
  <div className={styles.container}>
    <select
      onChange={(e) => {
        const [field, order] = e.target.value.split("-");
        handleSort(field, order);
      }}
    >
      <option value="id-asc">Sort by ID (Ascending)</option>
      <option value="id-desc">Sort by ID (Descending)</option>
      <option value="title-asc">Sort by Title (Ascending)</option>
      <option value="title-desc">Sort by Title (Descending)</option>
    </select>
  </div>
);

export default Sort;
