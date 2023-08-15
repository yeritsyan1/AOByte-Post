import React from "react";
import Reply from "./Reply";
import { v4 as uuid } from "uuid";

export default function Replies(props) {
  const { rep } = props;

  return (
    <div style={{ paddingLeft: "15px" }}>
      {rep.replies.map((rep) => {
        return (
          <div key={uuid}>
            <Reply rep={rep} />
            <Replies rep={rep} />
          </div>
        );
      })}
    </div>
  );
}
