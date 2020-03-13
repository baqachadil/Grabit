import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Grid } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

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
  const [center] = useState({ lat: 33.99647, lng: -6.84729 });
  const [zoom] = useState(15);
  const [show, setShow] = useState([false, false, false]);

  const getMapBounds = (map, maps, locations) => {
    const bounds = new maps.LatLngBounds();

    locations.forEach(location => {
      bounds.extend(new maps.LatLng(location.lat, location.lng));
    });
    return bounds;
  };

  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListener(map, "idle", () => {
      maps.event.addDomListener(window, "resize", () => {
        map.fitBounds(bounds);
      });
    });
  };

  const apiIsLoaded = (map, maps, locations) => {
    if (map) {
      const bounds = getMapBounds(map, maps, locations);
      map.fitBounds(bounds);
      bindResizeListener(map, maps, bounds);
    }
  };

  const handleOpenPop = i => {
    let array = [...show];
    array[i] = true;
    setShow(array);
  };

  const handleClosePop = i => {
    let array = [...show];
    array[i] = false;
    setShow(array);
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
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCL3qzgqg6P8crdHBcQMnOQo7KWFnOkpVs"
              }}
              zoom={zoom}
              center={center}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                apiIsLoaded(map, maps, addresses)
              }
            >
              {addresses.map((add, i) => (
                <Marker
                  lat={add.lat}
                  lng={add.lng}
                  type={i === 0 ? "delivery" : i === 1 ? "pickup" : "driver"}
                  key={i}
                  onMouseEnter={() => handleOpenPop(i)}
                  onMouseLeave={() => handleClosePop(i)}
                  show={show[i]}
                />
              ))}
            </GoogleMapReact>
            ;
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
}
