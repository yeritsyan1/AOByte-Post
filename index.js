import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "./backend/models/User.js";
import Post from "./backend/models/Post.js";
import Comment from "./backend/models/Comments.js";
import Reply from "./backend/models/Reply.js";

const app = express();
app.use(express.static("./my-posts/build"));
app.use(express.json());
app.use(cors());

const url = process.env.MONGO_DB_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateAccessToken = (id) => {
  const payload = { id };
  return jsonwebtoken.sign(payload, "secret", { expiresIn: "24h" });
};

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
    return res.status(200).json({ message: "", token });
  } catch (err) {
    res.status(400).json({ message: "Login error" });
  }
});

// create new post
app.post("/post", async (req, res) => {
  try {
    const { author, title, body, comments, category, rate, date } = req.body;

    const newPost = new Post({
      author,
      title,
      body,
      comments,
      category,
      date,
      rate,
    });
    const post = await newPost.save();
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log("error: ", err);
    res.status(400).json({ message: "Failed to add post." });
  }
});

// get posts list
app.get("/posts", (req, res) => {
  Post.find()
    .then((allPosts) => res.json(allPosts))
    .catch(() => res.status(400).json({ message: "Something went wrong." }));
});

// get my posts
app.get("/myPost", async (req, res) => {
  const receivedToken = await req.headers.authorization.split(" ")[1];

  try {
    Post.find({ author: { $regex: req.headers.author } }).then((posts) => {
      return res.json(posts);
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
app.post("/comment", async (req, res) => {
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
app.post("/reply", async (req, res) => {
  const { author, body, date, rate, replies, parentId } = req.body;

  try {
    const reply = new Reply({
      author,
      body,
      date,
      rate,
      replies,
      parentId,
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

app.listen(process.env.PORT || 3001);
