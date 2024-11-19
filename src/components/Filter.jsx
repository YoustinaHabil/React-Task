// Filter.js
import React from 'react';

const Filter = ({ userFilter, handleFilterChange, filteredPosts }) => (
  <div className="filter-container">
    <select value={userFilter} onChange={handleFilterChange}>
      <option value="">Filter by User ID</option>
      {[...new Set(filteredPosts.map((post) => post.userId))].map((userId) => (
        <option key={userId} value={userId}>
          User {userId}
        </option>
      ))}
    </select>
  </div>
);

export default Filter;
