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
import Add from "../assets/images/add.png";
import Remove from "../assets/images/remove.png";
import InputItem from "../components/Request/InputItem";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Switch from "@material-ui/core/Switch";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import MouseOver from "../components/Request/MouseOverPopover";

const useStyles = makeStyles(theme => ({
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
  inputText: {
    color: "#849FB1"
  },
  items: {
    paddingLeft: 25
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
  },
  itemList: {
    maxHeight: 130,
    minHeight: 50,
    overflowY: "auto",
    width: 350
  },
  addBtn: {
    position: "absolute",
    right: 25,
    bottom: 25,
    cursor: "pointer"
  },
  singleItem: {
    padding: 10
  },
  removeBtn: {
    marginRight: 6,
    marginTop: 3,
    cursor: "pointer"
  },
  Date: {
    width: 152,
    height: 40,
    marginTop: 5
  },
  datePicker: {
    width: 178,
    height: 28,
    border: "1px solid #DEDEDE",
    borderRadius: 4,
    padding: 5,
    "&:hover": {
      border: "1px black solid"
    },
    marginTop: 5
  },
  Price: {
    height: 40,
    width: 350,
    marginTop: 5
  },
  Request: {
    backgroundColor: "#F71117",
    color: "white",
    height: 40,
    width: 825,
    marginTop: 20,
    marginBottom: 30,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15,
    outline: "none"
  },
  confirm: {
    backgroundColor: "#F71117",
    color: "white",
    height: 40,
    width: 100,
    marginTop: 20,
    marginBottom: 30,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15,
    outline: "none"
  },
  formControl: {
    margin: theme.spacing(2)
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "none",
    borderRadius: 4,
    boxShadow: theme.shadows[5],
    padding: 10,
    width: 350,
    height: 280,
    textAlign: "center",
    outline: "none"
  }
}));

const Unite_Price_Per_Km = 2;

export default function Request() {
  const [markers, setMarkers] = useState([]);
  const [currentUser, setCurrentUSer] = useState();
  const [center, setCenter] = useState({ lat: 33.99647, lng: -6.84729 });
  const [Key, setKey] = useState(1);
  const [itemInput, setItemInput] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [listItems, setlistItems] = useState([]);
  const [deliveryType, setDeliveryType] = useState("ASAP");
  const [desc, setDesc] = useState();
  const [orderPrice, setOrderPrice] = useState(0);
  const [servicePrice, setservicePrice] = useState(0);
  const [duration, setDuration] = useState();
  const [distance, setDistance] = useState();
  const [open, setOpen] = React.useState(false);
  const [checkedShare, setCheckedShare] = useState(false);
  const [success, setSuccess] = useState(false);

  const [errors, setErrors] = useState({
    delivery_address_error: null,
    pickup_address_error: null,
    orderPrice_error: null,
    listItems_error: null
  });

  const handleOpen = () => {
    if (validateForm()) setOpen(true);
  };

  const validateForm = function() {
    let result = true;

    let newerrors = { ...errors };

    if (!markers[0]) {
      newerrors.pickup_address_error = "You must enter a pickup address !!";
      result = false;
    } else {
      newerrors.pickup_address_error = null;
    }

    if (!markers[1]) {
      newerrors.delivery_address_error = "You must enter a delivery address !!";
      result = false;
    } else {
      newerrors.delivery_address_error = null;
    }

    if (orderPrice === 0 || isNaN(orderPrice)) {
      newerrors.orderPrice_error = "You must enter your order's price !!";
      result = false;
    } else {
      newerrors.orderPrice_error = null;
    }

    if (listItems.length === 0) {
      newerrors.listItems_error = "You must give at least one item !!";
      result = false;
    } else {
      newerrors.listItems_error = null;
    }

    setErrors(newerrors);
    return result;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleCheckedChange = () => event => {
    setCheckedShare(event.target.checked);
  };

  useEffect(() => {
    if (
      localStorage.getItem("JwtToken") &&
      localStorage.getItem("UserType") === "Customer"
    ) {
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

  const handleChange = event => {
    setDeliveryType(event.target.value);
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

  const renderPolylines = async function(map, maps) {
    var label;

    //Adding a marker to the map
    for (var i = 0; i < markers.length; i++) {
      i === 0 ? (label = "A") : (label = "B");
      var marker = new maps.Marker({
        position: markers[i],
        map: map,
        label: label
      });
      marker.setMap(map);
    }

    //Adding a path between the two markers
    if (markers.length > 1) {
      var directionsService = new maps.DirectionsService();
      var directionsRenderer = new maps.DirectionsRenderer({
        suppressMarkers: true
      });
      directionsRenderer.setMap(map);

      var location1 = markers[0];
      var location2 = markers[1];
      //var contentString;
      var request = {
        origin: location1,
        destination: location2,
        travelMode: "DRIVING"
      };
      await directionsService.route(request, function(result, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
          const dist = result.routes[0].legs[0].distance.text;
          const dur = result.routes[0].legs[0].duration.text;
          //getting the distance between the two markers
          setDistance(dist);
          //getting the duration between the two markers
          setDuration(dur);
          //calculating the estimated price of the delivery
          setservicePrice(parseFloat(dist) * parseFloat(Unite_Price_Per_Km));
        }
      });
    }
  };

  const addItem = function() {
    if (itemInput !== "") setlistItems(oldlist => [...oldlist, itemInput]);
    setItemInput("");
  };

  const itemInputChanged = function(e) {
    setItemInput(e.target.value);
  };

  const removeItem = function(i) {
    var tab = listItems;
    tab.splice(i, 1);
    setlistItems([...tab]);
  };

  const KeyPress = function(e) {
    if (e.keyCode === 13) {
      if (itemInput !== "") setlistItems(oldlist => [...oldlist, itemInput]);
      setItemInput("");
    }
  };

  const submit = function() {
    handleClose();

    //Submitting the new request to the back-end
    var data = {
      delivery_address: markers[1],
      pickup_address: markers[0],
      description: desc,
      Shared: checkedShare,
      item_list: listItems,
      ASAP: deliveryType === "ASAP" ? true : false,
      Date: selectedDate,
      total_cost: (parseFloat(servicePrice) + parseFloat(orderPrice)).toFixed(
        3
      ),
      duration: parseFloat(duration),
      distance: parseFloat(distance)
    };
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JwtToken")
      }
    };

    axios
      .post("/requests/add", data, config)
      .then(res => {
        console.log(res);
        setSuccess(true);
        history.push("/dashboard/requests");
      })
      .catch(err => {
        console.log(err.response);
      });
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
          <Grid item xs={12} style={{ padding: 20, fontSize: 25 }}>
            <MouseOver type={"goBack"}></MouseOver>
            <Grid style={{ textAlign: "center" }}>
              <span>Request</span>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.line}></Grid>
          <Grid item xs={5} className={classes.items}>
            <span className={classes.inputText}>
              Describe your Order (Optional)
            </span>
            <TextField
              id="orderDescription"
              variant="outlined"
              multiline={true}
              InputProps={{ className: classes.input }}
              placeholder="Please describe Your Order"
              value={desc}
              onChange={e => setDesc(e.target.value)}
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
                  error={errors.pickup_address_error}
                ></PlacesAutoComp>
                <PlacesAutoComp
                  setMarkers={setMarkersArray}
                  markerNum={1}
                  setCenter={setCenter}
                  error={errors.delivery_address_error}
                ></PlacesAutoComp>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} className={classes.items} style={{ marginTop: 20 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ position: "relative" }}>
                <span className={classes.inputText}>Order item list</span>
                <InputItem
                  itemInputChanged={itemInputChanged}
                  value={itemInput}
                  KeyPress={KeyPress}
                />
                <img
                  src={Add}
                  alt="addBtn"
                  className={classes.addBtn}
                  onClick={addItem}
                />
                {errors.listItems_error !== null && (
                  <div
                    style={{ color: "red", position: "absolute", bottom: -5 }}
                  >
                    {errors.listItems_error}
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <Grid className={classes.itemList}>
                  {listItems.map((item, index) => (
                    <Grid container key={index}>
                      <Grid item xs={1}>
                        <img
                          src={Remove}
                          alt="removeBtn"
                          className={classes.removeBtn}
                          onClick={() => removeItem(index)}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <span>{item}</span>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.inputText}>
                  Delivery date
                </FormLabel>
                <RadioGroup value={deliveryType} onChange={handleChange}>
                  <FormControlLabel
                    className={classes.inputText}
                    value="ASAP"
                    control={<Radio />}
                    label="ASAP"
                  />
                  <FormControlLabel
                    className={classes.inputText}
                    value="Schedule"
                    control={<Radio />}
                    label="Schedule"
                  />
                  {deliveryType === "Schedule" && (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className={classes.datePicker}
                        InputProps={{
                          disableUnderline: true
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  )}
                </RadioGroup>
              </FormControl>
              <Grid item xs={12}>
                <span className={classes.inputText}>Order Price</span>
                <TextField
                  variant="outlined"
                  type="number"
                  InputProps={{
                    className: classes.Price,
                    inputProps: { min: 0 }
                  }}
                  placeholder="Enter the price of your Order"
                  value={orderPrice}
                  onChange={e => {
                    e.target.value !== ""
                      ? setOrderPrice(e.target.value)
                      : setOrderPrice(0);
                  }}
                />
                {errors.orderPrice_error !== null && (
                  <div style={{ color: "red" }}>{errors.orderPrice_error}</div>
                )}
              </Grid>
              {
                <Grid item xs={12}>
                  <hr />
                  <strong style={{ marginLeft: 5 }}>
                    Total:{" "}
                    {(
                      parseFloat(servicePrice) + parseFloat(orderPrice)
                    ).toFixed(3)}{" "}
                    MAD
                  </strong>
                </Grid>
              }
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Grid className={classes.map}>
              <Map
                key={Key}
                center={center}
                renderPolylines={renderPolylines}
              ></Map>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <button className={classes.Request} onClick={handleOpen}>
              Request
            </button>
            <Modal
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Confirm Request</h2>
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={checkedShare}
                        onChange={handleCheckedChange("checkedA")}
                        value="checkedA"
                      />
                    }
                    label={
                      <Grid container justify="center" alignItems="center">
                        <Grid item xs={8}>
                          <span>Share</span>
                        </Grid>
                        <Grid item xs={2}>
                          <MouseOver></MouseOver>
                        </Grid>
                      </Grid>
                    }
                  />
                  <p id="transition-modal-description">
                    Estimated Price for delivery : {servicePrice} MAD
                  </p>
                  <p id="transition-modal-description">
                    Estimated duration for delivery : {duration}
                  </p>
                  <button className={classes.confirm} onClick={submit}>
                    Confirm
                  </button>
                </div>
              </Fade>
            </Modal>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          style={{ backgroundColor: "#43a047" }}
          onClose={handleCloseSnack}
          severity="success"
        >
          Your requesst has been added successfuly !
        </Alert>
      </Snackbar>
    </>
  );
}
