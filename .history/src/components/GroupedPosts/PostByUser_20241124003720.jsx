import React from "react";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import useGroupedPosts from "../Hooks/GroupedPosts";
import styles from "./postsByUser.module.css";
import Loader from "../Loaders/Loaders";
import ErrorMessage from "../ErrorMessages/ErrorMessage";
import UserPosts from "./UserPosts";

const PostsByUserPage = () => {
  const { t } = useTranslation(); // Get the translation function
  const { groupedPosts, loading, error } = useGroupedPosts();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("title")}</h1> {/* Translated title */}
      <div className={styles.grid}>
        {Object.entries(groupedPosts).map(([userId, { username, posts }]) => (
          <UserPosts key={userId} username={username} posts={posts} />
        ))}
      </div>
    </div>
  );
};

export default PostsByUserPage;
