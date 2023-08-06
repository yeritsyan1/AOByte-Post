import React from "react";
import Post from "./Post";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";

export default function NewsFeed() {
  const posts = useSelector(function (state) {
    return state.posts;
  });

  return (
    <div>
      {posts.map((item) => {
        return <Post key={uuid()} item={item} />;
      })}
    </div>
  );
}
