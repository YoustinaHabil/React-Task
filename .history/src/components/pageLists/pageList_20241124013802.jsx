import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Search from "./Search";
import Sort from "./Sort";
import Posts from "./Posts";
import styles from "./PageList.css";
import Loader from "../Loaders/Loaders";
import ErrorMessage from "../ErrorMessages/ErrorMessage";

const AllPostsPage = () => {
  const { t } = useTranslation(); 
  const [groupedData, setGroupedData] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [postsRes, usersRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        if (!postsRes.ok || !usersRes.ok) {
          throw new Error(t("errorMessage")); 
        }

        const posts = await postsRes.json();
        const users = await usersRes.json();

       
        const grouped = posts.map((post) => ({
          id: post.id,
          title: post.title,
          userId: post.userId,
          username: users.find((user) => user.id === post.userId)?.username || "Unknown User",
        }));

        setGroupedData(grouped);
        setFilteredPosts(grouped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]); // Adding t to the dependency array to trigger effect when language changes

  // Load more posts
  const handleLoadMore = () => setPostsToShow((prev) => prev + 10);

  // Search posts by username
  const handleSearch = (term) => {
    const filtered = groupedData.filter((post) =>
      post.username.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  // Sort posts
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

  if (loading) return <Loader />; // Show loading state
  if (error) return <ErrorMessage message={error} />; // Show error message

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("allPosts")}</h1> {/* Translated title */}
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
