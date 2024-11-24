import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserPosts.module.css";

const UserPosts = ({ username, posts }) => (
  <div className={styles.card}>
    <h2 className={styles.username}>{username}</h2>
    <ul className={styles.postsList}>
      {posts.map((post) => (
        <li key={post.id} className={styles.postItem}>
          <Link to={`/posts/${post.id}`} className={styles.postLink}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default UserPosts;
