import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not Authorized. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // get the token after "Bearer"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({ success: false, message: "Not Authorized. Invalid token." });
    }

    // attach user id to request for later use
    req.userId = decoded.id;

    next(); // ✅ go to the next middleware/controller
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Token is not valid" });
  }
};

export default authUser;
