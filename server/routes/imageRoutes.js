import express from "express";
import { generateImage } from "../controllers/imageController.js";
import { guestGenerateImage, checkGuestStatus } from "../controllers/guestController.js";
import authUser from "../middlewares/auth.js";

const imageRouter = express.Router();

// user must be authenticated
imageRouter.post("/generate-image", authUser, generateImage);

// Guest routes — no auth required (1 free generation per IP)
imageRouter.post("/guest-generate", guestGenerateImage);
imageRouter.get("/guest-status", checkGuestStatus);

export default imageRouter;
