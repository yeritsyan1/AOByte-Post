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

    const posts = useSelector(selectPost);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(
        latestSomething(path, updateSomething, action, headers, stateName)
      );
      dispatch(latestComments());
      dispatch(latestReply());
    }, []);

    return (
      <>
        <NavTabs />
        <Component posts={posts} />

        {posts.map((item) => {
          return (
            <Post
              key={uuid()}
              item={item}
              setOpen={setOpen}
              AdditionalActions={AdditionalActions}
            />
          );
        })}
        <SignIn open={open} setOpen={setOpen} />
      </>
    );
  };
}

export default withPost;
