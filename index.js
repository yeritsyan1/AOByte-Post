import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "./backend/models/User.js";
import Post from "./backend/models/Post.js";
import Comment from "./backend/models/Comments.js";
import Reply from "./backend/models/Reply.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.static("./my-posts/build"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/post", validationToken);
app.use("/myPost", validationToken);
app.use("/sendComment", validationToken);
app.use("/sendReply", validationToken);
app.use("/sendReReply", validationToken);
app.use("/like", validationToken);
app.use("/isActive", validationToken);
app.use("/editPost", validationToken);
app.use("/deletePost", validationToken);

//const url = process.env.MONGO_DB_URL;
mongoose.connect(
  "mongodb+srv://tyeritsyan1:kaxZGzlq8k7M3um6@userpost.8oagrcs.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const generateAccessToken = (id) => {
  const payload = { id };
  return jsonwebtoken.sign(payload, "secret", { expiresIn: "24h" });
};

// check auth
async function validationToken(req, res, next) {
  const token = req.headers.token;
  try {
    await jsonwebtoken.verify(token.substring(1, token.length - 1), "secret");
    next();
  } catch {
    return null;
  }
}

app.post("/signup", async (req, res) => {
  try {
    const { email, password, isEmailVerify } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered." });
    }

    const hashPassword = bcryptjs.hashSync(password, 7);
    const newUser = new User({ email, password: hashPassword, isEmailVerify });
    await newUser.save();
    res
      .status(200)
      .json({ message: "Congratulations your account has been created!" });
  } catch (err) {
    console.log("error: ", err);
    res.status(400).send("Sign up error");
  }
});

// sign in
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: `'${email}' not found.`, statusCode: 400 });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    const token = generateAccessToken(user._id);
    return res.status(200).json({ message: "", user, token });
  } catch (err) {
    res.status(400).json({ message: "Login error" });
  }
});

// create new post
app.post("/post", async (req, res) => {
  try {
    const { author, title, body, comments, category, rate, date, isActive } =
      req.body;

    const newPost = new Post({
      author,
      title,
      body,
      comments,
      category,
      date,
      rate,
      isActive,
    });
    const post = await newPost.save();
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log("error: ", err);
    res.status(400).json({ message: "Failed to add post." });
  }
});

// get posts list
app.get("/posts", async (req, res) => {
  const { isactive, currentpage, perpage } = req.headers;
  const totalCount = await Post.find({ isActive: isactive }).then(
    (posts) => posts.length
  );

  Post.find({ isActive: isactive })
    .skip((currentpage - 1) * perpage)
    .limit(perpage)
    .then((allPosts) => res.json({ allPosts, totalCount }))
    .catch(() => res.status(400).json({ message: "Something went wrong." }));
});

// get my posts
app.get("/myPost", async (req, res) => {
  const { currentpage, perpage } = req.headers;
  const receivedToken = await req.headers.authorization.split(" ")[1];
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
});

// get comments
app.get("/comment", (req, res) => {
  try {
    Comment.find().then((comments) => res.json(comments));
  } catch (err) {
    res.status(400).json({ message: "Failed to load." });
  }
});

// send new comment
app.post("/sendComment", async (req, res) => {
  const { author, body, date, rate, postId } = req.body;

  try {
    const comment = new Comment({
      author,
      body,
      date,
      rate,
      postId,
    });
    const saveComment = await comment.save();
    res.json({ message: "Send" });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong." });
  }
});

// get reply
app.get("/reply", (req, res) => {
  try {
    Reply.find().then((reply) => res.json(reply));
  } catch (err) {
    res.status(400).json({ message: "Failed to load." });
  }
});

// send reply
app.post("/sendReply", async (req, res) => {
  const { author, body, date, rate, replies, parentId, idReplyParent } =
    req.body;

  try {
    const reply = new Reply({
      author,
      body,
      date,
      rate,
      replies,
      parentId,
      idReplyParent,
    });
    await reply.save();
    res.json({ message: "Send reply" });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong." });
  }
});

// send reply
app.post("/sendReReply", async (req, res) => {
  const { author, body, date, rate, replies, parentId, idReplyParent } =
    req.body;

  try {
    const reply = new Reply({
      author,
      body,
      date,
      rate,
      replies,
      parentId,
      idReplyParent,
    });
    const saveReply = await reply.save();
    res.json({ message: "Send reply" });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong." });
  }
});

// update like
app.put("/like", async (req, res) => {
  const { rate, _id, likedUser } = req.body;

  try {
    const updateResult = await Post.updateOne(
      { _id: _id },
      { $addToSet: { likedUser }, $set: { rate } }
    ).exec();
    if (updateResult.nModified === 1) {
      res.status(200).json({ message: "Post updated successfully" });
    } else {
      res.status(404).json({ message: "Post not found or no changes made" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// update post isAcitve
app.put("/isActive", async (req, res) => {
  const { isActive, _id } = req.body;
  try {
    const updateResult = await Post.updateOne(
      { _id: _id },
      { $set: { isActive: isActive } }
    ).exec();
    if (updateResult.nModified === 1) {
      res.status(200).json({ message: "Post updated successfully " });
    } else {
      res.status(404).json({ message: "Post not found or no changes made" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

// filter posts
app.get("/filterposts", async (req, res) => {
  const { isactive, title, category, starttime, endtime } = req.headers;

  const pipe = [
    {
      $match: {
        isActive: true,
        category: category,
        date: { $gte: Number(starttime), $lte: Number(endtime) },
      },
    },
  ];
  if (title !== "undefined") {
    pipe[0].$match["title"] = new RegExp(title, "i");
  }
  const totalCount = await Post.aggregate(pipe).then(
    (allPosts) => allPosts.length
  );
  const filter = await Post.aggregate(pipe)
    .then((posts) => res.status(200).json({ allPosts: posts, totalCount }))
    .catch(() => res.status(400).json({ message: "Failed to load" }));
});

// edit post
app.put("/editPost", (req, res) => {
  const { _id, title, body, category } = req.headers;
  try {
    const updateResult = Post.updateOne(
      { _id },
      {
        $set: {
          title,
          body,
          category,
        },
      }
    ).exec();
    if (updateResult.nModified === 1) {
      res.status(200).json({ message: "Post not found or no changes made" });
    } else {
      res.status(400).json({ message: "Post updated successfull" });
    }
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
});

// delete post
app.delete("/deletePost", async (req, res) => {
  const { _id } = req.headers;
  try {
    await Post.deleteOne({ _id });
    res.status(200).json({ message: "Post deleted" });
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
});

// onePost
app.post("/postPage", async (req, res) => {
  try {
    await Post.find({ _id: req.body.id }).then((post) => {
      return res.status(200).json(post);
    });
  } catch {
    return;
  }
});

app.listen(process.env.PORT || 3001);
