import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./store/DataContext";
import { lazy, Suspense } from "react";
import Loader from "./components/Loaders/Loaders.jsx";
//LazyLoading
const PostsByUserPage = lazy(() =>
  import("./components/GroupedPosts/PostByUser")
);
const PostDetailsPage = lazy(() =>
  import("./components/PostDetails/PostDetailsPage")
);
const AllPostsPage = lazy(() =>
  import("./components/pageLists/pageList")
);

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <Routes>
            <Route
              path="/users"
              element={
                <Suspense fallback={<Loader />}>
                  <PostsByUserPage />
                </Suspense>
              }
            />
                 <Route
              path="/posts"
              element={
                <Suspense fallback={<Loader />}>
                  <AllPostsPage />
                </Suspense>
              }
            />

            <Route
              path="/post/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <PostDetailsPage />
                </Suspense>
              }
            />
          </Routes>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
