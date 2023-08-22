import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

export default function Reply(props) {
  const { rep, setOpen } = props;
  const [reReply, setReReply] = useState("");

  const sendReReply = async () => {
    localStorage.getItem("token") || setOpen(true);
    await fetch("/sendReReply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        author: { email: "Tigran" },
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
