import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import img1 from "../../../assets/images/Man.png";
import img2 from "../../../assets/images/Store.png";
import img3 from "../../../assets/images/moto.png";
import img4 from "../../../assets/images/deliver.png";
import img5 from "../../../assets/images/deliver2.png";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 60,
    width: "80%",
    margin: "auto",
    fontFamily: "Montserrat"
  },
  centertext: {
    textAlign: "center"
  }
}));

export default function Body() {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root} spacing={7}>
      <Grid className={classes.centertext} item xs={12}>
        <h2>How it works</h2>
      </Grid>
      <Grid item xs={6}>
        <h1>We do more than delivery .</h1>
        <p>
          Stocking Your Restaurant Kitchen Finding Reliable Sellers <br />
          Of Cookware In The Brik And Mortar World
        </p>
      </Grid>
      <Grid className={classes.centertext} item xs={3}>
        <img alt="man" className={classes.man} src={img1}></img>
      </Grid>
      <Grid item xs={3}>
        <img alt="store" src={img2}></img>
      </Grid>
      <Grid item xs={6}>
        <img alt="store" src={img3}></img>
      </Grid>
      <Grid item xs={6}>
        <h1>
          Fast Delivery with <br /> tracking.
        </h1>
        <p>
          Breast Augmentation Breast Enlargement Medical Tourism In The
          Philippine
        </p>
      </Grid>
      <Grid item xs={6}>
        <h1>Stay at home we do it for you</h1>
        <p>
          Planning Helps Make A Party Perfect Keep Dinner Simple Heat Frozen
          Vegetables And Precooked Smoked Sausage Together For A Complete Meal
        </p>
      </Grid>
      <Grid item xs={3}>
        <img alt="store" src={img4}></img>
      </Grid>
      <Grid item xs={3}>
        <img alt="store" src={img5}></img>
      </Grid>
    </Grid>
  );
}
