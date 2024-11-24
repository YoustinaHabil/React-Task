import React, { useState } from "react";
import ErrorMessages from "../../constans/ErrorMessaage";
import styles from "./PostDelete.module.css"; // Import the CSS Module

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
        <div className={styles["modal-backdrop"]}>
          <div className={styles["modal-content"]}>
            <h3>Are you sure you want to delete this post?</h3>
            <div className={styles["modal-buttons"]}>
              <button
                onClick={confirmDelete}
                className={styles["modal-confirm-btn"]}
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className={styles["modal-cancel-btn"]}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDelete;
