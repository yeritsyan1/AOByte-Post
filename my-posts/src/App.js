import React, { useEffect } from "react";
import SignUp from "./components/registration/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/registration/SignIn";
import { CreatePostWithHOC } from "./hoc/props/EmptyComponent";
import ProtectRoute from "./components/ProtectRoute";
import ProtectLogin from "./components/registration/ProtectLogin";
import {
  CREATEPOST,
  CURRENTUSER,
  MYPOSTS,
  POST,
  SIGNIN,
  SIGNUP,
  TOKEN,
} from "./constants/constants";
import PageNotFound from "./components/PageNotFound";
import { NewsFeedWithPostHOC } from "./components/NewsFeed";
import { MyPostWithPostHOC } from "./components/MyPosts";
import PostPage from "./components/PostPage";
import { selectMyPosts, actionMyPosts } from "./redux/slices/myPostReducer";
import { selectPost } from "./redux/slices/postReducer";
import AdditionalActions from "./hoc/props/AdditionalActions";
import EmptyComponent from "./hoc/props/EmptyComponent";
import FilteredPage from "./components/FilteredPage";
import { createPost } from "./hoc/postEdit/actions/createPost";
import { actionPost } from "./redux/slices/postReducer";
import { useDispatch } from "react-redux";
import { updateToken } from "./redux/slices/refreshTokenReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (TOKEN) {
      dispatch(updateToken());
    }
  }, []);

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
            path={`${MYPOSTS}/*`}
            element={
              <ProtectRoute>
                <MyPostWithPostHOC
                  selectPost={selectMyPosts}
                  AdditionalActions={AdditionalActions}
                  path="/myPost"
                  action={actionMyPosts}
                  headers={{
                    Authorization: `Bearer ${JSON.parse(TOKEN)}`,
                    author: JSON.parse(CURRENTUSER)?.email,
                    token: JSON.parse(TOKEN),
                  }}
                  stateName="myPosts"
                />
              </ProtectRoute>
            }
          ></Route>
          <Route path="/search" element={<FilteredPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
