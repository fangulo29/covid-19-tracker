import React from 'react';
import TextField from '@mui/material/TextField';

function DateSelector({ startDate, endDate, onDateChange }) {
  return (
    <div>
      <TextField
        id="start-date"
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => onDateChange('start', e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="end-date"
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => onDateChange('end', e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}

export default DateSelector;
