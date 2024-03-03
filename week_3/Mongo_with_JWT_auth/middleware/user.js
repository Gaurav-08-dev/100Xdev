const jwt = require("jsonwebtoken");
const secret = require("../config");
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  try{
    const token = req.headers.authorization;
    const jwtToken = token.split(" ")[1];
  
    const decodedValue = jwt.verify(jwtToken, secret);
    if (decodedValue.username) {
      next();
    }   
  }
  catch(err){
    res.status(403).json({
      msg: "You are not authenticated",
    });
  }
}

module.exports = userMiddleware;
