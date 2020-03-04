const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = async (req, res, next) => {
  const auth = req.headers["authorization"];
  //Checking the presence of the Token
  if (typeof auth !== "undefined") {
    const bearer = auth.split(" ");
    const token = bearer[1];
    //Verifying the token
    await jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY,
      async (err, authData) => {
        if (err) {
          res.status(400).json({ message: err.message });
        }
        req.authData = authData;
        next();
      }
    );
  } else {
    res.status(400).json({ message: "Forbiden" });
  }
};

module.exports = validateToken;
