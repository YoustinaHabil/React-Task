import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessages from "../../constans/ErrorMessaage";
import Loader from "../Loaders/Loaders";
import ErrorMessage from "../ErrorMessages/ErrorMessage";
import PostUpdate from "./PostUpdate";
import PostDelete from "./PostDelete";
import styles from "./PostDetailsPage.module.css"; // Import the CSS Module

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if (!
