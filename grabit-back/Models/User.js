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
  },
  location: {
    type: { type: String },
    coordinates: []
  },
  actif: {
    type: String,
    default: true
  },
  assigned: {
    type: String,
    default: false
  },
  route: {
    type: Array,
    default: []
  }
});

userShecma.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userShecma);
