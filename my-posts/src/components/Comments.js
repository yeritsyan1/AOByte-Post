import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const Comments = (props) => {
  const [rateValue, setRateValue] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div
      style={{
        maxHeight: "250px",
        overflow: "scroll",
        borderBottom: "2px black solid",
        textAlign: "left",
        padding: "0 15px",
      }}
    >
      <span> {props.comment.commentAuthor} </span>
      <p> {props.comment.body} </p>
      <div>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Rating
            name="simple-controlled"
            value={rateValue}
            onChange={(event, newValue) => {
              setRateValue(newValue);
            }}
          />
        </Box>
        <Typography component="legend"> Rate: {props.comment.rate}</Typography>
      </div>
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
    </div>
  );
};

export default Comments;
