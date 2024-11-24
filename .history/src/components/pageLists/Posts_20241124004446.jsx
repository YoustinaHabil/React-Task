import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import styles from "./Posts.module.css";

const Posts = ({ posts, handleLoadMore, canLoadMore }) => {
  const { t } = useTranslation(); // Access translation function

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post.id} className={styles.card}>
          <h3>{post.username}</h3>
          <p>
            <strong>{t("userId")}:</strong> {post.id} {/* Translated label for "ID" */}
          </p>
          <p>
            <strong>{t("postTitle")}:</strong> {post.title} {/* Translated label for "Title" */}
          </p>
          {/* Add a "View Details" button styled as a link */}
          <Link to={`/post/${post.id}`} className={styles.detailsButton}>
            {t("viewDetails")} {/* Translated button text */}
          </Link>
        </div>
      ))}
      {canLoadMore && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          {t("loadMore")} {/* Translated "Load More" button text */}
        </button>
      )}
    </div>
  );
};

export default Posts;
