import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;   // attach userId directly to req
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
