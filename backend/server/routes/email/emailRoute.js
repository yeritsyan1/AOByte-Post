import express from "express";
import { verifyEmail } from "../../service/verifyEmail.js";
import { updateVerify } from "../../service/updateVerify.js";

const emailRouter = express.Router();

emailRouter.post("/email", verifyEmail);
emailRouter.put("/updateVerify", updateVerify);

export default emailRouter;
