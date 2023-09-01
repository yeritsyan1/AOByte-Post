import express from "express";
import validatedToken from "../../validatedToken.js";
import { comments } from "../../service/comments/getComments.js";
import { sendComment } from "../../service/comments/sendComment.js";
import { reply } from "../../service/comments/getReply.js";
import { sendReply } from "../../service/comments/sendReply.js";
import { sendReReply } from "../../service/comments/sendReReply.js";

const commentRoute = express.Router();

commentRoute.get("/comment", comments);
commentRoute.post("/sendComment", validatedToken, sendComment);
commentRoute.get("/reply", reply);
commentRoute.post("/sendReply", validatedToken, sendReply);
commentRoute.post("/sendReReply", validatedToken, sendReReply);

export default commentRoute;
