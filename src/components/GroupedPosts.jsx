import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostsByUserPage = () => {
  const [groupedPosts, setGroupedPosts] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users");
        }
        const users = await usersResponse.json();
        const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts");
        }
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
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts by User</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(groupedPosts).map(([userId, { username, posts }]) => (
          <div key={userId}>
            <h2>{username}</h2>
            <ul className="space-y-2">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsByUserPage;
