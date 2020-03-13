const io = require("socket.io")();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User");

io.on("connection", socket => {
  socket.on("locationChange", async (data, ack) => {
    if (!data.token) {
      ack("Forbiden !!");
      return;
    }

    const auth = data.token;
    const bearer = auth.split(" ");
    const token = bearer[1];
    //Verifying the token
    await jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY,
      async (err, authData) => {
        if (err) {
          ack("Forbiden !!");
          return;
        }

        var user = await User.findOne({ id: authData.id, typeUser: "Driver" });
        user.location.coordinates = [data.lat, data.lng];

        user.save();

        io.emit("notifiCustomer", {
          driver_id: user._id,
          coords: { lat: data.lat, lng: data.lng }
        });
        ack("Success");
      }
    );
  });
});
io.listen(2000);
