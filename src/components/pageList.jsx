import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../store/DataContext';
import './PageList.css';
import Search from './Search';
import Sort from './Sort';
import Posts from './Posts';

const AllPostsPage = () => {
    const { groupedData, loading, error } = useContext(DataContext);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  useEffect(() => {
    if (groupedData && Object.keys(groupedData).length > 0) {
      const allPosts = Object.values(groupedData).flat();
      setFilteredPosts(allPosts);
    }
  }, [groupedData]);

  const handleLoadMore = () => {
    setPostsToShow(postsToShow + 10);
  };
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term); 
    const searchUserId = term ? parseInt(term, 10) : null;
    const filtered = filteredPosts.filter((post) => {
      if (searchUserId) {
        return post.userId === searchUserId; 
      }
      return true; 
    });
  
    setFilteredPosts(filtered); 
  };
  
  const handleSort = (event) => {
    const [field, order] = event.target.value.split('-');
    setSortOrder(order);  
    
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if (field === 'title') {
        return order === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (field === 'id') {
       
        return order === 'asc' ? a.id - b.id : b.id - a.id;
      }
      return 0;
    });
  
    setFilteredPosts(sortedPosts);  
  };
  


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>All Posts</h1>

      <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      <Sort sortOrder={sortOrder} handleSort={handleSort} />
      <Posts filteredPosts={filteredPosts} postsToShow={postsToShow} handleLoadMore={handleLoadMore} />
    </div>
  );
};

export default AllPostsPage;
