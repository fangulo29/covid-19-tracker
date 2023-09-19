import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Stats({ data }) {
  return (
    <Paper elevation={3}>
      <Typography variant="h6" component="div">
        Total Cases: {data?.totalCases ?? 0}
      </Typography>
      <Typography variant="h6" component="div">
        Total Deaths: {data?.totalDeaths ?? 0}
      </Typography>
      <Typography variant="h6" component="div">
        Total Recovered: {data?.totalRecovered ?? 0}
      </Typography>
    </Paper>
  );
}

export default Stats;
