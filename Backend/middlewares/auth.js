import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // Support both: token header & Authorization: Bearer token
    const authHeader = req.headers.authorization || req.headers.token;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login again.",
      });
    }

    // Extract token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId safely
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
