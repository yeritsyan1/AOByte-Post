import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { v4 as uuid } from "uuid";

export default function Comments(props) {
  const { post } = props;
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch("/comment")
      .then((res) => {
        return res.json();
      })
      .then((res) => setComments(res))
      .catch(() => {
        return;
      });
  }, []);

  return (
    <div>
      {comments
        .filter((comment) => {
          return comment.postId == post._id;
        })
        .map((comment) => {
          return (
            <div key={uuid()} style={{ padding: "1px", paddingLeft: "15px" }}>
              <Comment comment={comment} post={post} />
            </div>
          );
        })}
    </div>
  );
}
