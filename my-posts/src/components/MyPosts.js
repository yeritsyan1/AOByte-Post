import React, { useEffect, useState } from "react";
import withPost from "../hoc/WithPost";
import { Button } from "@mui/material";
import SnackbarMessage from "./Snackbar";
import { useLocation } from "react-router";
import { CURRENTUSER, TOKEN } from "../constants/constants";

export default function MyPosts(props) {
  const { posts } = props;
  const [message, setMessage] = useState(null);
  const currentUser = JSON.parse(CURRENTUSER);
  const token = JSON.parse(TOKEN);
  const verifyPath = useLocation();

  const verify = async () => {
    await fetch("/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: currentUser,
        token,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
      })

      .then(() => {
        setTimeout(() => {
          return setMessage(null);
        }, 3000);
      });
  };

  const updateVerify = () => {
    fetch("/updateVerify", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: currentUser,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setMessage(res.message);
      })

      .then(() => {
        setTimeout(() => {
          return setMessage(null);
        }, 3000);
      });
  };

  useEffect(() => {
    if (verifyPath.search === `?&token=${token}`) {
      return updateVerify();
    }
  }, []);

  return (
    <div style={{ paddingLeft: "15px" }}>
      <h3> {currentUser.email} </h3>
      <h1> My Posts </h1>
      <h2> You have {posts.totalCount} posts. </h2>
      {currentUser.isEmailVerify || (
        <Button variant="contained" onClick={verify}>
          Verify Email
        </Button>
      )}
      {!!message && <SnackbarMessage message={message} />}
    </div>
  );
}

export const MyPostWithPostHOC = withPost(MyPosts);
