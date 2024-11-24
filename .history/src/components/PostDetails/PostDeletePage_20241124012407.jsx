import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PostUpdate from "./PostUpdate";
import PostDelete from "./PostDelete";
import styles from "./PostDetailsPage.module.css";

const PostDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const data = await response.json();
        setPost(data);
      } catch {
        setMessage(t("fetchError"));
      }
    };

    fetchPost();
  }, [id, t]);

  return (
    <div className={styles.postDetails}>
      <h1>{t("postDetails")}</h1>
      {post && (
        <div className={styles.card}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>{t("userId")}: {post.userId}</p>

          <div className={styles.actions}>
            {/* Pass setIsEditing to toggle edit mode */}
            <PostUpdate post={post} setMessage={setMessage} setIsEditing={setIsEditing} />
            {!isEditing && (
              <PostDelete postId={post.id} setMessage={setMessage} />
            )}
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
