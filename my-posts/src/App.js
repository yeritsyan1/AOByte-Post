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
import {
  selectMyPosts,
  /* latestMyPost, */ actionMyPosts,
} from "./redux/slices/myPostReducer";
import {
  selectPost,
  latestPost,
  updatePosts,
} from "./redux/slices/postReducer";
import AdditionalActions from "./hoc/props/AdditionalActions";
import EmptyComponent from "./hoc/props/EmptyComponent";
import FilteredPage from "./components/FilteredPage";
import { createPost } from "./hoc/postEdit/actions/createPost";
import { actionPost } from "./redux/slices/postReducer";

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
                //latestPost={latestPost}
                AdditionalActions={EmptyComponent}
                path="/posts"
                action={actionPost}
                headers={{ "Content-Type": "application/json", isActive: true }}
                stateName="posts"
              />
            }
          ></Route>
          <Route path={`/${POST}/*`} element={<PostPage />}></Route>
          <Route
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
          ></Route>
          <Route
            path={MYPOSTS}
            element={
              <ProtectRoute>
                <MyPostWithPostHOC
                  selectPost={selectMyPosts}
                  //latestPost={latestMyPost}
                  AdditionalActions={AdditionalActions}
                  path="/myPost"
                  action={actionMyPosts}
                  headers={{
                    Authorization: `Bearer ${localStorage
                      .getItem("token")
                      ?.substring(
                        1,
                        localStorage.getItem("token").length - 1
                      )}`,
                    author: localStorage
                      .getItem("user")
                      ?.substring(1, localStorage.getItem("user").length - 1),
                    token: localStorage.getItem("token"),
                  }}
                  stateName="myPosts"
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
