import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import {
  fetchOverallStats,
  fetchHistoricData,
  fetchStateStats,
} from "../services/covidApi";
import Chart from "../components/Chart";
import StateFilter from "../components/StateFilter";
import Stats from "../components/Stats";
import { formatLocalDate } from "../components/form-helpers";

const containerStyle = {
  padding: "20px",
};

function HistoricStats() {
  const currentDate = formatLocalDate(new Date());

  const [selectedStartDate, setSelectedStartDate] = useState(currentDate);
  const [selectedEndDate, setSelectedEndDate] = useState(currentDate);
  const [selectedState, setSelectedState] = useState(null);
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);

  const onChangeSelectedState = (state) => {
    if (!!state) {
      setSelectedState(state);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const overallStatsData = await fetchOverallStats();
        setStats(overallStatsData);

        if (selectedStartDate && selectedEndDate && selectedState) {
          const historicData = await fetchHistoricData(
            selectedStartDate,
            selectedEndDate
          );

          console.log(historicData);

          setChartData(historicData);
        } else if (selectedState) {
          const stateStatsData = await fetchStateStats(selectedState.state);

          setStats(stateStatsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedStartDate, selectedEndDate, selectedState]);

  return (
    <>
      <Helmet>
        <title>COVID-19 USA - Historic Stats</title>
        <meta name="title" content="Coronavirus: Latest Map and Case Count" />
      </Helmet>

      <div className="historic-stats">
        <div style={containerStyle}>
          <CssBaseline />
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            COVID-19 Statistics in the USA
          </Typography>
          <Grid container spacing={3}>
            <Grid item container spacing={2} columns={16}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  id="start-date"
                  label="Start Date"
                  type="date"
                  value={selectedStartDate}
                  onChange={(e) => setSelectedStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={8}>
                <TextField
                  fullWidth
                  id="end-date"
                  label="End Date"
                  type="date"
                  value={selectedEndDate}
                  onChange={(e) => setSelectedEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper>
                <StateFilter
                  selectedState={selectedState}
                  onStateChange={onChangeSelectedState}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper>
                <Stats data={stats} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <Chart data={chartData} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default HistoricStats;
