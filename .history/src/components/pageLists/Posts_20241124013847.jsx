import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import styles from "./Posts.module.css";

const Posts = ({ posts, handleLoadMore, canLoadMore }) => {
  const { t } = useTranslation(); 

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post.id} className={styles.card}>
          <h3>{post.username}</h3>
          <p>
            <strong>{t("userId")}:</strong> {post.id} 
          </p>
          <p>
            <strong>{t("postTitle")}:</strong> {post.title} 
          </p>
        
          <Link to={`/post/${post.id}`} className={styles.detailsButton}>
            {t("viewDetails")} 
          </Link>
        </div>
      ))}
      {canLoadMore && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          {t("loadMore")}
        </button>
      )}
    </div>
  );
};

export default Posts;
