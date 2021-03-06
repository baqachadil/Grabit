import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Profile from "../../assets/images/Profile.png";
import Notif from "../../assets/images/notif.png";
import Home from "../../assets/images/home.png";
import Faq from "../../assets/images/faq.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    height: 592,
    width: 255,
    marginLeft: 150,
    marginTop: 50,
    backgroundColor: "white",
    fontSize: 15
  },
  item: {
    padding: 20,
    wordSpacing: 10,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#D6C1BD"
    }
  },
  info: {
    padding: 30
  },
  images: {
    marginTop: 3,
    width: 16,
    height: 16
  },
  selected: {
    padding: 20,
    wordSpacing: 10,
    backgroundColor: "#F71117",
    color: "white",
    cursor: "pointer"
  },
  userImg: {
    borderRadius: "100%",
    cursor: "pointer"
  },
  line: {
    height: 1,
    backgroundColor: "#DEDEDE",
    marginBottom: 30
  }
}));

export default function SideMenu({ currentUser }) {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState();
  const history = useHistory();

  useEffect(() => {
    const tab = window.location.pathname.split("/");
    setCurrentPage(tab[2]);
  }, [currentPage]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={12}
          className={
            currentPage === "profile" ? classes.selected : classes.item
          }
          onClick={() => {
            history.push("profile");
            setCurrentPage("profile");
          }}
        >
          <Grid container>
            <Grid item xs={2}>
              <img alt="Path" src={Profile} className={classes.images} />
            </Grid>
            <Grid item xs={3}>
              <span>Profile</span>
            </Grid>
          </Grid>
        </Grid>

        {currentUser?.typeUser === "Customer" && (
          <Grid
            item
            xs={12}
            className={
              currentPage === "requests" ? classes.selected : classes.item
            }
            onClick={() => {
              history.push("requests");
              setCurrentPage("requests");
            }}
          >
            <Grid container>
              <Grid item xs={2}>
                <img alt="Path" src={Notif} className={classes.images} />
              </Grid>
              <Grid item xs={3}>
                <span>Requests</span>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          className={currentPage === "adress" ? classes.selected : classes.item}
          onClick={() => {
            history.push("adress");
            setCurrentPage("adress");
          }}
        >
          <Grid container>
            <Grid item xs={2}>
              <img alt="Path" src={Home} className={classes.images} />
            </Grid>
            <Grid item xs={3}>
              <span>Address</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className={currentPage === "faq" ? classes.selected : classes.item}
          onClick={() => {
            history.push("faq");
            setCurrentPage("faq");
          }}
        >
          <Grid container>
            <Grid item xs={2}>
              <img alt="Path" src={Faq} className={classes.images} />
            </Grid>
            <Grid item xs={3}>
              <span>FAQ</span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
