import React from "react";
import FacebookLogin from "react-facebook-login";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Grid } from "@material-ui/core";
import fbIcone from "../../../assets/images/fbIcone.png";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  fbbutton: {
    width: "300px",
    height: "56px",
    backgroundColor: "#1976F3",
    border: "none",
    borderRadius: "4px",
    color: "white",
    backgroundImage: `url(${fbIcone})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "20px 10px",
    cursor: "pointer"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "none",
    borderRadius: 4,
    boxShadow: theme.shadows[5],
    padding: 10,
    textAlign: "center",
    outline: "none"
  }
}));
export default function FacebookComponent(props) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.opened}
      onClose={props.handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade className={classes.paper} in={props.opened}>
        {props.type === "SingIn" ? (
          <div>
            <Grid container spacing={2}>
              <Grid style={{ fontSize: 25 }} item xs={12}>
                Welcom Back
              </Grid>
              <Grid item xs={6}>
                <h3>Sign in as Driver</h3>
                <FacebookLogin
                  appId="1082097762141876"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={props.fctDriver}
                  cssClass={classes.fbbutton}
                />
              </Grid>
              <Grid item xs={6}>
                <h3>Sign in as Customer</h3>
                <FacebookLogin
                  appId="1082097762141876"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={props.fctCustomer}
                  cssClass={classes.fbbutton}
                />
              </Grid>
            </Grid>
          </div>
        ) : (
          <div className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h3>Sign up as {props.type} </h3>
                <FacebookLogin
                  appId="1082097762141876"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={props.responseFacebook}
                  cssClass={classes.fbbutton}
                />
              </Grid>
            </Grid>
          </div>
        )}
      </Fade>
    </Modal>
  );
}
