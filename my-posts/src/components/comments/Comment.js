import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Replies from "./Replies";
import Reply from "./Reply";
import { v4 as uuid } from "uuid";

export default function Comment(props) {
  const { comment } = props;
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState([]);

  useEffect(() => {
    fetch("/reply")
      .then((res) => res.json())
      .then((res) => setReply(res))
      .catch(() => {
        return;
      });
  }, []);

  return (
    <div>
      <h4> {comment.body} </h4>
      <TextField
        placeholder="Reply"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <Button
        disabled={!message.length}
        onClick={() => {
          setMessage("");
          fetch("/reply", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              author: { email: "Tigran" },
              body: message,
              date: Date.now(),
              rate: 0,
              parentId: comment._id,
            }),
          });
        }}
      >
        Send
      </Button>
      {reply
        .filter((re) => re.parentId === comment._id)
        .map((rep) => {
          return (
            <React.Fragment key={uuid()}>
              <Reply rep={rep} /> {/* first reply */}
              <Replies rep={rep} replies={reply} />
            </React.Fragment>
          );
        })}
    </div>
  );
}
