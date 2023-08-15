import React from "react";
import Filter from "./Filter";
import withPost from "../hoc/WithPost";

export default function NewsFeed() {
  return (
    <React.Fragment>
      <Filter />
    </React.Fragment>
  );
}

export const NewsFeedWithPostHOC = withPost(NewsFeed);
