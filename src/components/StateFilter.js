import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { STATES } from "../services/covidApi";

function StateFilter({ selectedState, onStateChange }) {
  return (
    <Autocomplete
      id="state-filter"
      options={STATES}
      getOptionLabel={(state) => state.name}
      value={selectedState}
      onChange={(e, newValue) => onStateChange(newValue)}
      renderInput={(params) => <TextField {...params} label="Select State" />}
    />
  );
}

export default StateFilter;
