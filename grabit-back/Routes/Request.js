var express = require("express");
require("dotenv").config();
var router = express.Router();
const Request = require("../Models/Request");
const User = require("../Models/User");
const validateToken = require("../Routes/TokenValidation");
const axios = require("axios");

router.post("/add", validateToken, async (req, res) => {
  var request = new Request({ ...req.body });
  try {
    await User.findOne({ id: req.authData.id }, (err, user) => {
      request.user_Id = user._id;
    });

    var newRequest = await request.save();
    res.json({ message: "Request Added successfully" });

    let results = await User.find({
      location: {
        $near: {
          $maxDistance: 4000,
          $geometry: {
            type: "Point",
            coordinates: [
              newRequest.pickup_address.lat,
              newRequest.pickup_address.lng
            ]
          }
        }
      },
      typeUser: "Driver",
      actif: true
    });
    chooseRightDriver(
      results,
      newRequest.pickup_address,
      newRequest.delivery_address
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", validateToken, async (req, res) => {
  let user_id;
  try {
    await User.findOne({ id: req.authData.id }, (err, user) => {
      user_id = user._id;
    });
    await Request.find({ user_Id: user_id }, (err, requests) => {
      if (err) res.status(500).json({ message: err.message });
      res.status(200).json(requests);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const chooseRightDriver = async (
  listOfDrivers,
  pickupAddress,
  deliveryAddress
) => {
  for (const driver of listOfDrivers) {
    var origin = driver.location.coordinates;
    var destination = [pickupAddress.lat, pickupAddress.lng];
    try {
      var distance = await calculeDistance(origin, destination);
    } catch (err) {
      console.log(err);
    }
    driver.distanceToPickupAdd = distance;
  }

  listOfDrivers.sort((a, b) =>
    parseFloat(a.distanceToPickupAdd.text > b.distanceToPickupAdd.text ? 1 : -1)
  );

  let freeDrivers = listOfDrivers.filter(driver => {
    return driver.assigned;
  });

  let assignedDrivers = listOfDrivers.filter(driver => {
    return !driver.assigned;
  });

  for (const driver of assignedDrivers) {
    var origin = [driver.route[0].lat, driver.route[0].lng];
    var destination = [deliveryAddress.lat, deliveryAddress.lng];

    try {
      var distance = await calculeDistance(origin2, destination2);
    } catch (err) {
      console.log(err);
    }
    driver.distBetweenDestAndDelivery = distance;
  }

  assignedDrivers.filter(driver =>
    driver.distBetweenDestAndDelivery < 2 ? 1 : -1
  );
};

const calculeDistance = async ([lat1, lng1], [lat2, lng2]) => {
  try {
    let direction = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${lat1},${lng1}&destination=${lat2},${lng2}&key=${process.env.GOOGLE_MAPS_API}`
    );
    // console.log(direction.data.routes[0].legs[0].distance);
    // console.log(direction.data.routes[0].legs[0].duration);
    return direction.data.routes[0].legs[0].distance;
  } catch (err) {
    console.log(err);
  }
};

module.exports = router;
