import React from "react";
import styles from "./Search.module.css";

const Search = ({ handleSearch }) => (
  <div className={styles.container}>
    <input
      type="text"
      placeholder="Search by username"
      onChange={(e) => handleSearch(e.target.value)}
    />
  </div>
);

export default Search;
