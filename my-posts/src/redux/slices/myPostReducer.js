const actionMyPosts = "get-my-posts";
export const initialMyPostsReducer = [];

export const myPostReducer = (state = [], action) => {
  if (action.type === actionMyPosts) {
    return action.payload.myPosts.sort((a, b) => {
      return b.date - a.date;
    });
  }
  return state;
};

export const selectMyPosts = function (state) {
  return state.myPosts;
};

export const updateMyPosts = (newPost) => {
  return {
    type: actionMyPosts,
    payload: {
      myPosts: newPost,
    },
  };
};

export const latestMyPost = () => {
  const token = localStorage.getItem("token");
  const author = localStorage.getItem("user");
  return (dispatch) => {
    fetch("/myPost", {
      headers: {
        Authorization: `Bearer ${token.substring(1, token.length - 1)}`,
        author: author.substring(1, author.length - 1),
      },
    })
      .then((res) => res.json())
      .then((res) => dispatch(updateMyPosts(res)))
      .catch(() => {
        return;
      });
  };
};
