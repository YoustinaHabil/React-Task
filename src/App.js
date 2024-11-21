import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./store/DataContext";
import AllPostsPage from "./components/pageLists/pageList";
import PostsByUserPage from "./components/GroupedPosts/PostByUser";
import PostDetailsPage from "./components/PostDetails/PostDetailsPage";
import PostDelete from "./components/PostDetails/PostDelete";
import PostUpdate from "./components/PostDetails/PostUpdate";

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/users" element={<PostsByUserPage />} />
            <Route path="/posts" element={<AllPostsPage />} />
            <Route path="/post/:id" element={<PostDetailsPage />} />
            <Route path="/post/:id" element={<PostDelete />} />
            <Route path="/post/:id" element={<PostUpdate />} />

          </Routes>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
