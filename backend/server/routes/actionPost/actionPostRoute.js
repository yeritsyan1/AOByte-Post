import express from "express";
import validatedToken from "../../validatedToken.js";
import { createPost } from "../../service/createPost.js";
import { like } from "../../service/like.js";
import { isAcitve } from "../../service/isActive.js";
import { filterPosts } from "../../service/filterPosts.js";
import { deletePost } from "../../service/delete.js";
import { editPost } from "../../service/editPost.js";

const actionPostRoute = express.Router();

actionPostRoute.post("/post", validatedToken, createPost);
actionPostRoute.put("/like", validatedToken, like);
actionPostRoute.put("/isActive", validatedToken, isAcitve);
actionPostRoute.get("/filterposts", filterPosts);
actionPostRoute.put("/editPost", validatedToken, editPost);
actionPostRoute.delete("/deletePost", validatedToken, deletePost);

export default actionPostRoute;
