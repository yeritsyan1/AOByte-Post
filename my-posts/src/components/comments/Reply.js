import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { CURRENTUSER, TOKEN } from "../../constants/constants";

export default function Reply(props) {
  const { rep, setOpen } = props;
  const [reReply, setReReply] = useState("");

  const sendReReply = async () => {
    TOKEN || setOpen(true);
    await fetch("/sendReReply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: TOKEN,
      },
      body: JSON.stringify({
        author: { email: JSON.parse(CURRENTUSER)._id },
        body: reReply,
        date: Date.now(),
        rate: 0,
        parentId: null,
        idReplyParent: rep._id,
      }),
    }).then(() => {
      setReReply("");
    });
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
