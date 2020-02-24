import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50,
    width: 825,
    height: 592,
    backgroundColor: "white"
  }
}));

export default function Requests() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid>Requests</Grid>
    </Grid>
  );
}
