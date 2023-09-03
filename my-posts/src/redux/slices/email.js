import { CURRENTUSER, TOKEN } from "../../constants/constants";

export const actionEmail = "email-verify";
export const initialEmailReducer = { emailVerify: null, send: null };

export const emailReducer = function (state = initialEmailReducer, action) {
  if (action.type === actionEmail) {
    return action.payload;
  }
  return state;
};

const updateEmailReducer = (newValue) => {
  return {
    type: actionEmail,
    payload: {
      emailVerify: newValue.emailVerify,
      send: newValue.send,
    },
  };
};

export const sendLink = (setMessage) => {
  const currentUser = JSON.parse(CURRENTUSER);
  const token = JSON.parse(TOKEN);
  return (dispatch) => {
    fetch("/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: currentUser,
        token,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        dispatch(updateEmailReducer({ send: true }));
      })
      .then(() => {
        setTimeout(() => {
          return setMessage(null);
        }, 3000);
      });
  };
};

export const updateEmailVerify = (setMessage) => {
  return (dispatch) => {
    fetch("/updateVerify", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: JSON.parse(CURRENTUSER),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setMessage(res.message);
        dispatch(updateEmailReducer({ emailVerify: true }));
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...JSON.parse(CURRENTUSER), isEmailVerify: true })
        );
      })

      .then(() => {
        setTimeout(() => {
          return setMessage(null);
        }, 3000);
      });
  };
};
