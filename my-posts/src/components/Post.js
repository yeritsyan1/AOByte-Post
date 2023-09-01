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
import { POST } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectPost } from "../redux/slices/postReducer";
import { updateLike } from "../redux/slices/like";
import { addComment } from "../redux/slices/commentsReducer";

const Post = (props) => {
  const { setOpen, item, AdditionalActions } = props;
  const currentUser = localStorage.getItem("currentUser");
  const [comment, setComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const posts = useSelector(selectPost);
  const checkLiked = item.likedUser.find(
    (item) => item === JSON.parse(currentUser)._id
  );

  const dispatch = useDispatch();
  const onLike = () => {
    dispatch(updateLike(posts.allPosts, item));
  };

  const sendComment = () => {
    dispatch(addComment(setComment, setOpen, comment, item));
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
              await (currentUser || setOpen(true));
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
