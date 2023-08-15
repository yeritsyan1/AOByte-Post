export const actionPost = "latest-post";
export const initialPostreducer = [];

export function postReducer(state = [], action) {
  if (action.type === actionPost) {
    return action.payload.posts;
  }
  return state;
}

export function selectPost(state) {
  return state.posts.sort((a, b) => {
    return b.rate - a.rate;
  });
}

export const updatePosts = (newPost) => {
  return {
    type: actionPost,
    payload: {
      posts: newPost,
    },
  };
};

export const latestPost = () => {
  return (dispatch) => {
    fetch("/posts")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return dispatch(updatePosts(res));
      })
      .catch(() => {
        return;
      });
  };
};
