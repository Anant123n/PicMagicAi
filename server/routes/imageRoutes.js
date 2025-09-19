import express from "express";
import { generateImage } from "../controllers/imageController.js";
import authUser from "../middlewares/auth.js";

const imageRouter = express.Router();

// user must be authenticated
imageRouter.post("/generate-image", authUser, generateImage);

export default imageRouter;
