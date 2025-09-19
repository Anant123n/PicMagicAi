import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    // ✅ get userId from auth middleware
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.credit <= 0) {
      return res.json({ success: false, message: "Insufficient Credits. Please Recharge." });
    }

    // ✅ prepare form-data
    const formData = new FormData();
    formData.append("prompt", prompt);

    // ✅ axios call with correct config
    const { data } = await axios.post(
      'https://clipdrop-api.co/cleanup/v1', // (replace with correct endpoint if it's /cleanup/v1)
      formData,
      {
        headers: {
          "x-api-key": process.env.API_KEY,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    // ✅ convert to base64
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // ✅ deduct 1 credit
    user.credit -= 1;
    await user.save();

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
