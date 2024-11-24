import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import Sort from "../Sort/Sort";
import Posts from "../Posts/Posts";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./AllPostsPage.module.css";

const AllPostsPage = () => {
  const [groupedData, setGroupedData] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data directly within the component
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [postsRes, usersRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        if (!postsRes.ok || !usersRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const posts = await postsRes.json();
        const users = await usersRes.json();

        // Map users to their posts
        const grouped = posts.map((post) => ({
          id: post.id,
          title: post.title,
          userId: post.userId,
          username: users.find((user) => user.id === post.userId)?.username || "U
