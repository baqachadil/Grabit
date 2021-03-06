import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FacebookAuth from "./FacebookLogin";
import axios from "axios";
import grabitLogo from "../../../assets/images/GrabitLogo.png";
import headerBg from "../../../assets/images/headerImg.png";
import helmet from "../../../assets/images/helmet.png";
import user from "../../../assets/images/user.png";
import arrow from "../../../assets/images/arrow.png";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    height: 650,
    backgroundImage: `url(${headerBg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: 60,
    [theme.breakpoints.down("xs")]: {
      padding: 20
    }
  },
  title: {
    color: "white",
    fontSize: "60px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "50px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px"
    },
    margin: "auto",
    fontFamily: "Montserrat"
  },
  signup: {
    borderRadius: "2%",
    padding: "30px",
    cursor: "pointer",
    width: "70%",
    height: "80px",
    [theme.breakpoints.down("sm")]: {
      padding: "15px",
      width: "80%",
      height: "90px"
    }
  },
  signupd: {
    [theme.breakpoints.down("xs")]: {
      width: "50%",
      margin: "auto"
    },
    marginLeft: "auto",
    marginRight: "10px",
    border: "1px gray solid",
    "&:hover": {
      border: "1px white solid",
      backgroundColor: "#F71117"
    }
  },
  signupc: {
    [theme.breakpoints.down("xs")]: {
      width: "50%",
      margin: "auto"
    },
    marginRight: "auto",
    marginLeft: "10px",
    border: "1px gray solid",
    "&:hover": {
      border: "1px white solid",
      backgroundColor: "#F71117"
    }
  },
  signin: {
    backgroundColor: "#F71117",
    color: "white",
    marginTop: "5px",
    minWidth: "70px",
    width: "60%",
    "&:hover": {
      backgroundColor: "#E11111"
    }
  },
  arrow: {
    float: "right",
    marginTop: "4px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState();
  const [isCustomer, setisCustomer] = React.useState(false);
  const [openedSignIn, setOpenedSignIn] = React.useState(false);
  const [openedDriver, setOpenedDriver] = React.useState(false);
  const [openedCustomer, setOpenedCustomer] = React.useState(false);
  const [token, setToken] = React.useState();
  let history = useHistory();

  useEffect(() => {
    //Getting the user's data
    if (localStorage.getItem("JwtToken")) {
      setAuth(true);
      setToken(localStorage.getItem("JwtToken"));
      localStorage.getItem("UserType") === "Customer"
        ? setisCustomer(true)
        : setisCustomer(false);
    } else {
      setAuth(false);
    }
  }, [token]);

  const SignInDriver = async data => {
    const user = {
      id: data.id
    };
    const type = "Driver";
    let url = "users/signin";
    sendRequest({ user, type }, url);
  };

  const SignInCustomer = async data => {
    const user = {
      id: data.id
    };
    const type = "Customer";
    let url = "users/signin";
    sendRequest({ user, type }, url);
  };

  const SignUp = async data => {
    const user = {
      id: data.id,
      Name: data.name,
      email: data.email,
      image: data.picture.data.url
    };

    //Specifie the user's type (Customer, Driver)
    const type = openedCustomer ? "Customer" : "Driver";
    let url = "users/signup";
    sendRequest({ user, type }, url);
  };

  const sendRequest = async ({ user, type }, url) => {
    await axios
      .post(url, { user, type })
      .then(res => {
        localStorage.setItem("JwtToken", res.data.token);
        localStorage.setItem("UserType", res.data.type);
        setToken(res.data.token);
        setAuth(true);
        history.push("/dashboard/profile");
        if (type === "Driver") {
          navigator.geolocation.getCurrentPosition(
            async res => {
              user.location = {
                type: "Point",
                coordinates: [res.coords.latitude, res.coords.longitude]
              };
              let config = {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("JwtToken")
                }
              };
              await axios
                .post("/users/updateLocation", { user }, config)
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log(err);
                });
            },
            err => {
              console.log(err);
            },
            { timeout: 10000 }
          );
        }
      })
      .catch(err => {
        if (err.response.status === 404) {
          Swal.fire({
            title: "Do you want to Sign Up?",
            text: "You do not have an account yet!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            width: 400
          }).then(result => {
            if (result.value) {
              type === "Customer"
                ? setOpenedCustomer(true)
                : setOpenedDriver(true);
            }
          });
        } else {
          console.log(err.response);
        }
      });
    setOpenedCustomer(false);
    setOpenedSignIn(false);
    setOpenedDriver(false);
  };

  return (
    <>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={1} sm={3}>
          <img
            alt="GrabitLogo"
            src={grabitLogo}
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/")}
          />
        </Grid>
        <Grid item xs={7} sm={6}></Grid>
        <Grid item xs={4} sm={3} style={{ textAlign: "center" }}>
          {!auth && (
            <div>
              <Button
                onClick={() => setOpenedSignIn(true)}
                className={classes.signin}
              >
                Sign in
              </Button>
              <FacebookAuth
                type={"SingIn"}
                fctDriver={SignInDriver}
                fctCustomer={SignInCustomer}
                handleCloseModal={() => setOpenedSignIn(false)}
                opened={openedSignIn}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <span className={classes.title}>
            we{" "}
            <i>
              <b>deliver</b>
            </i>{" "}
            it to your{" "}
            <i>
              <b>door</b>
            </i>{" "}
            within <br />
            <i>
              <b>one hour</b>
            </i>
          </span>
        </Grid>
        {!auth ? (
          <>
            <Grid item xs={12} sm={4}>
              <div
                onClick={() => setOpenedDriver(true)}
                className={`${classes.signupd}  ${classes.signup}`}
              >
                <img alt="helmet" src={helmet} />
                <div
                  style={{
                    color: "white",
                    fontFamily: "Montserrat",
                    marginTop: "20px",
                    fontSize: "20px"
                  }}
                >
                  sign up as Driver
                  <img alt="arrow" src={arrow} className={classes.arrow} />
                </div>
              </div>
              <FacebookAuth
                type={"Driver"}
                responseFacebook={SignUp}
                handleCloseModal={() => setOpenedDriver(false)}
                opened={openedDriver}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <div
                onClick={() => setOpenedCustomer(true)}
                className={`${classes.signupc}  ${classes.signup}`}
              >
                <img alt="user" src={user} />
                <div
                  style={{
                    color: "white",
                    fontFamily: "Montserrat",
                    marginTop: "20px",
                    fontSize: "20px"
                  }}
                >
                  sign up as Customer
                  <img alt="arrow" src={arrow} className={classes.arrow} />
                </div>
              </div>
              <FacebookAuth
                type={"Customer"}
                responseFacebook={SignUp}
                handleCloseModal={() => setOpenedCustomer(false)}
                opened={openedCustomer}
              />
            </Grid>
          </>
        ) : (
          <Grid item xs={4}>
            <div
              onClick={() => history.push("/dashboard/profile")}
              className={`${classes.signupc}  ${classes.signup}`}
            >
              {isCustomer ? (
                <img alt="user" src={user} />
              ) : (
                <img alt="helmet" src={helmet} />
              )}
              <div
                style={{
                  color: "white",
                  fontFamily: "Montserrat",
                  marginTop: "20px",
                  fontSize: "20px"
                }}
              >
                Continue To Your profile
                <img alt="arrow" src={arrow} className={classes.arrow} />
              </div>
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
}
