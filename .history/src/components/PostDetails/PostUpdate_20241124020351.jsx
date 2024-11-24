import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import styles from "./PostUpdate.module.css";

const schema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    title: yup
      .string()
      .required(t("validation.titleRequired"))
      .max(100, t("validation.titleLength100")),
    body: yup
      .string()
      .required(t("validation.descriptionRequired"))
      .max(500, t("validation.descriptionLength500")),
  });
};
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
      setIsEditing(true);
    } else {
      setIsEditing(false);
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
          <input type="text" {...register("title")} />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}

          <label>{t("description")}</label>
          <textarea {...register("body")} />
          {errors.body && <p className={styles.error}>{errors.body.message}</p>}

          <button type="submit" className={styles.saveButton}>
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
