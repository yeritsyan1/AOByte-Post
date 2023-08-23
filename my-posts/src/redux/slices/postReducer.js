export const actionPost = "latest-post";
export const initialPostreducer = { allPosts: [], totalCount: 0 };

export function postReducer(state = initialPostreducer, action) {
  if (action.type === actionPost) {
    return action.payload.posts;
  }
  return state;
}

export function selectPost(state) {
  return state.posts;
}
