import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { newReReply } from "../../redux/slices/replyReducer";

export default function Reply(props) {
  const { rep, setOpen } = props;
  const [reReply, setReReply] = useState("");
  const dispatch = useDispatch();

  const sendReReply = () => {
    dispatch(newReReply(setOpen, reReply, setReReply, rep));
  };

  return (
    <div
      style={{
        padding: "5px",
        paddingLeft: "15px",
        margin: "2px",
        border: "1px solid black",
      }}
    >
      <h4> {rep.body} </h4>
      <TextField
        placeholder="Re-reply"
        value={reReply}
        onChange={(e) => setReReply(e.target.value)}
      />
      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        disabled={!reReply}
        onClick={sendReReply}
      >
        Re-Reply
      </Button>
    </div>
  );
}
