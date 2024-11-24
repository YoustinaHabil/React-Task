import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PostDelete.module.css";
import ErrorMessages from "../../constans/ErrorMessaage";

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
      <button onClick={handleDeleteClick} className={styles.deleteButton}>
        {t("delete")}
      </button>

      {/* Modal for Confirming Deletion */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3>{t("confirmDelete")}</h3>
            <div className={styles.modalButtons}>
              <button
                onClick={confirmDelete}
                className={styles.modalConfirmBtn}
              >
                {t("yes")}
              </button>
              <button
                onClick={cancelDelete}
                className={styles.modalCancelBtn}
              >
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
