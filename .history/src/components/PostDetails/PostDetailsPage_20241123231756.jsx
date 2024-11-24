import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PostDetailsActions from "./PostDetailsActions";
import PostUpdateForm from "./PostUpdateForm";
import styles from "./PostDetails.module.css";

const PostDetailsPage = () => {
  const { id } = useParams(); // Extract post ID from URL
  const { t } = useTranslation();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  const handleCancelEdit = () => setIsEditing(false);

  return (
    <div className={styles.postDetails}>
      {message && <p className={styles.message}>{message}</p>}
      {post ? (
        <>
          {!isEditing ? (
            <>
              <div className={styles.postCard}>
                <h2>{post.title}</h2>
                <p>
                  <strong>{t("username")}:</strong> {post.username || t("unknown")}
                </p>
                <p>
                  <strong>{t("postId")}:</strong> {post.id}
                </p>
                <p>
                  <strong>{t("description")}:</strong> {post.body}
                </p>
              </div>
              <PostDetailsActions
                post={post}
                setMessage={setMessage}
                onEdit={() => setIsEditing(true)}
              />
            </>
          ) : (
            <PostUpdateForm
              post={post}
              setMessage={setMessage}
              onCancel={handleCancelEdit}
            />
          )}
        </>
      ) : (
        <p>{t("loading")}</p>
      )}
    </div>
  );
};

export default PostDetailsPage;
