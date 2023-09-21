import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";

import {
  fetchOverallStats,
  fetchHistoricData,
  fetchStateStats,
} from "../services/covidApi";
import Chart from "../components/Chart";
import Stats from "../components/Stats";
import { formatLocalDate } from "../components/form-helpers";

function Home() {
  const currentDate = formatLocalDate(new Date());
  const [selectedState, setSelectedState] = useState(null);
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const overallStatsData = await fetchOverallStats();

      // console.log(overallStatsData[0]);

      setStats(overallStatsData[0]);

      if (selectedState) {
        const historicData = await fetchHistoricData(currentDate, currentDate);

        setChartData(historicData);
      } else if (selectedState) {
        const stateStatsData = await fetchStateStats(selectedState.state);

        setStats(stateStatsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedState]);

  return (
    <>
      <Helmet>
        <title>COVID-19 USA - Current Stats</title>
        <meta name="title" content="Coronavirus: Latest Map and Case Count" />
      </Helmet>

      <div className="Home">
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Stats item data={stats} />

            <Grid item container style={{ margin: 0 }}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "auto",
                }}
              >
                <Chart data={chartData} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default Home;
