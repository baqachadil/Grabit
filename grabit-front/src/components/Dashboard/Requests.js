import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50,
    width: 825,
    height: 592,
    backgroundColor: "white"
  },
  request: {
    width: "100%"
  },
  listreq: {
    maxHeight: "100%",
    overflowY: true
  },
  state: {
    position: "absolute",
    right: 70,
    bottom: 30,
    width: 70,
    borderRadius: 4,
    backgroundColor: "red",
    color: "white",
    textAlign: "center"
  }
}));

export default function Requests() {
  const classes = useStyles();
  const [RequestsList, setRequestList] = useState();

  useEffect(() => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JwtToken")
      }
    };

    axios
      .get("/requests/all", config)
      .then(res => {
        setRequestList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [RequestsList]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={6}>
        <Grid container className={classes.listreq}>
          {RequestsList?.map(req => (
            <ExpansionPanel className={classes.request}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3>{req.description}</h3>
                <div className={classes.state}>
                  {" "}
                  <span style={{ verticalAlign: "middle" }}>{req.State}</span>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.reqBody}>
                <Typography>
                  <span>
                    <strong>Items :</strong>
                  </span>
                  {req.item_list.map(item => (
                    <span>{item},</span>
                  ))}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
