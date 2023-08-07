import React, { useState } from "react";
import Post from "./Post";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import SignIn from "./registration/SignIn";

export default function NewsFeed() {
  const posts = useSelector(function (state) {
    return state.posts;
  });
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Filter />
      {posts.map((item) => {
        return <Post key={uuid()} item={item} setOpen={setOpen} />;
      })}
      <SignIn open={open} setOpen={setOpen} />
    </div>
  );
}
