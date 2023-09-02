import { actionPost } from "./postReducer";

const changeLike = (posts, item) => {
  const currentUser = localStorage.getItem("currentUser");

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
              likedUser: [JSON.parse(currentUser)?._id],
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
  const currentUser = localStorage.getItem("currentUser");
  const token = localStorage.getItem("token");

  return (dispatch) => {
    fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: JSON.parse(token),
      },
      body: JSON.stringify({
        _id: item._id,
        rate: ++item.rate,
        likedUser: JSON.parse(currentUser)?._id,
      }),
    }).then(() => dispatch(changeLike(posts, item)));
  };
};
