import React, { createContext, useState, useEffect, useContext } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const grouped = data.reduce((acc, post) => {
          if (!acc[post.userId]) {
            acc[post.userId] = [];
          }
          acc[post.userId].push({ id: post.id, title: post.title ,body: post.body , userId: post.userId});
          return acc;
        }, {});

        setGroupedData(grouped); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <DataContext.Provider value={{ groupedData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};


export const useData = () => useContext(DataContext);
