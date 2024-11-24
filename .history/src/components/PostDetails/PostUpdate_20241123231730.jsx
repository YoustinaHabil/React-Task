import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import styles from "./PostUpdate.module.css";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("titleRequired")
    .max(100, "titleLenght100"),
  body: yup
    .string()
    .required("descriptionRequired")
    .max(500, "descriptionLenght500"),
});

const PostUpdateForm = ({ post, setMessage, onCancel }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

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
        onCancel(); // Close the form after success
      } else {
        setMessage(t("failedUpdating"));
      }
    } catch (error) {
      setMessage(t("failedUpdating"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        <button type="button" onClick={onCancel} className={`${styles.cancelBtn} ${styles.btn}`}>
          {t("cancel")}
        </button>
      </div>
    </form>
  );
};

export default PostUpdateForm;
