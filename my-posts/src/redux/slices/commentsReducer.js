import { CURRENTUSER, TOKEN, USER } from "../../constants/constants";

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
  return (dispatch) => {
    setComment("");
    localStorage.getItem(USER) || setOpen(true);
    fetch("/sendComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: TOKEN,
      },
      body: JSON.stringify({
        author: {
          email: JSON.parse(CURRENTUSER)?._id,
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
