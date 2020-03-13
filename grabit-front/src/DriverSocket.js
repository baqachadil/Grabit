import io from "socket.io-client";

const socket = io("http://localhost:2000");
socket.on("connect", function() {
  console.log("socket connected");
});

let step = 0.0001;

navigator.geolocation.watchPosition(res => {
  socket.emit(
    "locationChange",
    {
      token: `Bearer ${localStorage.getItem("JwtToken")}`,
      lat: res.coords.latitude - step,
      lng: res.coords.longitude
    },
    data => {
      console.log(data);
    }
  );
  step += 0.0001;
});
