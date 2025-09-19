import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;   // attach userId to request
    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
