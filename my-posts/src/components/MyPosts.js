import React from "react";
import withPost from "../hoc/WithPost";

export default function MyPosts() {
  return (
    <div style={{ paddingLeft: "15px" }}>
      <h1> My Posts </h1>
    </div>
  );
}

export const MyPostWithPostHOC = withPost(MyPosts);
