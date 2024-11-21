import { useState, useEffect } from "react";

import ErrorMessages from "../../constans/ErrorMessaage";

const useFetchData = () => {
  const [groupedPosts, setGroupedPosts] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!usersResponse.ok) throw new Error(ErrorMessages.USERS_FETCH_ERROR);

        const postsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!postsResponse.ok) throw new Error(ErrorMessages.POSTS_FETCH_ERROR);

        const users = await usersResponse.json();
        const posts = await postsResponse.json();

        const grouped = posts.reduce((acc, post) => {
          const user = users.find((u) => u.id === post.userId);
          if (!acc[post.userId]) {
            acc[post.userId] = {
              username: user?.username || "Unknown User",
              posts: [],
            };
          }
          acc[post.userId].posts.push(post);
          return acc;
        }, {});

        setGroupedPosts(grouped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { groupedPosts, error, loading };
};

export default useFetchData;
