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
    await User.findOne(
      { id: req.authData.id, typeUser: "Customer" },
      (err, user) => {
        request.user_Id = user._id;
      }
    );

    //Adding the new request to DB
    var newRequest = await request.save();
    res.json({ message: "Request Added successfully" });

    //Getting the drivers inside a sphere of radius 4Km
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

    var BestDrivers = await chooseRightDriver(
      results,
      newRequest.pickup_address,
      newRequest.delivery_address,
      newRequest.Shared
    );
    newRequest.driver_id = BestDrivers[0]._id;
    newRequest.State = "Pending";
    newRequest.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting all requests made by a customer
router.get("/all", validateToken, async (req, res) => {
  let user_id;
  try {
    await User.findOne(
      { id: req.authData.id, typeUser: "Customer" },
      (err, user) => {
        if (err) console.log(err);
        user_id = user._id;
      }
    );
    await Request.find(
      { user_Id: user_id },
      null,
      { sort: { Date: -1 } },
      (err, requests) => {
        if (err) res.status(500).json({ message: err.message });
        res.status(200).json(requests);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/requestDriver/:id", validateToken, async (req, res) => {
  try {
    var req = await Request.findById(req.params.id);

    var driver = await User.findOne({ _id: req.driver_id, typeUser: "Driver" });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Algorithm of choosing the wright driver for the order
const chooseRightDriver = async (
  listOfDrivers,
  pickupAddress,
  deliveryAddress,
  Shared
) => {
  //Calcucating for each driver the distance between his current locaton and the pickup address
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

  //Sorting the drivers from the nearest
  listOfDrivers.sort((a, b) =>
    parseFloat(a.distanceToPickupAdd.text > b.distanceToPickupAdd.text ? 1 : -1)
  );

  //Getting the free drivers
  let freeDrivers = listOfDrivers.filter(driver => {
    return driver.assigned;
  });

  //getting the drivers that already have another delivery
  let assignedDrivers = listOfDrivers.filter(driver => {
    return !driver.assigned;
  });

  /*Calculating the distance between the current delivery address and
  the new one for the drivers that already have an order*/
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

  /*Choosing only the drivers that the distance between
  their current delivery address and the new one is lower to 2Km*/
  assignedDrivers.filter(driver =>
    driver.distBetweenDestAndDelivery < 2 ? 1 : -1
  );

  var BestDriversForOrder;
  if (Shared) BestDriversForOrder = [...assignedDrivers, ...freeDrivers];
  else BestDriversForOrder = [...freeDrivers, ...assignedDrivers];

  return BestDriversForOrder;
};

//Function that calculates the distance of the real path between two addresses
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
