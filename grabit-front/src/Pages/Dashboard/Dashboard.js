import React, { useState, useEffect } from "react";
import Navbar from "../../components/Dashboard/NavBar";
import SideMenu from "../../components/Dashboard/SideMenu";
import Router from "./Dash-Router";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [currentUser, setCurrentUSer] = useState();
  const [userType, setUserType] = useState();
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("JwtToken")) {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("JwtToken")
        }
      };
      axios.get("/users/getCurrentUser", config).then(res => {
        setCurrentUSer(res.data);
        setUserType(localStorage.getItem("UserType"));
      });
    } else {
      history.push("/");
    }
  }, [history]);

  const onLogOut = () => {
    setCurrentUSer("");
    localStorage.removeItem("JwtToken");
    localStorage.removeItem("UserType");
    history.push("/");
  };

  return (
    <>
      <Navbar
        currentUser={currentUser}
        onLogOut={onLogOut}
        page={"dash"}
        userType={userType}
      />
      <Grid container>
        <Grid item xs={4}>
          <SideMenu currentUser={currentUser} />
        </Grid>
        <Grid item xs={8}>
          <Router currentUser={currentUser}></Router>
        </Grid>
      </Grid>
    </>
  );
}
