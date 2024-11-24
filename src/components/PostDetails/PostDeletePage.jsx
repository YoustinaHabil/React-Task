import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PostDelete.module.css";

const PostDelete = ({ postId, setMessage }) => {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => setShowConfirm(true);

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setMessage(t("deleteSuccess"));
        setShowConfirm(false);
      } else {
        setMessage(t("deleteFailed"));
      }
    } catch {
      setMessage(t("deleteError"));
    }
  };

  const cancelDelete = () => setShowConfirm(false);

  return (
    <div>
      <button onClick={handleDeleteClick} className={styles.deleteButton}>
        {t("delete")}
      </button>

      {showConfirm && (
        <div className={styles.popupBackdrop}>
          <div className={styles.popupCard}>
            <p>{t("confirmDelete")}</p>
            <div className={styles.popupActions}>
              <button
                onClick={confirmDelete}
                className={styles.confirmButton}
              >
                {t("yes")}
              </button>
              <button
                onClick={cancelDelete}
                className={styles.cancelButton}
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
