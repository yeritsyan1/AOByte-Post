import React from "react";
import withPost from "../hoc/WithPost";
import { Button } from "@mui/material";

export default function MyPosts(props) {
  const { posts } = props;

  return (
    <div style={{ paddingLeft: "15px" }}>
      <h1> My Posts </h1>
      <h2> You have {posts.totalCount} posts. </h2>
      <Button
        variant="contained"
        onClick={() => {
          fetch("/Email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }}
      >
        Verify Email
      </Button>
    </div>
  );
}

export const MyPostWithPostHOC = withPost(MyPosts);
