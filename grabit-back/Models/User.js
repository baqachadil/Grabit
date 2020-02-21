const mongoose = require("mongoose");

const userShecma = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  Name: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  phone: {
    type: String
  },
  typeUser: {
    type: String
  }
});

module.exports = mongoose.model("User", userShecma);
