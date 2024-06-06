import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',
  },
});

export const sendMealInformation = async (mealData) => {
  try {
    const response = await api.post("/meals", mealData);
    console.log('Meal information sent:', response);
    return response.data;
  } catch (error) {
    console.error('Error sending meal information:', error);
    throw error;
  }
}

export const getMeals = async () => {
  try {
    const response = await api.get("/meals");
    console.log('Meals retrieved:', response);
    return response.data;
  } catch (error) {
    console.error('Error retrieving meals:', error);
    throw error;
  }
}

export default sendMealInformation;
