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
    .required(ErrorMessages.TitleRequired)
    .max(100, ErrorMessages.TitleMaxLength),
  body: yup
    .string()
    .required(ErrorMessages.BodyRequired)
    .max(500, ErrorMessages.BodyMaxLength),
});

const PostUpdate = ({ post, setMessage, setIsEditing }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editMode) {
      setValue("title", post.title);
      setValue("body", post.body);
      setIsEditing(true); // Notify parent to hide delete button
    } else {
      setIsEditing(false); // Notify parent to show delete button
    }
  }, [editMode, post, setValue, setIsEditing]);

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
        setMessage(t("successUpdating"));
        setEditMode(false);
      } else {
        setMessage(t("failedUpdating"));
      }
    } catch {
      setMessage(t("errorUpdating"));
    }
  };

  const handleEditClick = () => setEditMode(true);

  return (
    <div>
      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.editForm}>
          <div>
            <label>{t("postTitle")}</label>
            <input type="text" {...register("title")} />
            {errors.title && <p className={styles.error}>{errors.title.message}</p>}
          </div>
          <div>
            <label>{t("description")}</label>
            <textarea {...register("body")} />
            {errors.body && <p className={styles.error}>{errors.body.message}</p>}
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
