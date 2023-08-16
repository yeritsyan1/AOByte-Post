import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterPost, selectFilteredPosts } from "../redux/slices/searchReducer";
import Post from "./Post";
import { v4 as uuid } from "uuid";
import SignIn from "./registration/SignIn";
import EmptyComponent from "../hoc/props/EmptyComponent";
import NavTabs from "./navigation/HeaderNavigation";

export default function FilteredPage() {
  const [open, setOpen] = useState(false);
  const [dynamicURL, setDynamicURL] = useSearchParams();
  const searchCategory = dynamicURL.get("category");
  const searchTitle = dynamicURL.get("title");
  const startTime = dynamicURL.get("start");
  const endTime = dynamicURL.get("end");

  const params = { isActive: true };
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);

  useEffect(() => {
    if (searchCategory) {
      params.category = searchCategory;
    }
    if (searchTitle) {
      params.title = searchTitle;
    }
    if (startTime) {
      params.startTime = startTime;
    }
    if (endTime) {
      params.endTime = endTime;
    }
    dispatch(filterPost(params));
  }, []);

  return (
    <div>
      <NavTabs />
      <h1> Filtered Page </h1>
      {posts.map((item) => {
        return (
          <Post
            key={uuid()}
            item={item}
            setOpen={setOpen}
            AdditionalActions={EmptyComponent}
          />
        );
      })}
      <SignIn open={open} setOpen={setOpen} />
    </div>
  );
}
