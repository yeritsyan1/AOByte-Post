import React from "react";
import withUpdatePost from "../postEdit/WithUpdatePost";

export default function EmptyComponent() {
  return <> </>;
}

export const EditPostWithHOC = withUpdatePost(EmptyComponent);
export const CreatePostWithHOC = withUpdatePost(EmptyComponent)