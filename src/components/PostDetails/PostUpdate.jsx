import React, { useState } from "react";
import ErrorMessages from "../../constans/ErrorMessaage";

const PostUpdate = ({ post, setMessage }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedBody, setUpdatedBody] = useState(post.body);

  const handleEditClick = () => setEditMode(true);

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: post.id,
            title: updatedTitle,
            body: updatedBody,
          }),
        }
      );

      if (response.ok) {
        setMessage(ErrorMessages.SuccessUpdating_Posts);
        setEditMode(false);
      } else {
        setMessage(ErrorMessages.FailedUpdating_posts);
      }
    } catch (error) {
      setMessage(ErrorMessages.FailedUpdating_posts);
    }
  };

  return (
    <div>
      {editMode ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedBody}
            onChange={(e) => setUpdatedBody(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default PostUpdate;
