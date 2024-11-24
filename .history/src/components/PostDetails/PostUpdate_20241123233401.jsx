// UpdatePost.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PostUpdate.module.css";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required").max(100, "Title must be less than 100 characters"),
  body: yup.string().required("Description is required").max(500, "Description must be less than 500 characters"),
});

const UpdatePost = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  // Fetch post data on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setValue("title", data.title);
          setValue("body", data.body);
        } else {
          setError(t("errorLoadingPost"));
        }
      } catch (err) {
        setError(t("errorLoadingPost"));
      }
    };

    fetchPost();
  }, [id, setValue, t]);

  // Handle form submission for updating post
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      });

      if (response.ok) {
        alert(t("successUpdating"));
        navigate("/"); // Navigate back after successful update
      } else {
        alert(t("failedUpdating"));
      }
    } catch (error) {
      alert(t("failedUpdating"));
    }
  };

  // Handle delete post action
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert(t("successDeleting"));
        navigate("/"); // Redirect to homepage after deletion
      } else {
        alert(t("failedDeleting"));
      }
    } catch (error) {
      alert(t("failedDeleting"));
    }
  };

  if (error) return <p>{error}</p>;
  if (!post) return <p>{t("loading")}</p>;

  return (
    <div className={styles.updatePost}>
      <h2>{t("editPost")}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>{t("title")}</label>
          <input {...register("title")} />
          {errors.title && <p className={styles.error}>{t(errors.title.message)}</p>}
        </div>

        <div>
          <label>{t("description")}</label>
          <textarea {...register("body")} />
          {errors.body && <p className={styles.error}>{t(errors.body.message)}</p>}
        </div>

        <div className={styles.actions}>
          <button type="submit" className={`${styles.saveBtn} ${styles.btn}`}>
            {t("save")}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`${styles.cancelBtn} ${styles.btn}`}
          >
            {t("cancel")}
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3>{t("confirmDelete")}</h3>
            <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleDelete}>
              {t("yes")}
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => setShowDeleteConfirm(false)}
            >
              {t("no")}
            </button>
          </div>
        </div>
      )}

      <button
        className={`${styles.deleteBtn} ${styles.btnDanger}`}
        onClick={() => setShowDeleteConfirm(true)}
      >
        {t("delete")}
      </button>
    </div>
  );
};

export default UpdatePost;
