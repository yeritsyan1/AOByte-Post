import { CURRENTUSER, TOKEN } from "../../constants/constants";
import { actionPost } from "./postReducer";

const changeLike = (posts, item) => {
  return {
    type: actionPost,
    payload: {
      posts: {
        ...posts,
        allPosts: posts.map((currentPost) => {
          if (item._id === currentPost._id) {
            return {
              ...item,
              rate: item.rate,
              likedUser: [JSON.parse(CURRENTUSER)?._id],
            };
          } else {
            return currentPost;
          }
        }),
      },
    },
  };
};

export const updateLike = (posts, item) => {
  return (dispatch) => {
    fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: TOKEN,
      },
      body: JSON.stringify({
        _id: item._id,
        rate: ++item.rate,
        likedUser: JSON.parse(CURRENTUSER)?._id,
      }),
    }).then(() => dispatch(changeLike(posts, item)));
  };
};
