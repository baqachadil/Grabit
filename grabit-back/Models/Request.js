const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new mongoose.Schema({
  delivery_address: {
    type: Object
  },
  pickup_address: {
    type: Object
  },
  description: {
    type: String,
    default: ""
  },
  Shared: {
    type: Boolean
  },
  State: {
    type: String,
    default: "Waiting"
  },
  item_list: {
    type: Array
  },
  ASAP: {
    type: Boolean
  },
  Date: {
    type: Date
  },
  total_cost: {
    type: Number
  },
  duration: {
    type: Number
  },
  distance: {
    type: Number
  },
  user_Id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Request", RequestSchema);
