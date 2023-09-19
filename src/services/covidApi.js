import axios from 'axios';

const API_BASE_URL = 'https://covidtracking.com/data/api';

// Define the endpoint to fetch the list of states
export const STATES = [
    { state: 'AL', name: 'Alabama' },
    { state: 'AK', name: 'Alaska' },
    { state: 'AZ', name: 'Arizona' },
    { state: 'AR', name: 'Arkansas' },
    { state: 'CA', name: 'California' },
    { state: 'CO', name: 'Colorado' },
    { state: 'CT', name: 'Connecticut' },
    { state: 'DE', name: 'Delaware' },
    { state: 'FL', name: 'Florida' },
    { state: 'GA', name: 'Georgia' },
    { state: 'HI', name: 'Hawaii' },
    { state: 'ID', name: 'Idaho' },
    { state: 'IL', name: 'Illinois' },
    { state: 'IN', name: 'Indiana' },
    { state: 'IA', name: 'Iowa' },
    { state: 'KS', name: 'Kansas' },
    { state: 'KY', name: 'Kentucky' },
    { state: 'LA', name: 'Louisiana' },
    { state: 'ME', name: 'Maine' },
    { state: 'MD', name: 'Maryland' },
    { state: 'MA', name: 'Massachusetts' },
    { state: 'MI', name: 'Michigan' },
    { state: 'MN', name: 'Minnesota' },
    { state: 'MS', name: 'Mississippi' },
    { state: 'MO', name: 'Missouri' },
    { state: 'MT', name: 'Montana' },
    { state: 'NE', name: 'Nebraska' },
    { state: 'NV', name: 'Nevada' },
    { state: 'NH', name: 'New Hampshire' },
    { state: 'NJ', name: 'New Jersey' },
    { state: 'NM', name: 'New Mexico' },
    { state: 'NY', name: 'New York' },
    { state: 'NC', name: 'North Carolina' },
    { state: 'ND', name: 'North Dakota' },
    { state: 'OH', name: 'Ohio' },
    { state: 'OK', name: 'Oklahoma' },
    { state: 'OR', name: 'Oregon' },
    { state: 'PA', name: 'Pennsylvania' },
    { state: 'RI', name: 'Rhode Island' },
    { state: 'SC', name: 'South Carolina' },
    { state: 'SD', name: 'South Dakota' },
    { state: 'TN', name: 'Tennessee' },
    { state: 'TX', name: 'Texas' },
    { state: 'UT', name: 'Utah' },
    { state: 'VT', name: 'Vermont' },
    { state: 'VA', name: 'Virginia' },
    { state: 'WA', name: 'Washington' },
    { state: 'WV', name: 'West Virginia' },
    { state: 'WI', name: 'Wisconsin' },
    { state: 'WY', name: 'Wyoming' },
];

export const fetchOverallStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/us/current.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching overall stats:', error);
    throw error;
  }
};

export const fetchHistoricData = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/v1/us/daily.json?date=${startDate}&endDate=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching historic data:', error);
    throw error;
  }
};

export const fetchStateStats = async (stateCode) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/states/${stateCode}/current.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching state stats:', error);
    throw error;
  }
};
