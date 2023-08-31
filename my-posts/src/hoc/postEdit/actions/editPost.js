import { TOKEN } from "../../../constants/constants";

export async function editPost(
  _id,
  user,
  title,
  body,
  category,
  setDisabledButton,
  setTitle,
  setBody,
  setCategory,
  setMessage
) {
  return await fetch("/editPost", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      _id,
      title,
      body,
      category,
      token: TOKEN,
    },
  })
    .then((res) => {
      setDisabledButton(false);
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
    .catch(() => {});
}
