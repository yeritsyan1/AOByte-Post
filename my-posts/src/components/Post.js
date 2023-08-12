import React, { useState } from "react";
import { Box, Button, Divider, TextField } from "@mui/material";
import { v4 as uuid } from "uuid";
import Comments from "./Comments";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import { POST, USER } from "../constants/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Post = (props) => {
  const { setOpen, item } = props;
  const day = new Date().getDate(item.date);
  const month = new Date().getMonth(item.date) + 1
  const year = new Date().getUTCFullYear(item.date)
  const [comment, setComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const commentList = useSelector(function (state) {
    return state.comments;
  });
  const comments = commentList.filter(
    (comment) => comment.postId === item.postId
  );

  /*  const rateComment = async (elem) => {
  item.comments.map((item) => {
        if (item.id === elem.id) {
          return {
            ...elem,
            rate: item.rate + 1,
            ratedUser: [
              ...elem.ratedUser,
              JSON.parse(localStorage.getItem(USER)).providerData[0].email,
            ],
          };
        } else {
          return item;
        }
      })
  }; */

  return (
    <>
      <Card
        style={{
          width: "80%",
          margin: "10px auto",
          backgroundColor: "wheat",
        }}
      >
        <CardContent> {day}.{month}.{year} </CardContent>
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
            <Link to={`/${POST}/${item._id}`}> {item.title} </Link>
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
            // disabled={item?.liked.includes(
            //   JSON.parse(localStorage.getItem(USER)).providerData[0].email
            // )}
            onClick={async () => {
              localStorage.getItem(USER) || setOpen(true);
            }}
          >
            Like
          </Button>
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
            onClick={async () => {
              await setComment("");
              localStorage.getItem(USER) || setOpen(true);
            }}
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
            {comments.map((comment) => {
              return (
                <React.Fragment key={uuid()}>
                  <Comments comment={comment} setOpen={setOpen} />
                </React.Fragment>
              );
            })}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Post;
