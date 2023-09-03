import { TOKEN } from "../../constants/constants";

export const actionRefreshToken = "refresh-token";
export const initialRefreshTokenReducer = "";

export const refreshTokenReducer = function (
  state = initialRefreshTokenReducer,
  action
) {
  if (action.type === actionRefreshToken) {
    return action.payload.refreshToken;
  }
  return state;
};

const updateRefreshTokenReducer = (newValue) => {
  return {
    type: actionRefreshToken,
    payload: {
      refreshToken: newValue,
    },
  };
};

export const updateToken = () => {
  return (dispatch) => {
    fetch("/refresh-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: JSON.parse(TOKEN),
        tokenrefresh: JSON.parse(localStorage.getItem("tokenRefresh")),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res?.newToken) {
          localStorage.setItem("token", JSON.stringify(res.newToken));
          dispatch(updateRefreshTokenReducer(res.newToken));
        }
        if (res?.logOut) {
          localStorage.clear();
        }
      });
  };
};
