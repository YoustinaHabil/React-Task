import React from "react";
import { Link } from "react-router-dom";
import styles from "./Posts.module.css";

const Posts = ({ posts, handleLoadMore, canLoadMore }) => (
  <div className={styles.container}>
    {posts.map((post) => (
      <div key={post.id} className={styles.card}>
        <h3>{post.username}</h3>
        <p>
          <strong>ID:</strong> {post.id}
        </p>
        <p>
          <strong>Title:</strong> {post.title}
        </p>
        {/* Add a "View Details" button styled as a link */}
        <Link to={`/post/${post.id}`} className={styles.detailsButton}>
          View Details
        </Link>
      </div>
    ))}
    {canLoadMore && (
      <button className={styles.loadMore} onClick={handleLoadMore}>
        Load More
      </button>
    )}
  </div>
);

export default Posts;
