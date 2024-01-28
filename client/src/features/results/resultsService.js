import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = "include";
const API_URL = "results/";

//Get All Results
const getAllResults = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL);
  if (response.data) {
    localStorage.setItem("results", JSON.stringify(response.data.results));
  }
  return response.data.results;
};

//get Result
const getResult = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(API_URL + id, config);
  return response.data.result;
};

const resultsService = {
  getAllResults,
  getResult,
};

export default resultsService;
