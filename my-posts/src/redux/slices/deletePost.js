import { TOKEN } from "../../constants/constants";

export const deletePost = (_id, setMessage) => {
  return () => {
    fetch("/deletePost", {
      method: "DELETE",
      headers: {
        _id,
        token: JSON.parse(TOKEN),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setMessage(res.message);
      })
      .then(() => {
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      })
      .catch((err) => alert(err));
  };
};
