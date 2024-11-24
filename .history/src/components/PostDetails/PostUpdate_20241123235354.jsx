import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './PostUpdate.module.css'; // Your styles file

// Define the validation schema using Yup
const validationSchema = yup.object().shape({
  title: yo
    .string()
    .required('Title is required')
    .max(100, 'Title can be at most 100 characters'),
  body: yup
    .string()
    .required('Description is required')
    .max(500, 'Description can be at most 500 characters'),
});

const UpdatePost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  // Set up React Hook Form with Yup validation resolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  });

  // Fetch the post details to pre-fill the form
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setValue('title', data.title);
          setValue('body', data.body);
        } else {
          setError(t('errorLoadingPost'));
        }
      } catch (err) {
        setError(t('errorLoadingPost'));
      }
    };

    fetchPost();
  }, [id, setValue, t]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...data }),
        }
      );

      if (response.ok) {
        alert(t('successUpdating'));
        navigate('/'); // Navigate back to the home page after updating
      } else {
        alert(t('failedUpdating'));
      }
    } catch (error) {
      alert(t('failedUpdating'));
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>{t('loading')}</p>;
  }

  return (
    <div className={styles.updatePost}>
      <h2>{t('editPost')}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>{t('title')}</label>
          <input
            {...register('title')}
            className={errors.title ? styles.inputError : ''}
          />
          {errors.title && (
            <p className={styles.error}>{t(errors.title.message)}</p>
          )}
        </div>

        <div>
          <label>{t('description')}</label>
          <textarea
            {...register('body')}
            className={errors.body ? styles.inputError : ''}
          />
          {errors.body && (
            <p className={styles.error}>{t(errors.body.message)}</p>
          )}
        </div>

        <div className={styles.actions}>
          <button type="submit" className={`${styles.saveBtn} ${styles.btn}`}>
            {t('save')}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`${styles.cancelBtn} ${styles.btn}`}
          >
            {t('cancel')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
