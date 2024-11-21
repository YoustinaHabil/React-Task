import React from 'react';

const Search = ({ handleSearch }) => (
  <div className="input-container">
    <input
      type="text"
      placeholder="Search by User ID"
      onChange={(e) => handleSearch(e.target.value)}
    />
  </div>
);

export default Search;
