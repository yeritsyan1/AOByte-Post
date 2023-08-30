import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { signin } from "./backend/server/service/registration/signin.js";
import { createPost } from "./backend/server/service/createPost.js";
import { allPosts } from "./backend/server/service/allPost.js";
import { myPost } from "./backend/server/service/myPosts.js";
import { comments } from "./backend/server/service/comments/getComments.js";
import { sendComment } from "./backend/server/service/comments/sendComment.js";
import { reply } from "./backend/server/service/comments/getReply.js";
import { sendReply } from "./backend/server/service/comments/sendReply.js";
import { sendReReply } from "./backend/server/service/comments/sendReReply.js";
import { like } from "./backend/server/service/like.js";
import { isAcitve } from "./backend/server/service/isActive.js";
import { filterPosts } from "./backend/server/service/filterPosts.js";
import { editPost } from "./backend/server/service/editPost.js";
import { deletePost } from "./backend/server/service/delete.js";
import { onePost } from "./backend/server/service/onePost.js";
import { signup } from "./backend/server/service/registration/signup.js";
import { verifyEmail } from "./backend/server/service/verifyEmail.js";
import { updateVerify } from "./backend/server/service/updateVerify.js";

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
app.use("/verifyEmail", validationToken);

mongoose.connect(
  "mongodb+srv://tyeritsyan1:kaxZGzlq8k7M3um6@userpost.8oagrcs.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export const generateAccessToken = (id) => {
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

// sign up
app.post("/signup", signup);

// sign in
app.post("/signin", signin);

// create new post
app.post("/post", createPost);

// get posts list
app.get("/posts", allPosts);

// get my posts
app.get("/myPost", myPost);

// get comments
app.get("/comment", comments);

// send new comment
app.post("/sendComment", sendComment);

// get reply
app.get("/reply", reply);

// send reply
app.post("/sendReply", sendReply);

// send reReply
app.post("/sendReReply", sendReReply);

// update like
app.put("/like", like);

// update post isActive
app.put("/isActive", isAcitve);

// filter posts
app.get("/filterposts", filterPosts);

// edit post
app.put("/editPost", editPost);

// delete post
app.delete("/deletePost", deletePost);

// onePost
app.post("/postPage", onePost);

// verify email
app.post("/email", verifyEmail);

// update email
app.put("/updateVerify", updateVerify);

app.listen(process.env.PORT || 3001);
