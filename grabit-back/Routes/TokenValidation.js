const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  const auth = req.headers["authorization"];

  if (typeof auth !== "undefined") {
    const bearer = auth.split(" ");
    const token = bearer[1];
    await jwt.verify(token, "Adil0122", async (err, authData) => {
      if (err) {
        res.status(400).json({ message: err.message });
      }
      req.authData = authData;
      next();
    });
  } else {
    res.status(400).json({ message: "Forbiden" });
  }
};

module.exports = validateToken;
