import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";

import {
  fetchHistoricDataByDate,
  fetchStateStats,
  fetchHistoricDataByDateAndState,
} from "../services/covidApi";
import Graph from "../components/Graph";
import StateFilter from "../components/StateFilter";
import Stats from "../components/Stats";
import { formatLocalDate } from "../components/form-helpers";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function HistoricStats() {
  const currentDate = formatLocalDate(new Date("2021-03-07"));

  const [selectedStartDate, setSelectedStartDate] = useState(currentDate);
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
        if (selectedStartDate && selectedState) {
          const historicData = await fetchHistoricDataByDateAndState(
            selectedStartDate.replace(/-/g, ""),
            selectedState.state
          );
          setChartData([historicData]);
          const stateStatsData = await fetchStateStats(selectedState.state);
          setStats(stateStatsData);
        } else if (selectedStartDate) {
          const stateStatsData = await fetchHistoricDataByDate(
            selectedStartDate.replace(/-/g, "")
          );
          setStats(stateStatsData);
          setChartData([stateStatsData]);
        } else if (selectedState) {
          const stateStatsData = await fetchStateStats(selectedState.state);
          setStats(stateStatsData);
          setChartData([stateStatsData]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedStartDate, selectedState]);

  return (
    <>
      <Helmet>
        <title>COVID-19 USA - Historic Stats</title>
        <meta name="title" content="Coronavirus: Historic Map and Case Count" />
        <link rel="icon" type="image/png" href="favicon.png"></link>
      </Helmet>

      <div className="historic-stats">
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="#607d8b">
                Historic stats
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="start-date"
                label="Selected Date"
                type="date"
                value={selectedStartDate}
                onChange={(e) => setSelectedStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Paper>
                <StateFilter
                  selectedState={selectedState}
                  onStateChange={onChangeSelectedState}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Stats data={stats} />
            </Grid>

            <Grid item xs={12}>
              <Paper
                item
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "auto",
                }}
              >
                <Graph data={chartData} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default HistoricStats;
