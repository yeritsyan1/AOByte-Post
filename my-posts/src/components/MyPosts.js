import React, { useEffect, useState } from "react";
import withPost from "../hoc/WithPost";
import { Button } from "@mui/material";
import SnackbarMessage from "./Snackbar";
import { useLocation } from "react-router";
import { CURRENTUSER, TOKEN } from "../constants/constants";
import { useDispatch } from "react-redux";
import { sendLink, updateEmailVerify } from "../redux/slices/email";

export default function MyPosts(props) {
  const { posts } = props;
  const [message, setMessage] = useState(null);
  const currentUser = JSON.parse(CURRENTUSER);
  const token = JSON.parse(TOKEN);
  const verifyPath = useLocation();
  const dispatch = useDispatch();

  const verify = async () => {
    dispatch(sendLink(setMessage));
  };

  const updateVerify = () => {
    currentUser.isEmailVerify || dispatch(updateEmailVerify(setMessage));
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
