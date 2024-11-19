import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PostsGroupedByUser from "./components/GroupedPosts";

import ApiProvider, { DataProvider } from "./store/DataContext";
import AllPostsPage from "./components/pageList";
import PostsByUserPage from "./components/GroupedPosts";
import PostDetailsPage from "./components/postDetails";

function App() {
  return (
    <>
<DataProvider>
    <Router>
      <Routes>
      <Route path="/users" element={<PostsByUserPage />} />
      <Route path="/posts" element={<AllPostsPage />} />
      <Route path="/post/:id" element={<PostDetailsPage />} />

      </Routes>
    </Router>
    </DataProvider>
      {/* <DataProvider>
        <PostsGroupedByUser />
        <AllPostsPage/>
     
 
    
      </DataProvider> */}
    </>
  );
}

export default App;
