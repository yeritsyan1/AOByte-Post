import express from "express";
import { signup } from "../../service/registration/signup.js";
import { signin } from "../../service/registration/signin.js";
import { refreshToken } from "../../service/registration/refreshToken.js";

const registrationRoute = express.Router();

registrationRoute.post("/signup", signup);
registrationRoute.post("/signin", signin);
registrationRoute.get("/refresh-token", refreshToken);

export default registrationRoute;
