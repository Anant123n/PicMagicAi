import FormData from "form-data";
import axios from "axios";

// In-memory store to track guest usage by IP
// In production, you'd want to use Redis or a DB collection
const guestUsage = new Map();

// Clean up old entries every hour to prevent memory leaks
setInterval(() => {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const now = Date.now();
  for (const [ip, data] of guestUsage.entries()) {
    if (now - data.timestamp > ONE_DAY) {
      guestUsage.delete(ip);
    }
  }
}, 60 * 60 * 1000);

export const guestGenerateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ success: false, message: "Please provide a prompt" });
    }

    // Get client IP (works behind proxies too)
    const clientIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      "unknown";

    // Check if this guest IP has already used their free generation
    if (guestUsage.has(clientIp)) {
      return res.status(403).json({
        success: false,
        message: "You've used your free trial! Sign up to generate more images.",
        guestLimitReached: true,
      });
    }

    // Generate the image using ClipDrop API
    const formData = new FormData();
    formData.append("prompt", prompt);

    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.api_key,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    // Convert to base64
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Mark this IP as having used their free generation
    guestUsage.set(clientIp, { timestamp: Date.now() });

    res.status(200).json({
      success: true,
      message: "Image Generated Successfully (Free Trial)",
      resultImage,
      guestUsed: true,
    });
  } catch (error) {
    console.error("Error in guest image generation:", error.message);
    res.status(500).json({
      success: false,
      message: "Error in Generating Image",
      error: error.message,
    });
  }
};

// Check if a guest IP has remaining free generations
export const checkGuestStatus = async (req, res) => {
  try {
    const clientIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      "unknown";

    const hasUsed = guestUsage.has(clientIp);

    res.status(200).json({
      success: true,
      hasFreeTrial: !hasUsed,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error checking guest status" });
  }
};
