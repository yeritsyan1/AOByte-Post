import React from "react";
import Reply from "./Reply";
import { v4 as uuid } from "uuid";

export default function Replies(props) {
  const { rep, replies, setOpen } = props;

  return (
    <div style={{ paddingLeft: "15px" }}>
      {replies
        .filter((reReply) => reReply.idReplyParent === rep._id)
        .map((rep) => {
          return (
            <div
              key={uuid()}
              style={{
                paddingLeft: "15px",
                margin: "2px",
                border: "1px black solid",
              }}
            >
              <Reply rep={rep} />
              <Replies rep={rep} replies={replies} setOpen={setOpen} />
            </div>
          );
        })}
    </div>
  );
}
