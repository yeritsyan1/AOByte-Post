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

export const addComment = (setComment, setOpen, comment, item) => {
  const currentUser = localStorage.getItem("currentUser");
  const token = localStorage.getItem("token");

  return (dispatch) => {
    setComment("");
    currentUser || setOpen(true);
    fetch("/sendComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: JSON.parse(token),
      },
      body: JSON.stringify({
        author: {
          email: JSON.parse(currentUser)?._id,
        },
        body: comment,
        date: Date.now(),
        rate: 0,
        postId: item._id,
      }),
    }).then(() => {
      return dispatch(latestComments());
    });
  };
};
