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

  const sendReply = () => {
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
        idReplyParent: null,
      }),
    });
  };

  return (
    <div
      style={{
        padding: "1px",
        paddingLeft: "15px",
        border: "2px black double",
      }}
    >
      <h4> {comment.body} </h4>
      <TextField
        placeholder="Reply"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <Button disabled={!message.length} onClick={sendReply}>
        Reply
      </Button>
      {reply
        .filter((re) => re.parentId === comment._id)
        .map((rep) => {
          return (
            <React.Fragment key={uuid()}>
              <Reply rep={rep} /> {/* first reply */}
              {reply
                .filter((reReply) => reReply.idReplyParent === rep._id)
                .map((rep) => {
                  return (
                    <div
                      key={uuid()}
                      style={{
                        paddign: "1px",
                        paddingLeft: "15px",
                        margin: "0 2px",
                        border: "1px black solid",
                      }}
                    >
                      <Reply rep={rep} />
                      <Replies rep={rep} replies={reply} />
                    </div>
                  );
                })}
            </React.Fragment>
          );
        })}
    </div>
  );
}
