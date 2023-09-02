import { TOKEN } from "../../constants/constants";

export const actionMyPosts = "get-my-posts";
export const initialMyPostsReducer = { allPosts: [], totalCount: 0 };

export const myPostReducer = (state = initialMyPostsReducer, action) => {
  if (action.type === actionMyPosts) {
    return action.payload.myPosts;
  }
  return state;
};

export const selectMyPosts = function (state) {
  return state.myPosts;
};

export const changeActive = (item, setIsClicked, setName) => {
  return () => {
    fetch("/isActive", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: JSON.parse(TOKEN),
      },
      body: JSON.stringify({
        _id: item._id,
        isActive: !item.isActive,
      }),
    })
      .then((res) => res.json())
      .catch(() => {
        return;
      });
    setIsClicked(true);
    setName(item.isActive ? "Passive" : "Active");
  };
};
