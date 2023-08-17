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
    return b.date - a.date;
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
    fetch("/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        isActive: true
      }
    })
      .then((res) => {
        if(res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        return dispatch(updatePosts(res));
      })
      .catch(() => {
        return;
      });
  };
};
