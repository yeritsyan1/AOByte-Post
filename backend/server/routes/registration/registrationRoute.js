import express from "express";
import { signup } from "../../service/registration/signup.js";
import { signin } from "../../service/registration/signin.js";

const registrationRoute = express.Router();

registrationRoute.post("/signup", signup);
registrationRoute.post("/signin", signin);

export default registrationRoute;
