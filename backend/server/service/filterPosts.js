import Post from "../../models/Post.js";

export const filterPosts = async (req, res) => {
  const { title, category, starttime, endtime, currentpage, perpage } =
    req.headers;
  const $match = {
    isActive: true,
    category: category,
    date: { $gte: Number(starttime), $lte: Number(endtime) },
  };

  const pipe = [
    { $match },
    { $skip: (currentpage - 1) * perpage },
    { $limit: Number(perpage) },
  ];
  if (title !== "undefined") {
    pipe[0].$match["title"] = new RegExp(title, "i");
  }

  const totalCount = await Post.aggregate([{ $match }]).then(
    (allPosts) => allPosts.length
  );
  await Post.aggregate(pipe)
    .then((posts) => res.status(200).json({ allPosts: posts, totalCount }))
    .catch(() => res.status(400).json({ message: "Failed to load" }));
};
