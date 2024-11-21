import React from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ filteredPosts, postsToShow, handleLoadMore }) => (
  <div className="posts-container">
    {filteredPosts.slice(0, postsToShow).map((post) => (
      <div key={post.id} className="post-card">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p>User ID: {post.userId}</p>
        <Link to={`/post/${post.id}`}>View Details</Link>
      </div>
    ))}
    {postsToShow < filteredPosts.length && (
      <button onClick={handleLoadMore}>Load More</button>
    )}
  </div>
);

export default Posts;
