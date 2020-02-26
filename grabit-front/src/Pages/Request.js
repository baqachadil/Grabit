import React, { useState, useEffect } from "react";
import Map from "../components/Request/Map";
import PlacesAutoComp from "../components/Request/PlacesAutoComplete";
import { makeStyles, Grid } from "@material-ui/core";
import NavBar from "../components/Dashboard/NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import from from "../assets/images/from.png";
import between from "../assets/images/between.png";
import to from "../assets/images/to.png";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: 50,
    height: 900
  },
  Parent: {
    width: 920,
    backgroundColor: "white",
    margin: "auto"
  },
  line: {
    height: 1,
    backgroundColor: "#DEDEDE",
    marginBottom: 30
  },
  input: {
    height: 120,
    width: 350,
    marginTop: 5
  },
  add: {
    height: 40,
    width: 420,
    marginTop: 25
  },
  inputText: {
    color: "#849FB1"
  },
  items: {
    padding: 25
  },
  from: {
    marginTop: 30
  },
  to: {
    marginTop: 3
  },
  map: {
    width: 469,
    height: 514,
    margin: "auto"
  }
}));

export default function Request() {
  const [markers, setMarkers] = useState([]);
  const [currentUser, setCurrentUSer] = useState();
  const [center, setCenter] = useState({ lat: 33.99647, lng: -6.84729 });
  const [Key, setKey] = useState(1);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem("JwtToken")) {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("JwtToken")
        }
      };
      axios.get("/users/getCurrentUser", config).then(res => {
        setCurrentUSer(res.data);
      });
    } else {
      history.push("/");
    }
  }, [history]);

  const onLogOut = () => {
    setCurrentUSer("");
    localStorage.removeItem("JwtToken");
    history.push("/");
  };

  const setMarkersArray = function(i, { lat, lng }) {
    if (markers.length > 1) {
      let newMarkers = markers;
      newMarkers[i] = { lat, lng };
      setMarkers(newMarkers);
    } else {
      setMarkers(oldMarkers => [...oldMarkers, { lat, lng }]);
    }
    setKey(Key + 1);
  };

  const renderPolylines = function(map, maps) {
    var label;
    for (var i = 0; i < markers.length; i++) {
      i === 0 ? (label = "A") : (label = "B");
      var marker = new maps.Marker({
        position: markers[i],
        map: map,
        label: label
      });
      marker.setMap(map);
    }

    if (markers.length > 1) {
      var directionsService = new maps.DirectionsService();
      var directionsRenderer = new maps.DirectionsRenderer({
        suppressMarkers: true
      });
      directionsRenderer.setMap(map);

      var location1 = markers[0];
      var location2 = markers[1];
      var contentString;
      var request = {
        origin: location1,
        destination: location2,
        travelMode: "WALKING"
      };
      directionsService.route(request, function(result, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
          contentString =
            "Distance: " +
            result.routes[0].legs[0].distance.text +
            " Duration: " +
            result.routes[0].legs[0].duration.text;
        }
      });

      var posiTionOfLabel = {
        lat: (location1.lat + location2.lat) / 2,
        lng: (location1.lng + location2.lng) / 2
      };
    }
  };

  return (
    <>
      <NavBar
        currentUser={currentUser}
        onLogOut={onLogOut}
        page={"request"}
      ></NavBar>
      <Grid className={classes.root}>
        <Grid container className={classes.Parent}>
          <Grid item xs={12} style={{ padding: 40, fontSize: 25 }}>
            <span>Request</span>
          </Grid>
          <Grid item xs={12} className={classes.line}></Grid>
          <Grid item xs={5} className={classes.items}>
            <span className={classes.inputText}>Describe your Order</span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              multiline={true}
              InputProps={{ className: classes.input }}
              value={currentUser?.phone}
              placeholder="Please describe Your Order"
            />
          </Grid>
          <Grid item xs={7}>
            <Grid
              container
              className={classes.items}
              style={{ paddingLeft: 40 }}
            >
              <Grid item xs={1} style={{ textAlign: "center" }}>
                <img src={from} alt="from" className={classes.from} /> <br />
                <img src={between} alt="between" />
                <br />
                <img src={between} alt="between" />
                <br />
                <img src={between} alt="between" />
                <br />
                <img src={to} alt="to" className={classes.to} />
                <br />
              </Grid>
              <Grid item xs={11}>
                <PlacesAutoComp
                  setMarkers={setMarkersArray}
                  markerNum={0}
                  setCenter={setCenter}
                ></PlacesAutoComp>
                <PlacesAutoComp
                  setMarkers={setMarkersArray}
                  markerNum={1}
                  setCenter={setCenter}
                ></PlacesAutoComp>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={7}>
            <Grid className={classes.map}>
              <Map
                key={Key}
                center={center}
                renderPolylines={renderPolylines}
              ></Map>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
