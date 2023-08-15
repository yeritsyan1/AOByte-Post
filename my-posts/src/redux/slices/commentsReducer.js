const actionComments = "change-comments";
export const initialCommentsReducer = [];

export function commentsReducer(state = [], action) {
  if (action.type === actionComments) {
    return [
      {
        posts: action.payload.post,
      },
    ];
  }
  return state;
}
