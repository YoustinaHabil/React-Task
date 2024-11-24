import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PostDelete.module.css";

const PostDelete = ({ postId, setMessage }) => {
  const { t } = useTranslation();
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
        setMessage(t("successDeleting"));
        setShowModal(false);
      } else {
        setMessage(t("failedDeleting"));
      }
    } catch {
      setMessage(t("errorDeleting"));
    }
  };

  const cancelDelete = () => setShowModal(false);

  return (
    <div>
      <button onClick={handleDeleteClick} className={styles.deleteButton}>
        {t("delete")}
      </button>

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3>{t("confirmDelete")}</h3>
            <div className={styles.modalActions}>
              <button onClick={confirmDelete} className={styles.confirmButton}>
                {t("yes")}
              </button>
              <button onClick={cancelDelete} className={styles.cancelButton}>
                {t("no")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDelete;
