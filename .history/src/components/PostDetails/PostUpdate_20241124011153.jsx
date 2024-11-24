import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import styles from "./PostUpdate.module.css";
import ErrorMessages from "../../constans/ErrorMessaage";

// Yup schema for validation
const schema = yup.object().shape({
  title: yup
    .string()
    .required(ErrorMessages
      .TitleRequired)
    .max(100, ErrorMessages.TitleMaxLength),
  body: yup
    .string()
    .required(ErrorMessages.BodyRequired)
    .max(500, ErrorMessages.BodyMaxLength),
});

const PostUpdate = ({ post, setMessage }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  // React Hook Form setup with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema), // Attach yup validation to the form
  });

  // Pre-fill form with post data when edit mode is enabled
  useEffect(() => {
    if (editMode) {
      setValue("title", post.title);
      setValue("body", post.body);
    }
  }, [editMode, post, setValue]);

  const onSubmit = async (data) => {
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
            title: data.title,
            body: data.body,
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

  const handleEditClick = () => setEditMode(true);

  return (
    <div>
      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.editForm}>
          <div>
            <label>{t("postTitle")}</label>
            <input
              type="text"
              {...register("title")} // Register the title field
            />
            {errors.title && <p className={styles.error}>{errors.title.message}</p>} {/* Show validation error */}
          </div>
          <div>
            <label>{t("description")}</label>
            <textarea
              {...register("body")} // Register the body field
            />
            {errors.body && <p className={styles.error}>{errors.body.message}</p>} {/* Show validation error */}
          </div>
          <button type="submit">{t("save")}</button>
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
