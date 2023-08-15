import React from "react";
import SignUp from "./components/registration/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/registration/SignIn";
import CreatePost from "./components/CreatePost";
//import Profile from "./components/Profile";
import ProtectRoute from "./components/ProtectRoute";
import ProtectLogin from "./components/registration/ProtectLogin";
import {
  CREATEPOST,
  MYPOSTS,
  POST,
  /* PROFILE, */ SIGNIN,
  SIGNUP,
} from "./constants/constants";
import PageNotFound from "./components/PageNotFound";
import { NewsFeedWithPostHOC } from "./components/NewsFeed";
import { MyPostWithPostHOC } from "./components/MyPosts";
import PostPage from "./components/PostPage";
import { selectMyPosts, latestMyPost } from "./redux/slices/myPostReducer";
import { selectPost, latestPost } from "./redux/slices/postReducer";
import DeleteButton from "./hoc/props/DeleteButton";
import EmptyComponent from "./hoc/props/EmptyComponent";

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
                DeleteButton={EmptyComponent}
              />
            }
          ></Route>
          <Route path={`/${POST}/*`} element={<PostPage />}></Route>
          <Route
            path={`/${CREATEPOST}`}
            element={
              <ProtectRoute>
                <CreatePost />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path={MYPOSTS}
            element={
              <ProtectRoute>
                <MyPostWithPostHOC
                  selectPost={selectMyPosts}
                  latestPost={latestMyPost}
                  DeleteButton={DeleteButton}
                />
              </ProtectRoute>
            }
          ></Route>
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
