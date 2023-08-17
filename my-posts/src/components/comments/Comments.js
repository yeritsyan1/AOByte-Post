import React from "react";
import Comment from "./Comment";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { selectComments } from "../../redux/slices/commentsReducer";

export default function Comments(props) {
  const { post } = props;
  const comments = useSelector(selectComments);

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
