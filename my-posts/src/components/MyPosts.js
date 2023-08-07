import React from "react";
import Post from "./Post";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";

export default function MyPosts() {
  const posts = useSelector(function (state) {
    return state.myPosts;
  });

  return (
    <div style={{ paddingLeft: "15px" }}>
      <h1> My Posts </h1>
      {posts.map((item) => {
        return (
          <Post
            key={uuid()}
            item={item}
            setOpen={() => {
              return;
            }}
          />
        );
      })}
    </div>
  );
}
