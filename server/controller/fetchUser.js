const jwt = require("jsonwebtoken");
require('dotenv').config()


const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  try {
    if (!token) {
      res.redirect(/*login page*/);
      // next(new ErrorResponse("Access Denied", 401));
    }
    const data = jwt.verify(token, JWT_SECRET);
    // console.log(data);
    req.userId = data.id;
    res.locals.userId = data.id;
    // console.log(req.userId,res.locals.userId)
    next();
  } catch (err) {
    console.log(err);
    next(new ErrorResponse("Internal server error ", 500));
  }
};

module.exports = fetchUser;
