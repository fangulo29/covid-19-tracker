import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";

import {
  fetchOverallStats,
  fetchHistoricToDailyData,
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
      setStats(overallStatsData[0]);

      const historicData = await fetchHistoricToDailyData();
      setChartData(historicData);
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
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stats item data={stats} />
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
