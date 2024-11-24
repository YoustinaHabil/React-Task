import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./PostDetailsActions.module.css";

const PostDetailsActions = ({ post, setMessage }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => setShowModal(true);

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setMessage(t("successDeleting"));
        setShowModal(false);
      } else {
        setMessage(t("failedDeleting"));
      }
    } catch (error) {
      setMessage(t("errorDeleting"));
    }
  };

  const cancelDelete = () => setShowModal(false);

  return (
    <div className={styles.actions}>
      <Link to={`/edit/${post.id}`} className={`${styles.editBtn} ${styles.btn}`}>
        {t("edit")}
      </Link>
      <button className={`${styles.deleteBtn} ${styles.btn}`} onClick={handleDeleteClick}>
        {t("delete")}
      </button>

      {/* Modal for Confirming Deletion */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3>{t("confirmDelete")}</h3>
            <div className={styles.modalButtons}>
              <button className={styles.modalConfirmBtn} onClick={confirmDelete}>
                {t("yes")}
              </button>
              <button className={styles.modalCancelBtn} onClick={cancelDelete}>
                {t("no")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailsActions;
