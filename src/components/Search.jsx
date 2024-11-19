import React from 'react';

const Search = ({ searchTerm, handleSearch }) => (
  <div className="input-container">
    <input
      type="text"
      placeholder="Search by UserId..."
      value={searchTerm}
      onChange={handleSearch} 
    />
  </div>
);

export default Search;
