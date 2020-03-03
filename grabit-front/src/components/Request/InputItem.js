import React from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  addItem: {
    height: 40,
    width: 350,
    marginTop: 5
  }
}));

export default function InputItem({ itemInputChanged, value, KeyPress }) {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      onChange={itemInputChanged}
      onKeyDown={KeyPress}
      InputProps={{ className: classes.addItem, value: value }}
      placeholder="Please add an item"
    />
  );
}
