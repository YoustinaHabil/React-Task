import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
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

const UpdatePost = () => {
  const { id } = useParams(); // Get the post ID from the route
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

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

  // Fetch the post details to pre-fill the form
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

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      });

      if (response.ok) {
        alert(t("successUpdating"));
        navigate("/"); // Navigate back to the home page after updating
      } else {
        alert(t("failedUpdating"));
      }
    } catch (error) {
      alert(t("failedUpdating"));
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>{t("loading")}</p>;
  }

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
    </div>
  );
};

export default UpdatePost;

