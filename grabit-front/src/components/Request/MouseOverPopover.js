import React from "react";
import Popover from "@material-ui/core/Popover";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: "none",
    width: 900
  },
  paper: {
    padding: theme.spacing(1)
  },

  goBack: {
    cursor: "pointer",
    position: "absolute",
    borderRadius: "100%",
    fontSize: 30,
    "&:hover": {
      backgroundColor: "#D6C1BD",
      color: "white"
    }
  }
}));

export default function MouseOverPopover({ type }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {type === "goBack" ? (
        <ArrowBackIcon
          className={classes.goBack}
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          onClick={() => history.push("/dashboard/profile")}
        ></ArrowBackIcon>
      ) : (
        <InfoIcon
          style={{ marginTop: 7 }}
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        ></InfoIcon>
      )}
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {type === "goBack" ? (
          <span>Go Back To Profile</span>
        ) : (
          <span>
            If you want to share the same courier with other customers
          </span>
        )}
      </Popover>
    </div>
  );
}
