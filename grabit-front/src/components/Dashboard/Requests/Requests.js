import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
//import Moment from "moment";
import RoomIcon from "@material-ui/icons/Room";
import ModalMap from "./ModalMap";
import io from "socket.io-client";
const socket = io("http://localhost:2000");

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    marginTop: 42
  },
  title: {
    fontSize: 14
  },
  date: {
    color: "#849FB1"
  },
  state: {
    width: 14,
    borderRadius: "100%",
    height: 14,
    textAlign: "center",
    color: "#443a3a",
    position: "absolute",
    top: 23
  },
  pending: {
    backgroundColor: "#caca3b",
    right: 82
  },
  picked: {
    backgroundColor: "#7CFC00",
    right: 77
  },
  itemList: {
    marginLeft: 10,
    minHeight: 40,
    marginTop: 20
  },
  price: {
    fontSize: 25
  },
  card: {
    minHeight: 60,
    position: "relative"
  }
}));

export default function Requests() {
  const classes = useStyles();
  const [RequestsList, setRequestList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentAddresses, setCurrentAdd] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = async i => {
    setCurrentAdd([
      RequestsList[i].delivery_address,
      RequestsList[i].pickup_address,
      RequestsList[i].driver_location
    ]);
    setOpen(true);
  };

  useEffect(() => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JwtToken")
      }
    };

    axios
      .get("/requests/all", config)
      .then(res => {
        setRequestList(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    socket.on("connect", function() {
      console.log("socket connected");
    });

    socket.on("notifiCustomer", data => {
      setRequestList(current => {
        for (var i = 0; i < current.length; i++) {
          if (current[i].driver_id === data.driver_id) {
            current[i].driver_location = data.coords;
          }
        }
        return [...current];
      });

      setCurrentAdd(current => {
        current[2] = data.coords;
        return [...current];
      });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2} className={classes.root}>
      {RequestsList?.map((request, i) => (
        <Grid key={i} item xs={6}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <span className={classes.price}>{request.total_cost}</span>
              <span style={{ fontSize: 17, color: "rgba(0, 0, 0, 0.55)" }}>
                MAD
              </span>
              <div
                className={`${classes.state} ${
                  request.State === "Pending" ? classes.pending : classes.picked
                }`}
              ></div>
              <span
                style={{
                  position: "absolute",
                  right: 12,
                  top: 20,
                  color: "rgba(0, 0, 0, 0.55)"
                }}
              >
                {request.State}
              </span>
              <Grid className={classes.itemList}>
                {request.item_list.join(", ")}
              </Grid>
            </CardContent>
            <CardActions
              style={{
                backgroundColor: "rgb(255, 234, 234)",
                justifyContent: "flex-end",
                alignItems: "flex-end"
              }}
            >
              <Button
                onClick={() => handleOpen(i)}
                size="small"
                style={{ color: "#0000008c" }}
              >
                <RoomIcon></RoomIcon>
                See in Map
              </Button>
              <ModalMap
                open={open}
                addresses={currentAddresses !== null ? currentAddresses : []}
                handleClose={handleClose}
              ></ModalMap>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
