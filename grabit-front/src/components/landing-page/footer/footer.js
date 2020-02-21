import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import footerBg from "../../../assets/images/footerLogo.png";
import send from "../../../assets/images/send.png";

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: "Montserrat",
    backgroundColor: "#F71117",
    backgroundImage: `url(${footerBg})`,
    backgroundRepeat: "no-repeat",
    height: "400px",
    backgroundSize: 439,
    color: "white",
    textAlign: "center"
  },
  input: {
    width: 471,
    height: 56,
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    border: "none",
    fontSize: "15px",
    paddingLeft: "20px"
  },
  button: {
    backgroundColor: "#1B1B1B",
    width: 160,
    height: 58,
    border: "none",
    color: "white",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
    fontSize: "15px"
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={7} style={{ marginTop: "70px" }}>
        <h1>Ready to order?</h1>
        <p style={{ fontSize: "25px", wordSpacing: "5px" }}>
          Browse local restaurants and businesses available in <br /> your area
          for delivery by entering your address below.
        </p>
      </Grid>
      <Grid item xs={12}>
        <input
          placeholder="mail@example.com"
          type="text"
          className={classes.input}
        />
        <button className={classes.button}>
          Send
          <img src={send} alt="Send" style={{ marginLeft: "5px" }} />
        </button>
      </Grid>
    </Grid>
  );
}
