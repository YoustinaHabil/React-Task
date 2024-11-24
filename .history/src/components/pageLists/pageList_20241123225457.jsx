import React, { useState } from "react";
// import useFetchAndGroupPosts from "../../Hooks/useFetchAndGroupPosts";
import Search from "../Search/Search";
import Sort from "../Sort/Sort";
import Posts from "../Posts/Posts";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./AllPostsPage.module.css";

const AllPostsPage = () => {
  const { groupedData, loading, error } = useFe();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState(10);

  // Filter posts on load
  React.useEffect(() => {
    if (groupedData) {
      setFilteredPosts(groupedData);
    }
  }, [groupedData]);

  const handleLoadMore = () => setPostsToShow((prev) => prev + 10);

  const handleSearch = (term) => {
    const filtered = groupedData.filter((post) =>
      post.username.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleSort = (field, order) => {
    const sorted = [...filteredPosts].sort((a, b) => {
      if (field === "title") {
        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (field === "id") {
        return order === "asc" ? a.id - b.id : b.id - a.id;
      }
      return 0;
    });
    setFilteredPosts(sorted);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Posts</h1>
      <Search handleSearch={handleSearch} />
      <Sort handleSort={handleSort} />
      <Posts
        posts={filteredPosts.slice(0, postsToShow)}
        handleLoadMore={handleLoadMore}
        canLoadMore={postsToShow < filteredPosts.length}
      />
    </div>
  );
};

export default AllPostsPage;
