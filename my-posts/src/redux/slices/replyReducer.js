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
