import React, { useState } from "react";
import { Box, Button, Divider, TextField } from "@mui/material";
import { v4 as uuid } from "uuid";
import Comments from "./Comments";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import { USER } from "../constants/constants";
import { useSelector } from "react-redux";

const Post = (props) => {
  const [comment, setComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const commentList = useSelector(function (state) {
    return state.comments;
  });

  const [comments, setComments] = useState(
    commentList.filter((comment) => comment.postId === props.item.postId)
  );

  /*  const rateComment = async (elem) => {
  props.item.comments.map((item) => {
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
        <CardHeader avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>} />
        <CardMedia component="img" maxheight="194" alt="" />
        <CardContent sx={{ textAlign: "center", padding: 0 }}>
          <a href={props.item.url}>
            <h2 style={{ margin: 0 }}> {props.item.title} </h2>
          </a>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.item.body.length > 200 ? (
              <>
                {props.item.body.slice(
                  0,
                  showAll ? props.item.body.length : 200
                )}
                <Button
                  onClick={() => {
                    setShowAll(!showAll);
                  }}
                >
                  {showAll ? "...less" : "...more"}
                </Button>
              </>
            ) : (
              props.item.body
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            // disabled={props.item?.liked.includes(
            //   JSON.parse(localStorage.getItem(USER)).providerData[0].email
            // )}
            onClick={async () => {}}
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
                  <Comments comment={comment} />
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
