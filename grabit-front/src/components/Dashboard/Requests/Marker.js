import React from "react";
import delivery from "../../../assets/images/delivery.png";
import pickup from "../../../assets/images/pickup.png";
import driver from "../../../assets/images/grabitMarker.png";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  popover: {
    width: 100,
    borderRadius: 4,
    padding: 5,
    backgroundColor: "white",
    boxShadow: "0px 0px #888888",
    fontSize: 12
  }
}));

export default function Marker({ type, show, onMouseEnter, onMouseLeave }) {
  const classes = useStyles();
  const Imgsrc =
    type === "delivery" ? delivery : type === "pickup" ? pickup : driver;
  const label =
    type === "delivery"
      ? "Delivery address"
      : type === "pickup"
      ? "Pickup address"
      : "Driver current location";

  return (
    <>
      <img
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ cursor: "pointer" }}
        src={Imgsrc}
        alt="marker"
      />
      {show && (
        <div className={classes.popover}>
          {" "}
          <strong> {label} </strong>
        </div>
      )}
    </>
  );
}
