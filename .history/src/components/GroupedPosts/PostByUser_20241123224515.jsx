import React from "react";
import useGroupedPosts from "../Hooks/GroupedPosts";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import UserPosts from "../UserPosts/UserPosts";
import styles from "./PostsByUser.module.css";
import Loader from "../Loaders/Loaders";
import ErrorMessage from "../ErrorMessages/ErrorMessage";
import UserPosts from "./UserPosts";

const PostsByUserPage = () => {
  const { groupedPosts, loading, error } = useGroupedPosts();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Posts by User</h1>
      <div className={styles.grid}>
        {Object.entries(groupedPosts).map(([userId, { username, posts }]) => (
          <UserPosts key={userId} username={username} posts={posts} />
        ))}
      </div>
    </div>
  );
};

export default PostsByUserPage;
