import React from "react";
import useFetchData from "../Hooks/GroupedPosts";
import Loader from "../Loaders/Loaders";
import ErrorMessage from "../ErrorMessages/ErrorMessage";

const PostsByUserPage = () => {
  const { groupedPosts, error, loading } = useFetchData();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container">
      <h1 className="title">Posts by User</h1>
      <div className="grid">
        {Object.entries(groupedPosts).map(([userId, { username, posts }]) => (
          <div key={userId} className="post-card">
            <h2>{username}</h2>
            {posts.map((post) => (
              <p key={post.id}>{post.title}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsByUserPage;
