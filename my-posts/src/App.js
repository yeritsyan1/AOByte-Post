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
import NewsFeed from "./components/NewsFeed";
import MyPosts from "./components/MyPosts";
import PostPage from "./components/PostPage";

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
          <Route path="/" element={<NewsFeed />}>
          </Route>
          <Route path={`/${POST}/*`} element={<PostPage />}>
          </Route>
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
                <MyPosts />
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
