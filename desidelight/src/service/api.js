// services/api.js
import axios from "axios";

const API_URL = "http://localhost:8000";

const fetchFoods = async () => {
  try {
    const response = await axios.get(`${API_URL}/foods/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};
export default fetchFoods;
