import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostDetailsPage = () => {
  const { id } = useParams();  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedBody, setUpdatedBody] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        setPost(data);
        setUpdatedTitle(data.title);
        setUpdatedBody(data.body);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);  

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title: updatedTitle,
        }),
      });

      if (response.ok) {
        setMessage('Post updated successfully!');
        setEditMode(false);
      } else {
        setMessage('Failed to update post.');
      }
    } catch (error) {
      setMessage('Error updating post.');
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Post deleted successfully!');
      } else {
        setMessage('Failed to delete post.');
      }
    } catch (error) {
      setMessage('Error deleting post.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Post Details</h1>
      {post && (
        <div>
          <h2>
            {editMode ? (
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            ) : (
              post.title
            )}
          </h2>
          <p>
            {editMode ? (
              <textarea
                value={updatedBody}
                onChange={(e) => setUpdatedBody(e.target.value)}
              />
            ) : (
              post.body
            )}
          </p>
          <p>User ID: {post.userId}</p>
          {editMode ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
          <button onClick={handleDeleteClick}>Delete</button>

          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
