const actionComments = "change-comments";
export const initialCommentsReducer = [];

export function commentsReducer(state = [], action) {
  if (action.type === actionComments) {
    return action.payload.comments;
  }
  return state;
}

export const selectComments = function (state) {
  return state.comments;
};

const updateComments = (newComments) => {
  return {
    type: actionComments,
    payload: {
      comments: newComments,
    },
  };
};

export const latestComments = () => {
  return (dispatch) => {
    fetch("/comment")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return dispatch(updateComments(res));
      })
      .catch(() => {
        return;
      });
  };
};
