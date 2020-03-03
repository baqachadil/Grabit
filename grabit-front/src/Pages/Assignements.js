import React, { useEffect, useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import NavBar from "../components/Dashboard/NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 50,
    height: 900,
    backgroundColor: "white",
    width: 920,
    margin: "auto"
  }
}));

export default function Assignements() {
  const classes = useStyles();
  const [currentUser, setCurrentUSer] = useState();
  const history = useHistory();

  useEffect(() => {
    if (
      localStorage.getItem("JwtToken") &&
      localStorage.getItem("UserType") === "Driver"
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

  return (
    <>
      <NavBar
        currentUser={currentUser}
        onLogOut={onLogOut}
        page={"assignements"}
      ></NavBar>
      <Grid className={classes.root}></Grid>
    </>
  );
}
