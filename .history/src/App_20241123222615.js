import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./store/DataContext";
import { lazy, Suspense } from "react";
import Loader from "./components/Loaders/Loaders.jsx";
im
import Header from "./components/Header/header.jsx";
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
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>

   
      <DataProvider>
        <Router>
          <Header></Header>
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
  
    </I18nextProvider>
  );
}

export default App;
