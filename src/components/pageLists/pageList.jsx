import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../store/DataContext";
import style from "./PageList.css";
import Search from "./Search";
import Sort from "./Sort";
import Posts from "./Posts";
import Loader from "../Loaders/Loaders";
import ErrorMessage from "../ErrorMessages/ErrorMessage";

const AllPostsPage = () => {
  const { groupedData, loading, error } = useContext(DataContext);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState(10);

  useEffect(() => {
    if (groupedData && Object.keys(groupedData).length > 0) {
      const allPosts = Object.values(groupedData).flat();
      setFilteredPosts(allPosts);
    }
  }, [groupedData]);

  const handleLoadMore = () => setPostsToShow((prev) => prev + 10);

  const handleSearch = (term) => {
    const searchUserId = term ? parseInt(term, 10) : null;
    const filtered = Object.values(groupedData)
      .flat()
      .filter((post) => (searchUserId ? post.userId === searchUserId : true));
    setFilteredPosts(filtered);
  };

  const handleSort = (field, order) => {
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if (field === "title") {
        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (field === "id") {
        return order === "asc" ? a.id - b.id : b.id - a.id;
      }
      return 0;
    });
    setFilteredPosts(sortedPosts);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={style.container}>
      <h1>All Posts</h1>
      <Search handleSearch={handleSearch} />
      <Sort handleSort={handleSort} />
      <Posts
        filteredPosts={filteredPosts}
        postsToShow={postsToShow}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default AllPostsPage;
