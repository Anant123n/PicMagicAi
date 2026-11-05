import userModel from "../models/userModel.js";
import pictureModel from "../models/pictureModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Get userId from auth middleware
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.credit <= 0) {
      return res.json({ success: false, message: "Insufficient Credits. Please Recharge." });
    }

    // Prepare form-data
    const formData = new FormData();
    formData.append("prompt", prompt);

    // ✅ Use correct ClipDrop endpoint
    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.api_key,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer", // important to get image data
      }
    );

    // Convert to base64
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct 1 credit
    user.credit -= 1;
    await user.save();

    // Save Picture to DB
    const newPicture = new pictureModel({
      user: user._id,
      image: resultImage,
      prompt: prompt
    });
    await newPicture.save();

    res.status(200).json({
      success: true,
      message: "Image Generated Successfully",
      resultImage,
      credit: user.credit,
    });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({
      success: false,
      message: "Error in Generating Image",
      error: error.message,
    });
  }
};

export const getUserImages = async (req, res) => {
  try {
    const userId = req.userId;
    const pictures = await pictureModel.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      pictures
    });
  } catch (error) {
    console.error("Error fetching images:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching user images",
      error: error.message,
    });
  }
};
