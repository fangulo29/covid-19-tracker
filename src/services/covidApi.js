import axios from "axios";

const API_BASE_URL = "https://api.covidtracking.com";

export const STATES = [
  { state: "al", name: "Alabama" },
  { state: "ak", name: "Alaska" },
  { state: "az", name: "Arizona" },
  { state: "ar", name: "Arkansas" },
  { state: "ca", name: "California" },
  { state: "co", name: "Colorado" },
  { state: "ct", name: "Connecticut" },
  { state: "de", name: "Delaware" },
  { state: "fl", name: "Florida" },
  { state: "ga", name: "Georgia" },
  { state: "hi", name: "Hawaii" },
  { state: "id", name: "Idaho" },
  { state: "il", name: "Illinois" },
  { state: "in", name: "Indiana" },
  { state: "ia", name: "Iowa" },
  { state: "ks", name: "Kansas" },
  { state: "ky", name: "Kentucky" },
  { state: "la", name: "Louisiana" },
  { state: "me", name: "Maine" },
  { state: "md", name: "Maryland" },
  { state: "ma", name: "Massachusetts" },
  { state: "mi", name: "Michigan" },
  { state: "mn", name: "Minnesota" },
  { state: "ms", name: "Mississippi" },
  { state: "mo", name: "Missouri" },
  { state: "mt", name: "Montana" },
  { state: "ne", name: "Nebraska" },
  { state: "nv", name: "Nevada" },
  { state: "nh", name: "New Hampshire" },
  { state: "nj", name: "New Jersey" },
  { state: "nm", name: "New Mexico" },
  { state: "ny", name: "New York" },
  { state: "nc", name: "North Carolina" },
  { state: "nd", name: "North Dakota" },
  { state: "oh", name: "Ohio" },
  { state: "ok", name: "Oklahoma" },
  { state: "or", name: "Oregon" },
  { state: "pa", name: "Pennsylvania" },
  { state: "ri", name: "Rhode Island" },
  { state: "sc", name: "South Carolina" },
  { state: "sd", name: "South Dakota" },
  { state: "tn", name: "Tennessee" },
  { state: "tx", name: "Texas" },
  { state: "ut", name: "Utah" },
  { state: "vt", name: "Vermont" },
  { state: "va", name: "Virginia" },
  { state: "wa", name: "Washington" },
  { state: "wv", name: "West Virginia" },
  { state: "wi", name: "Wisconsin" },
  { state: "wy", name: "Wyoming" },
];

export const fetchOverallStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/us/current.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching overall stats:", error);
    throw error;
  }
};

export const fetchHistoricToDailyData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/us/daily.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching historic data:", error);
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
    console.error("Error fetching historic data:", error);
    throw error;
  }
};

export const fetchStateStats = async (stateCode) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/v1/states/${stateCode}/current.json`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching state stats:", error);
    throw error;
  }
};
