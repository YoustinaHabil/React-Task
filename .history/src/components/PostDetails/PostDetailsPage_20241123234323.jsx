import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import PostDetailsActions from './PostDetailsActions';  // The component for handling Edit/Delete actions
import styles from './PostDetails.module.css';

const PostDetails = () => {
  const { id } = useParams(); // Extract the post ID from the URL
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  // Fetch post details by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          setError(t('errorLoadingPost'));
        }
      } catch (err) {
        setError(t('errorLoadingPost'));
      }
    };

    fetchPost();
  }, [id, t]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>{t('loading')}</p>;
  }

  return (
    <div className={styles.postDetails}>
      <h2>{t('postDetails')}</h2>
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      {/* Post Actions (Edit/Delete) */}
      <PostDetailsActions post={post} setMessage={setError} />

      <button className={styles.goBackBtn} onClick={() => navigate(-1)}>
        {t('goBack')}
      </button>
    </div>
  );
};

export default PostDetails;
