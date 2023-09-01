import express from "express";
import validatedToken from "../../validatedToken.js";
import { myPost } from "../../service/myPosts.js";
import { allPosts } from "../../service/allPost.js";
import { onePost } from "../../service/onePost.js";

const postRouter = express.Router();

postRouter.get("/myPost", validatedToken, myPost);
postRouter.get("/posts", allPosts);
postRouter.post("/postPage", onePost);

export default postRouter;
