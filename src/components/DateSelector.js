import React from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

function DateSelector({ startDate, endDate, onDateChange }) {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid item xs={8}>
        <TextField
          item
          fullWidth
          id="start-date"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => onDateChange("start", e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs={8}>
        <TextField
          item
          fullWidth
          id="end-date"
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => onDateChange("end", e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default DateSelector;
