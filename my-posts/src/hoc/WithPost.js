import { useEffect, useState } from "react";
import SignIn from "../components/registration/SignIn";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { v4 as uuid } from "uuid";
import NavTabs from "../components/navigation/HeaderNavigation";
import { latestComments } from "../redux/slices/commentsReducer";
import { latestReply } from "../redux/slices/replyReducer";
import { latestSomething } from "../redux/slices/slice";
import { updateSomething } from "../redux/slices/slice";
import { Pagination } from "@mui/material";
import { PERPAGE } from "../constants/constants";

function withPost(Component) {
  return function (props) {
    const {
      selectPost,
      latestPost,
      AdditionalActions,
      path,
      action,
      headers,
      stateName,
    } = props;
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const posts = useSelector(selectPost);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(
        latestSomething(
          path,
          updateSomething,
          action,
          headers,
          stateName,
          currentPage,
          PERPAGE
        )
      );
      dispatch(latestComments());
      dispatch(latestReply());
    }, [currentPage]);

    return (
      <>
        <NavTabs />
        <Component posts={posts} />
        {!posts.totalCount || (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              color="primary"
              count={Math.ceil(posts.totalCount / PERPAGE)}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
          </div>
        )}
        {posts.allPosts
          .sort((a, b) => {
            return b.date - a.date;
          })
          .map((item) => {
            return (
              <Post
                key={uuid()}
                item={item}
                setOpen={setOpen}
                AdditionalActions={AdditionalActions}
              />
            );
          })}
        {!posts.totalCount || (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              color="primary"
              count={Math.ceil(posts.totalCount / PERPAGE)}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
          </div>
        )}
        <SignIn open={open} setOpen={setOpen} />
      </>
    );
  };
}

export default withPost;
