import Post from "../../models/Post.js";

export const myPost = async (req, res) => {
  const { currentpage, perpage } = req.headers;
  await req.headers.authorization.split(" ")[1];
  const totalCount = await Post.find({
    author: { $regex: req.headers.author },
  }).then((posts) => posts.length);

  try {
    Post.find({ author: { $regex: req.headers.author } })
      .skip((currentpage - 1) * perpage)
      .limit(perpage)
      .then((posts) => {
        return res.json({ allPosts: posts, totalCount });
      });
  } catch (err) {
    res.json({ message: "err", err });
  }
};
