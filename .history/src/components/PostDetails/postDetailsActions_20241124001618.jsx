import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessages from "../../constans/ErrorMessaage";
import Loader from "../Loaders/Loaders";
import ErrorMessage from "../ErrorMessages/ErrorMessage";
import PostUpdate from "./PostUpdate";
// import PostUpdate from "./PostUpdate";
// import PostDelete from "./PostDelete";

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if (!response.ok) throw new Error(ErrorMessages.POSTS_FETCH_ERROR);
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>Post Details</h1>
      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>User ID: {post.userId}</p>

          <PostUpdate post={post} setMessage={setMessage} />
          <Post postId={id} setMessage={setMessage} />

          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
