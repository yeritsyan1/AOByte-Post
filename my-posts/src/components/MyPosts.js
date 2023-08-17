import React from "react";
import withPost from "../hoc/WithPost";

export default function MyPosts(props) {
  const { posts } = props;
  return (
    <div style={{ paddingLeft: "15px" }}>
      <h1> My Posts </h1>
      <h2> You have {posts.length} posts. </h2>
    </div>
  );
}

export const MyPostWithPostHOC = withPost(MyPosts);
