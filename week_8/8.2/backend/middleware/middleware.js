const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authorisationToken = req.headers.authorization;
  if (!authorisationToken || !authorisationToken?.startsWith("Bearer "))
    return res.status(403).json({});

  const token = authorisationToken.split(" ")[1];

  try {
    const isVerified = jwt.verify(token, JWT_SECRET);
    req.userId = isVerified.user;
    next();
  } catch (error) {
    return res.status(403).json({});
  }
}

module.exports = {
  authMiddleware,
};
