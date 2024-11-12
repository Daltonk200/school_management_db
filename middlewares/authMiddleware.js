// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  
  // if (!token) return res.status(403).json({ message: 'Access Denied' });
  
  try {
    const token = req.headers.authorization.replace("Bearering ", "");
    console.log("Token is :"+token);
    const JWT_payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = JWT_payload;
    console.log( "JWT_payload is ",JWT_payload);
  } catch (error) {
    res.status(401).json({ 
      message: error,
       status: "Failed" });
  }
  next();
};

// Middleware to restrict access based on role
const restrictTo = (req, res, next) => {
  const role = req.user.role;
  console.log("role is ",role);
  if (role !== "admin"){
   res.status(403).json({
     message: `Access Denied bcs u are a ${role}😎`  
  });
  return;
  }
  next();
};

module.exports = { verifyToken, restrictTo };
