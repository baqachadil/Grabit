import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GrabitLogo from "../../assets/images/GrabitLogo2.png";
import Path from "../../assets/images/Path.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 90,
    backgroundColor: "white",
    paddingTop: 15,
    paddingLeft: 60,
    textAlign: "center",
    fontFamily: "Montserrat"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  order: {
    backgroundColor: "#F71117",
    color: "white",
    height: 50,
    width: 255,
    marginTop: 5,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 18,
    outline: "none"
  },
  userImg: {
    borderRadius: "100%",
    cursor: "pointer"
  }
}));

export default function NavBar({ currentUser, onLogOut, page, userType }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={2}>
        <img
          alt="GrabitLogo"
          src={GrabitLogo}
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/")}
        />
      </Grid>
      <Grid item xs={6}>
        {page === "dash" && (
          <button
            onClick={() => {
              userType === "Customer"
                ? history.push("/Request")
                : history.push("/Assignements");
            }}
            className={classes.order}
          >
            <img alt="Path" src={Path} />{" "}
            {userType === "Customer"
              ? "Request an Order"
              : "See your assignements"}
          </button>
        )}
      </Grid>
      <Grid item style={{ paddingTop: 18, fontSize: 18 }} xs={1}>
        <span>{currentUser?.Name}</span>
      </Grid>
      <Grid item xs={1}>
        <div>
          <img
            className={classes.userImg}
            onClick={handleMenu}
            alt={currentUser?.name}
            src={currentUser?.image}
          />
          <Menu
            id="menu-appbar"
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => history.push("/dashboard/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={onLogOut}>LogOut</MenuItem>
          </Menu>
        </div>
      </Grid>
    </Grid>
  );
}
