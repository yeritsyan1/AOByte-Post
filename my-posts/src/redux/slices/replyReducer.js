export const initialReply = [];
export const actionReply = "Reply";

export function initialReplyReducer(state = [], action) {
  if (action.type === actionReply) {
    return action.payload.reply;
  }
  return state;
}

export const selectReply = (state) => {
  return state.reply;
};

const updateReply = (newReply) => {
  return {
    type: actionReply,
    payload: {
      reply: newReply,
    },
  };
};

export const latestReply = () => {
  return (dispatch) => {
    fetch("/reply")
      .then((res) => res.json())
      .then((res) => dispatch(updateReply(res)))
      .catch(() => {
        return;
      });
  };
};

export const newReply = (message, setMessage, setOpen, comment) => {
  const currentUser = localStorage.getItem("currentUser");
  const token = localStorage.getItem("token");

  return (dispatch) => {
    setMessage("");
    token || setOpen(true);
    fetch("/sendReply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: JSON.parse(token),
      },
      body: JSON.stringify({
        author: { email: JSON.parse(currentUser)._id },
        body: message,
        date: Date.now(),
        rate: 0,
        parentId: comment._id,
        idReplyParent: null,
      }),
    })
      .then(() => {
        return dispatch(latestReply());
      })
      .catch((err) => alert(err));
  };
};

export const newReReply = (setOpen, reReply, setReReply, rep) => {
  const currentUser = localStorage.getItem("currentUser");
  const token = localStorage.getItem("token");

  return (dispatch) => {
    token || setOpen(true);
    fetch("/sendReReply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: JSON.parse(token),
      },
      body: JSON.stringify({
        author: { email: JSON.parse(currentUser)._id },
        body: reReply,
        date: Date.now(),
        rate: 0,
        parentId: null,
        idReplyParent: rep._id,
      }),
    })
      .then(() => {
        setReReply("");
      })
      .then(() => {
        return dispatch(latestReply());
      });
  };
};
