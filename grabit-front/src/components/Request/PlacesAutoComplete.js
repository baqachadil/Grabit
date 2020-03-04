import React from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";

const useStyles = makeStyles(() => ({
  add: {
    height: 40,
    width: 420,
    marginTop: 25
  },
  sugg: {
    position: "absolute",
    zIndex: 99,
    width: 400,
    borderRadius: 4
  },
  suggestion: {
    border: "none",
    width: 400,
    padding: 10,
    backgroundColor: "rgba(53, 54, 58, 0.82)",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(53, 54, 58, 0.45)"
    }
  }
}));

const PlacesAutocomplete = ({ setMarkers, markerNum, setCenter, error }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: "componentRestrictions",
    debounce: 300
  });

  const handleInput = e => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setMarkers(markerNum, { lat, lng });
        setCenter({ lat, lng });
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <div
          key={id}
          onClick={handleSelect(suggestion)}
          className={classes.suggestion}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </div>
      );
    });

  const classes = useStyles();
  return (
    <div>
      <TextField
        value={value}
        onChange={handleInput}
        variant="outlined"
        disabled={!ready}
        InputProps={{ className: classes.add }}
        placeholder="Your Address"
      />
      {error !== null && <div style={{ color: "red" }}>{error}</div>}
      {status === "OK" && (
        <div className={classes.sugg}>{renderSuggestions()}</div>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
