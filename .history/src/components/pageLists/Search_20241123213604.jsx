import React from 'react';
import style from './Search.module.css'
const Search = ({ handleSearch }) => (
  <div className={style.inputcontainer}>
    <input
      type="text"
      placeholder="searchPlaceholder"
      onChange={(e) => handleSearch(e.target.value)}
    />
  </div>
);

export default Search;
