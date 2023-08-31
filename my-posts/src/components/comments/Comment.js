import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Replies from "./Replies";
import Reply from "./Reply";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { newReply, selectReply } from "../../redux/slices/replyReducer";

export default function Comment(props) {
  const { comment, setOpen } = props;
  const [message, setMessage] = useState("");
  const reply = useSelector(selectReply);
  const dispatch = useDispatch();

  const sendReply = () => {
    return dispatch(newReply(message, setMessage, setOpen, comment));
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
                      <Reply rep={rep} setOpen={setOpen} />
                      <Replies rep={rep} replies={reply} setOpen={setOpen} />
                    </div>
                  );
                })}
            </React.Fragment>
          );
        })}
    </div>
  );
}
