import { TOKEN } from "../../../constants/constants";

export async function createPost(
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
  return await fetch("/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: JSON.parse(TOKEN),
    },
    body: JSON.stringify({
      author: user,
      title: title,
      body: body,
      comments: [],
      category: category,
      rate: 0,
      date: Date.now(),
      isActive: true,
    }),
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
