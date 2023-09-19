import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './components/Chart'; // Import your Chart component here
import DateSelector from './components/DateSelector'; // Import your DateSelector component here
import StateFilter from './components/StateFilter'; // Import your StateFilter component here
import Stats from './components/Stats'; // Import your Stats component here
import {
  fetchOverallStats,
  fetchHistoricData,
  fetchStateStats,
} from './services/covidApi'; // Import your API functions

const containerStyle = {
  padding: '20px',
};

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Fetch data when the component mounts and whenever selectedDate or selectedState changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch overall statistics
        const overallStatsData = await fetchOverallStats();
        setStats(overallStatsData);

        if (selectedDate && selectedState) {
          // Fetch historic data based on selected date and state
          const historicData = await fetchHistoricData(selectedState, selectedDate, selectedDate);
          setChartData(historicData);
        } else if (selectedState) {
          // Fetch state-specific statistics
          const stateStatsData = await fetchStateStats(selectedState);
          setStats(stateStatsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedDate, selectedState]);

  return (
    <div style={containerStyle}>
      <CssBaseline />
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        COVID-19 Statistics in the USA
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper>
            <DateSelector
              selectedDate={selectedDate}
              handleDateChange={(date) => setSelectedDate(date)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            {/* Pass the list of states and the selected state */}
            <StateFilter
              selectedState={selectedState}
              handleStateChange={(state) => setSelectedState(state)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            <Stats stats={stats} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Chart data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
