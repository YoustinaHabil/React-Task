import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import styles from "./PostUpdate.module.css";

// Yup schema for validation
const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required") // Custom error message
    .max(100, "Title cannot exceed 100 characters"),
  body: yup
    .string()
    .required("Description is required") // Custom error message
    .max(500, "Description cannot exceed 500 characters"),
});

const PostUpdate = ({ post, setMessage, setIsEditing }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // Validate on every change
  });

  useEffect(() => {
    if (editMode) {
      setValue("title", post.title);
      setValue("body", post.body);
      setIsEditing(true);
    } else {
      setIsEditing(false);
      reset(); // Clear the form and errors when exiting edit mode
    }
  }, [editMode, post, setValue, setIsEditing, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setMessage(t("updateSuccess"));
        setEditMode(false);
      } else {
        setMessage(t("updateFailed"));
      }
    } catch {
      setMessage(t("updateError"));
    }
  };

  const handleEditClick = () => setEditMode(true);

  return (
    <div>
      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.editForm}>
          <label>{t("postTitle")}</label>
          <input
            type="text"
            {...register("title")}
            className={`${errors.title ? styles.invalidInput : ""}`}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}

          <label>{t("description")}</label>
          <textarea
            {...register("body")}
            className={`${errors.body ? styles.invalidInput : ""}`}
          />
          {errors.body && <p className={styles.error}>{errors.body.message}</p>}

          <button
            type="submit"
            className={styles.saveButton}
            disabled={!isValid} // Disable submit button if the form is invalid
          >
            {t("save")}
          </button>
        </form>
      ) : (
        <button onClick={handleEditClick} className={styles.editButton}>
          {t("edit")}
        </button>
      )}
    </div>
  );
};

export default PostUpdate;
ttttttttttttttttttttt