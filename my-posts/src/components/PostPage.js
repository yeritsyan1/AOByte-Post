import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { latestPost, selectPost } from "../redux/slices/postReducer";
import Post from "./Post";
import { v4 as uuid } from "uuid";
import SignIn from "./registration/SignIn";
import PageNotFound from "./PageNotFound";
import { Link } from "react-router-dom";
import { CREATEPOST } from "../constants/constants";

export default function PostPage() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/post") {
      return navigate("/");
    }
    dispatch(latestPost());
  }, []);

  return (
    <>
      <Link to={`/${CREATEPOST}`}> Create Post </Link>
      <Routes>
        {posts.map((item) => {
          return (
            <React.Fragment key={uuid}>
              <Route
                path={`/${item._id}/`}
                element={<Post item={item} setOpen={setOpen} />}
              ></Route>
              <Route path="*" element={<PageNotFound />}>
              </Route>
            </React.Fragment>
          );
        })}
      </Routes>
      <SignIn open={open} setOpen={setOpen} />
    </>
  );
}
