import React, { useState } from "react";
import ErrorMessages from "../../constans/ErrorMessaage";

const PostDelete = ({ postId, setMessage }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => setShowModal(true);

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setMessage(ErrorMessages.Success_Deleting);
        setShowModal(false);
      } else {
        setMessage(ErrorMessages.Failed_Deleting);
      }
    } catch (error) {
      setMessage(ErrorMessages.Error_Deleting);
    }
  };

  const cancelDelete = () => setShowModal(false);

  return (
    <div>
      <button onClick={handleDeleteClick}>Delete</button>

      {/* Modal for Confirming Deletion */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Are you sure you want to delete this post?</h3>
            <div className="modal-buttons">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDelete;
