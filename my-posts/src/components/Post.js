import React, { useState } from "react";
import { Box, Button, Divider, TextField } from "@mui/material";
import Comments from "./comments/Comments";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import { POST, USER } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionPost, selectPost } from "../redux/slices/postReducer";

const Post = (props) => {
  const { setOpen, item, AdditionalActions } = props;
  const [comment, setComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const posts = useSelector(selectPost);
  const checkLiked = item.likedUser.find(
    (item) =>
      item._id === JSON.stringify(localStorage.getItem("currentUser"))._id
  );

  const dispatch = useDispatch();
  const onLike = async () => {
    await dispatch({
      type: actionPost,
      payload: {
        posts: {
          ...posts,
          allPosts: posts.allPosts.map((currentPost) => {
            if (item._id === currentPost._id) {
              return {
                ...item,
                rate: ++item.rate,
                likedUser: [
                  JSON.parse(localStorage.getItem("currentUser"))?._id,
                ],
              };
            } else {
              return currentPost;
            }
          }),
        },
      },
    });

    await fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        _id: item._id,
        rate: item.rate,
        likedUser: JSON.parse(localStorage.getItem("currentUser"))?._id,
      }),
    });
  };

  const sendComment = async () => {
    await setComment("");
    localStorage.getItem(USER) || setOpen(true);
    fetch("/sendComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        author: {
          email: JSON.parse(localStorage.getItem("currentUser"))?.email,
        },
        body: comment,
        date: Date.now(),
        rate: 0,
        postId: item._id,
      }),
    });
  };

  return (
    <>
      <Card
        style={{
          width: "80%",
          margin: "10px auto",
          backgroundColor: "wheat",
        }}
      >
        <CardContent>
          <AdditionalActions item={item} />
        </CardContent>
        <CardContent>{new Date(item.date).toLocaleDateString()}</CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }}> {item.author[0]} </Avatar>
            }
          />
          <CardContent> {item.author} </CardContent>
        </Box>
        <CardContent sx={{ textAlign: "center", padding: 0 }}>
          <h2 style={{ margin: 0 }}>
            <Link to={`/${POST}/${item._id}`} state={{ item }}>
              {item.title}
            </Link>
          </h2>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.body.length > 200 ? (
              <>
                {item.body.slice(0, showAll ? item.body.length : 200)}
                <Button
                  onClick={() => {
                    setShowAll(!showAll);
                  }}
                >
                  {showAll ? "...less" : "...more"}
                </Button>
              </>
            ) : (
              item.body
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            disabled={!!checkLiked}
            onClick={async () => {
              (await localStorage.getItem(USER)) || setOpen(true);
              await onLike();
            }}
          >
            Like
          </Button>
          {!!item.rate && <CardContent> {item.rate} </CardContent>}
        </CardActions>
        <CardContent sx={{ textAlign: "center" }}>
          <TextField
            placeholder="Comment"
            multiline
            rows="2"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button
            variant="contained"
            disabled={comment.length < 1}
            onClick={sendComment}
          >
            Send
          </Button>
          <Divider />
        </CardContent>
        <CardContent>
          <Box>
            <h3
              style={{ color: "red", textAlign: "left", padding: "0px 10px" }}
            >
              Comments:
            </h3>
            <Comments post={item} setOpen={setOpen} />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Post;
