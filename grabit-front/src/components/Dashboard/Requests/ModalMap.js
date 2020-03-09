import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Grid } from "@material-ui/core";
import Map from "../../Request/Map";
import delivery from "../../../assets/images/delivery.png";
import pickup from "../../../assets/images/pickup.png";
import driver from "../../../assets/images/grabitMarker.png";

const useStyles = makeStyles(theme => ({
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
    textAlign: "center",
    outline: "none"
  },
  map: {
    width: 469,
    height: 514,
    margin: "auto"
  },
  backDrop: {
    background: "rgba(14, 14, 14, 0.02)"
  }
}));
export default function ModalMap({ open, handleClose, addresses }) {
  const classes = useStyles();

  const renderPolylines = (map, maps) => {
    let image;
    var bounds = new maps.LatLngBounds();
    var infowindow = new maps.InfoWindow();

    for (var i = 0; i < addresses.length; i++) {
      i === 0
        ? (image = delivery)
        : i === 1
        ? (image = pickup)
        : (image = driver);
      var marker = new maps.Marker({
        position: addresses[i],
        map: map,
        icon: image
      });

      let info =
        i === 0
          ? "Delivery address"
          : i === 1
          ? "Pickup address"
          : "Driver current location";
      maps.event.addListener(
        marker,
        "mouseover",
        (function(marker, i) {
          return function() {
            infowindow.setContent(info);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );

      marker.addListener("mouseout", function() {
        infowindow.close();
      });

      marker.setMap(map);
      bounds.extend(marker.position);
    }
    map.fitBounds(bounds);
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        classes: {
          root: classes.backDrop
        }
      }}
    >
      <Fade className={classes.paper} in={open}>
        <div>
          <Grid container className={classes.map}>
            <Map center={addresses[0]} renderPolylines={renderPolylines}></Map>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
}
