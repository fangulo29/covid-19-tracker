import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function Stats({ data }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom color="#607d8b">
          Latest data collected: {data.date}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card item>
          <CardContent>
            <Typography
              sx={{ fontSize: 16, mb: 1.5 }}
              color="#4db6ac"
              gutterBottom
            >
              Total Tests
            </Typography>
            <Typography sx={{ fontSize: 36 }} color="#4db6ac">
              {data?.totalTestResults ?? 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card item>
          <CardContent>
            <Typography
              sx={{ fontSize: 16, mb: 1.5 }}
              color="#f44336"
              gutterBottom
            >
              Total Deaths
            </Typography>
            <Typography sx={{ fontSize: 36 }} color="#f44336">
              {data?.death ?? 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card item>
          <CardContent>
            <Typography
              sx={{ fontSize: 16, mb: 1.5 }}
              color="#90caf9"
              gutterBottom
            >
              Total Hospitalized
            </Typography>
            <Typography sx={{ fontSize: 36 }} color="#90caf9">
              {data?.hospitalized ?? 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card item>
          <CardContent>
            <Typography
              sx={{ fontSize: 16, mb: 1.5 }}
              color="#ff9800"
              gutterBottom
            >
              Total Positive
            </Typography>
            <Typography sx={{ fontSize: 36 }} color="#ff9800">
              {data?.positive ?? 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Stats;
