import Post from "../../models/Post.js";

export const allPosts = async (req, res) => {
  const { isactive, currentpage, perpage } = req.headers;
  const totalCount = await Post.find({ isActive: isactive }).then(
    (posts) => posts.length
  );

  Post.find({ isActive: isactive })
    .skip((currentpage - 1) * perpage)
    .limit(perpage)
    .then((allPosts) => res.json({ allPosts, totalCount }))
    .catch(() => res.status(400).json({ message: "Something went wrong." }));
};
