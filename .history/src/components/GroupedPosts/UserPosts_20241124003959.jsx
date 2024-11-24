import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import styles from "./UserPosts.module.css";

const UserPosts = ({ username, posts }) => {
  const { t } = useTranslation(); // Access the translation function

  return (
    <div className={styles.card}>
      <h2 className={styles.username}>{username}</h2>
      <ul className={styles.postsList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <Link to={`/posts/${post.id}`} className={styles.postLink}>
              {post.title} {/* The post title */}
              <h1 className={styles.title}>{t("title")}</h1> {/* Translated title */}

            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
