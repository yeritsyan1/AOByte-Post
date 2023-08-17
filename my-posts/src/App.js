import React from "react";
import SignUp from "./components/registration/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/registration/SignIn";
import { CreatePostWithHOC } from "./hoc/props/EmptyComponent";
//import Profile from "./components/Profile";
import ProtectRoute from "./components/ProtectRoute";
import ProtectLogin from "./components/registration/ProtectLogin";
import {
  CREATEPOST,
  MYPOSTS,
  POST,
  /* PROFILE, */ SIGNIN,
  SIGNUP,
  USER,
} from "./constants/constants";
import PageNotFound from "./components/PageNotFound";
import { NewsFeedWithPostHOC } from "./components/NewsFeed";
import { MyPostWithPostHOC } from "./components/MyPosts";
import PostPage from "./components/PostPage";
import { selectMyPosts, latestMyPost } from "./redux/slices/myPostReducer";
import { selectPost, latestPost } from "./redux/slices/postReducer";
import AdditionalActions from "./hoc/props/AdditionalActions";
import EmptyComponent from "./hoc/props/EmptyComponent";
import FilteredPage from "./components/FilteredPage";
import { createPost } from "./hoc/postEdit/actions/createPost";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={`/${SIGNUP}`}
            element={
              <ProtectLogin>
                <SignUp />
              </ProtectLogin>
            }
          ></Route>
          <Route
            path={`/${SIGNIN}`}
            element={
              <ProtectLogin>
                <SignIn
                  open={true}
                  setOpen={(e) => {
                    return;
                  }}
                />
              </ProtectLogin>
            }
          ></Route>
          <Route
            path="/"
            element={
              <NewsFeedWithPostHOC
                selectPost={selectPost}
                latestPost={latestPost}
                AdditionalActions={EmptyComponent}
              />
            }
          ></Route>
          <Route path={`/${POST}/*`} element={<PostPage />}></Route>
          {/* <Route
            path={`/${CREATEPOST}`}
            element={
              <ProtectRoute>
                <CreatePostWithHOC
                  _id=""
                  item={{
                    user: USER,
                    title: "",
                    body: "",
                    category: "General",
                    comments: [],
                  }}
                  name="Create Post"
                  buttonName="Create"
                  createOrUpdate={createPost}
                />
              </ProtectRoute>
            }
          ></Route> */}
          <Route
            path={MYPOSTS}
            element={
              <ProtectRoute>
                <MyPostWithPostHOC
                  selectPost={selectMyPosts}
                  latestPost={latestMyPost}
                  AdditionalActions={AdditionalActions}
                />
              </ProtectRoute>
            }
          ></Route>
          <Route path="/search" element={<FilteredPage />}></Route>
          {/*  <Route
            path={`/${PROFILE}`}
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          ></Route> */}
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
