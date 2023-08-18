export const updateSomething = (newPost, action, stateName) => {
  return {
    type: action,
    payload: {
      [stateName]: newPost,
    },
  };
};

export const latestSomething = (
  path,
  updateSomething,
  action,
  headers,
  stateName
) => {
  return (dispatch) => {
    fetch(path, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        return dispatch(updateSomething(res, action, stateName));
      })
      .catch(() => {
        return;
      });
  };
};
