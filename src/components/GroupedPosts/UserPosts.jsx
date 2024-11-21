import React from "react";
import { Link } from "react-router-dom";

const UserPosts = ({ username, posts }) => (
  <div className="userPosts">
    <h2 className="username">{username}</h2>
    <ul className="postsList">
      {posts.map((post) => (
        <li key={post.id} className="postItem">
          <Link to={`/posts/${post.id}`} className="postLink">
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default UserPosts;
