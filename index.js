import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "./backend/models/User.js";
import Post from "./backend/models/Post.js";

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
        .json({ message: `${email} not found.`, statusCode: 400 });
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

app.listen(process.env.PORT || 3001);
