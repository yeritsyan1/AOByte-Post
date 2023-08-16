import { useEffect, useState } from "react";
import SignIn from "../components/registration/SignIn";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { v4 as uuid } from "uuid";
import NavTabs from "../components/navigation/HeaderNavigation";

function withPost(Component) {
  return function (props) {
    const { selectPost, latestPost, AdditionalActions } = props;
    const [open, setOpen] = useState(false);

    const posts = useSelector(selectPost);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(latestPost());
    }, []);

    return (
      <>
        <NavTabs />
        <Component />
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
