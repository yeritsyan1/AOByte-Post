import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterPost, selectFilteredPosts } from "../redux/slices/searchReducer";
import Post from "./Post";
import { v4 as uuid } from "uuid";
import SignIn from "./registration/SignIn";
import EmptyComponent from "../hoc/props/EmptyComponent";
import NavTabs from "./navigation/HeaderNavigation";
import { PERPAGE } from "../constants/constants";
import { Pagination } from "@mui/material";
import { flexStyle } from "../styles";

export default function FilteredPage() {
  const classes = flexStyle();
  const [open, setOpen] = useState(false);
  const [dynamicURL, setDynamicURL] = useSearchParams();
  const searchCategory = dynamicURL.get("category");
  const searchTitle = dynamicURL.get("title");
  const startTime = dynamicURL.get("start");
  const endTime = dynamicURL.get("end");

  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const params = { isActive: true, currentpage: currentPage, perpage: PERPAGE };

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
  }, [currentPage]);

  return (
    <div>
      <NavTabs />
      <h1> Filtered Page </h1>
      {!posts.totalCount || (
        <div className={classes.parentPagination}>
          <Pagination
            color="primary"
            count={Math.ceil(posts.totalCount / PERPAGE)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </div>
      )}
      {posts.allPosts.map((item) => {
        return (
          <Post
            key={uuid()}
            item={item}
            setOpen={setOpen}
            AdditionalActions={EmptyComponent}
          />
        );
      })}
      {!posts.totalCount || (
        <div className={classes.parentPagination}>
          <Pagination
            color="primary"
            count={Math.ceil(posts.totalCount / PERPAGE)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </div>
      )}
      <SignIn open={open} setOpen={setOpen} />
    </div>
  );
}
