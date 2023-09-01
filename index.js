import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import actionPostRoute from "./backend/server/routes/actionPost/actionPostRoute.js";
import postRouter from "./backend/server/routes/post/postsRoute.js";
import commentRoute from "./backend/server/routes/comments/commentsRoute.js";
import registrationRoute from "./backend/server/routes/registration/registrationRoute.js";
import emailRouter from "./backend/server/routes/email/emailRoute.js";

const app = express();
app.use(express.static("./my-posts/build"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(actionPostRoute);
app.use(postRouter);
app.use(commentRoute);
app.use(registrationRoute);
app.use(emailRouter);

mongoose.connect(
  "mongodb+srv://tyeritsyan1:kaxZGzlq8k7M3um6@userpost.8oagrcs.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(process.env.PORT || 3001);
