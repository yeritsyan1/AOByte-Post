import React, { useEffect, useState } from "react";
import Post from "./Post";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./Filter";
import SignIn from "./registration/SignIn";
import { latestPost, selectPost } from "../redux/slices/postReducer";

export default function NewsFeed() {
  const posts = useSelector(selectPost);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(latestPost());
  }, []);

  return (
    <React.Fragment>
      <Filter />
      {posts.map((item) => {
        return <Post key={uuid()} item={item} setOpen={setOpen} />;
      })}
      <SignIn open={open} setOpen={setOpen} />
    </React.Fragment>
  );
}
