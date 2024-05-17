import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': 'http://localhost:5000',
  },
});

export const sendPillsInformation = async (pillsData) => {
  try {
    const response = await api.post("/pills", pillsData);
    console.log('Meal information sent:', response);
    return response.data;
  } catch (error) {
    console.error('Error sending meal information:', error);
    throw error;
  }
}
