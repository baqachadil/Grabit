import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50,
    width: 825,
    height: 592,
    backgroundColor: "white"
  },
  head: {
    padding: 42,
    fontSize: 25
  },
  line: {
    height: 1,
    backgroundColor: "#DEDEDE"
  },
  form: {
    paddingTop: 40
  },
  input: {
    height: 40,
    width: 329,
    marginTop: 5
  },
  inputText: {
    color: "#849FB1"
  },
  update: {
    backgroundColor: "#F71117",
    color: "white",
    height: 40,
    width: 329,
    marginTop: 5,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15
  },
  userImg: {
    borderRadius: "100%",
    width: 120,
    height: 120,
    objectFit: "cover",
    objectPosition: "50% 50%"
  },
  imgUpdate: {
    backgroundColor: "#333C45",
    color: "white",
    height: 30,
    width: 80,
    marginTop: 5,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15
  },
  imgRemove: {
    backgroundColor: "#849FB1",
    color: "white",
    height: 30,
    width: 80,
    marginTop: 5,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15
  }
}));

export default function Profile({ currentUser }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} className={classes.head}>
          <span>Profile Settings</span>
        </Grid>
        <Grid item xs={12} className={classes.line}></Grid>
        <Grid item xs={6}>
          <Grid container spacing={3} className={classes.form}>
            <Grid item xs={12}>
              <span className={classes.inputText}>First & Last Name</span>
              <TextField
                id="outlined-basic"
                variant="outlined"
                InputProps={{ className: classes.input }}
                value={currentUser?.Name}
              />
            </Grid>
            <Grid item xs={12}>
              <span className={classes.inputText}>E-mail</span> <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                InputProps={{ className: classes.input }}
                value={currentUser?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <span className={classes.inputText}>Phone</span>
              <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                InputProps={{ className: classes.input }}
                value={currentUser?.phone}
                placeholder="Please enter Your phone Number !"
              />
            </Grid>
            <Grid item xs={12}>
              <button className={classes.update}>Update</button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container justify="center">
            <Grid item xs={12} style={{ textAlign: "center", paddingTop: 40 }}>
              <img
                src={currentUser?.image}
                alt={currentUser?.Name}
                className={classes.userImg}
              />
            </Grid>
            <Grid item xs={4}>
              <button className={classes.imgUpdate}>Update</button>
            </Grid>
            <Grid item xs={4}>
              <button className={classes.imgRemove}>Remove</button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
