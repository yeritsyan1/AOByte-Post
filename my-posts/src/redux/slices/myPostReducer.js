export const actionMyPosts = "get-my-posts";
export const initialMyPostsReducer = { allPosts: [], totalCount: 0 };

export const myPostReducer = (state = initialMyPostsReducer, action) => {
  if (action.type === actionMyPosts) {
    return action.payload.myPosts;
  }
  return state;
};

export const selectMyPosts = function (state) {
  return state.myPosts;
};
